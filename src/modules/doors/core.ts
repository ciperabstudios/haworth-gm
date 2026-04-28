import Command from "@commands/Command";
import StaffCommand from "@commands/StaffCommand";
import { autoIncrementPlugin } from "@database/schemas/counter";
import { Dialog, DialogStylesEnum, Dynamic3DTextLabel, DynamicPickup, GameMode, Pickup, type Player } from "@infernus/core";
import { logger } from "@logger";
import { factionService } from "@modules/factions";
import { Colors } from "@modules/server/colors";
import type { ICoordinates } from "@utils/interfaces/coordinates";
import { CachedRepository, MongooseRepository } from "@utils/interfaces/repository";
import type { StrictSchemaDefinition } from "@utils/interfaces/schemas";
import type { Document, Model } from "mongoose";
import { model, Schema } from "mongoose";

type IDoorKind = "PublicDoor" | "FactionDoor";

interface IDoor {
    id: string;

    interior: ICoordinates;
    exterior: ICoordinates;
    
    pickupIcon?: number;

    /* Discriminator */
    kind: IDoorKind;
}

// ----------------------------------

interface IDoorPickup {
    interior: {
        textLabel: Dynamic3DTextLabel;
        pickup: DynamicPickup;
    }
    exterior: {
        textLabel: Dynamic3DTextLabel;
        pickup: DynamicPickup;
    }
}

type DoorPickupRef = { doorId: string, type: "interior" | "exterior" };

// ----------------------------------

type CreateDoorDTO = Omit<IDoor, "id" | "kind">;

// ----------------------------------

interface IDoorDocument extends IDoor, Omit<Document, "id"> {};
interface IDoorModel extends Model<IDoorDocument> {};

const coordinatesObjectSchema = new Schema<ICoordinates>({ 
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    vw: { type: Number, default: 1 },
}, { _id: false });

const baseDoorSchemaDefinition: StrictSchemaDefinition<IDoor> = {
    id: { type: String, unique: true, immutable: true },
    interior: { type: coordinatesObjectSchema, required: true },
    exterior: { type: coordinatesObjectSchema, required: true },
    pickupIcon: { type: Number, default: 1318 }, // Flecha blanca hacia abajo por defecto.
    kind: { type: String, default: "PublicDoor" }
}

const baseDoorSchema = new Schema<IDoorDocument, IDoorModel>(baseDoorSchemaDefinition, { timestamps: true });

baseDoorSchema.plugin(autoIncrementPlugin, {
    id: "doorId",
    field: "id",
    string: true
});

const DoorModel = model<IDoorDocument, IDoorModel>("doors", baseDoorSchema);

// ----------------------------------

export interface IFactionDoor extends IDoor {
    factionId: string;
}

interface IFactionDoorDocument extends IFactionDoor, Omit<Document, "id"> {};

const factionDoorModel = DoorModel.discriminator<IFactionDoorDocument>("FactionDoor", new Schema<IFactionDoorDocument>({
    factionId: { type: String, required: true }
}));

// ----------------------------------

export abstract class BaseDoor<T extends IDoor> {
    constructor(protected props: T) {};

    get id() { return this.props.id };
    get coordinates() { return { interior: this.props.interior, exterior: this.props.exterior }; }
    get pickupIcon() { return this.props.pickupIcon; }
    get kind() { return this.props.kind; }

    get allProps() { return structuredClone(this.props); }

    // ----------------------------------

    abstract canAccess(player: Player): boolean;

    // ----------------------------------

    enter(player: Player): boolean {
        const { x, y, z, int, vw } = this.props.interior;

        player.setInterior(int);
        player.setVirtualWorld(vw);
        player.setPos(x, y, z);

        return true;
    }

    exit(player: Player): boolean {
        const { x, y, z, int, vw } = this.props.exterior;

        player.setInterior(int);
        player.setVirtualWorld(vw);
        player.setPos(x, y, z);

        return true;
    }

    // ----------------------------------

    setInterior(coordinates: ICoordinates) {
        this.props.interior = coordinates;
    }

    setExterior(coordinates: ICoordinates) {
        this.props.exterior = coordinates;
    }

    setPickupIcon(newPickupIcon: number) {
        this.props.pickupIcon = newPickupIcon;
    }
}

// ----------------------------------

class DoorRepository extends MongooseRepository<BaseDoor<any>, IDoor> {
    constructor() {
        super(
            DoorModel as Model<IDoor & Document>,
            (doc) => DoorFactory.create(doc as IDoorDocument),
            (entity: BaseDoor<any>) => entity.allProps,
            "id"
        )
    }
}

// ----------------------------------

class DoorFactory {
    static create(doc: IDoorDocument | IDoor): BaseDoor<any> {
        const rawData = (typeof (doc as any).toObject === 'function')
            ? (doc as any).toObject({ getters: true, virtuals: false, versionKey: false, flattenMaps: true })
            : doc;

        let door: BaseDoor<any>;

        switch (doc.kind) {
            case "FactionDoor": door = new FactionDoor(rawData as IFactionDoor); break;
            case "PublicDoor":  door = new PublicDoor(rawData as IDoor); break;
            default:
                throw new Error(`Unknown door kind: ${doc.kind}`);
        }

        return door;
    }

    // ----------------------------------

    static createPublicDoor(dto: CreateDoorDTO): Partial<IDoor> {
        const { interior, exterior, pickupIcon = 1318 } = dto;

        return {
            kind: "PublicDoor",
            interior, exterior, pickupIcon
        };
    }
    
    static createFactionDoor(factionId: string, dto: CreateDoorDTO): Partial<IFactionDoor> {
        const { interior, exterior, pickupIcon = 1318 } = dto;

        return {
            kind: "FactionDoor",
            factionId,
            interior, exterior, pickupIcon
        };
    }
}

// ----------------------------------

class DoorService {
    constructor(
        private readonly repository: CachedRepository<BaseDoor<any>>,
        private readonly pickupService: DoorPickupService
    ) {}

    // ----------------------------------

    async modify<R>(doorId: string, operation: (door: BaseDoor<any>) => R): Promise<R | null> {
        const door = this.repository.findInCache({ id: doorId })?.[0];
        if (!door) return null;

        const result = operation(door);
        await this.repository.save(doorId, door);

        this.pickupService.refreshPickups(door);
        
        return result;
    }

    // ----------------------------------

    async loadAllDoors() {
        await this.repository.initialize("doors");

        const doors = await this.repository.findInCache({});

        this.pickupService.refreshAll(doors);
    }

    // ----------------------------------

    async findById(doorId: string): Promise<BaseDoor<any> | null> {
        return await this.repository.findById(doorId);
    }

    async deleteDoor(doorId: string) {
        await this.repository.delete(doorId);
        this.pickupService.deletePickups(doorId);
    }

    // ----------------------------------

    async createPublicDoor(dto: CreateDoorDTO): Promise<BaseDoor<IDoor>> {
        const data = DoorFactory.createPublicDoor(dto);
        const door = await this.repository.create(data as any);

        await this.repository.save(door.id, door);

        return door;
    }

    async createFactionDoor(factionId: string, dto: CreateDoorDTO): Promise<BaseDoor<IFactionDoor>> {
        const data = DoorFactory.createFactionDoor(factionId, dto as any);
        const door = await this.repository.create(data as any);

        this.pickupService.createDoorPickup(door, dto.pickupIcon);

        await this.repository.save(door.id, door);

        return door;
    }

    // ----------------------------------

    async getNearestDoorFromPlayer(player: Player, range: number = 2.0): Promise<BaseDoor<any> | null> {
        const doors = this.repository.findInCache({});

        let closestDoor: BaseDoor<any> | null = null;
        let minDistance = range;

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        for (const door of doors) {
            const { interior, exterior } = door.coordinates;

            const sides = [interior, exterior];

            for (const side of sides) {
                if (side.vw !== vw) continue;
                if (side.int !== int) continue;

                const dist = Math.sqrt(
                    Math.pow(x - side.x, 2) +
                    Math.pow(y - side.y, 2) +
                    Math.pow(z - side.z, 2)
                );

                if (dist <= minDistance) {
                    minDistance = dist;
                    closestDoor = door;
                }
            }

        }

        return closestDoor;
    }

    async enterDoor(player: Player, doorId: string): Promise<boolean> {
        const door = this.repository.findInCache({ id: doorId })?.[0];
        if (!door) return false;

        const { coordinates: { interior, exterior } } = door;

        const { x, y, z } = exterior;

        if (!interior.x && !interior.y && !interior.z) {
            player.sendClientMessage(Colors.LightRed, "La puerta por la que quieres ingresar todavía no tiene una salida configurada.");
            return false;
        }
        
        if (!player.isInRangeOfPoint(2, x, y, z)) {
            player.sendClientMessage(Colors.LightRed, "No estás cerca de la puerta.");
            return false;
        }
        
        if (!door.canAccess(player)) return player.sendClientMessage(Colors.AlertRed, "No tienes acceso a esta puerta.");
        
        return door.enter(player);
    }

    async exitDoor(player: Player, doorId: string): Promise<boolean> {
        const door = this.repository.findInCache({ id: doorId })?.[0];
        if (!door) return false;

        const { x, y, z } = door.coordinates.interior;
        
        if (!player.isInRangeOfPoint(2, x, y, z)) {
            player.sendClientMessage(Colors.White, "No estás cerca de la puerta.");
            return false;
        }
        
        if (!door.canAccess(player)) return player.sendClientMessage(Colors.AlertRed, "No tienes acceso a esta puerta.");
        
        return door.exit(player);
    }
}


class DoorPickupService {
    private pickups: Map<string, IDoorPickup> = new Map();
    private pickupIdMap: Map<number, DoorPickupRef> = new Map();

    private readonly PICKUP_DEFAULT_MODEL_ID  = 1318;
    private readonly PICKUP_STREAM_DISTANCE   = 100;
    private readonly TEXT_LABEL_DRAW_DISTANCE = 10;

    // ----------------------------------

    refreshAll(doors: BaseDoor<any>[]) {
        for (const door of doors) {
            const existingPickups = this.pickups.get(door.id);
            if (existingPickups) this.deletePickups(door.id);

            this.createDoorPickup(door, door.pickupIcon);
        }
    }

    refreshPickups(door: BaseDoor<any>) {
        const existingPickups = this.pickups.get(door.id);
        if (existingPickups) this.deletePickups(door.id);

        this.createDoorPickup(door, door.pickupIcon);
    }

    // ----------------------------------

    createDoorPickup(door: BaseDoor<any>, pickupIcon: number = this.PICKUP_DEFAULT_MODEL_ID) {
        const { interior, exterior } = door.coordinates;

        const { x: iX, y: iY, z: iZ, int: iInt, vw: iVw } = interior;
        const { x: eX, y: eY, z: eZ, int: eInt, vw: eVw } = exterior;

        const interiorPickup = new DynamicPickup({ modelId: pickupIcon, type: 1, x: iX, y: iY, z: iZ, worldId: iVw, interiorId: iInt, streamDistance: this.PICKUP_STREAM_DISTANCE }).create();
        const interiorTextLabel = new Dynamic3DTextLabel({ x: iX, y: iY, z: iZ, worldId: iVw, interiorId: iInt, text: `Acceso interior #${door.id}`, color: "#FF6359", streamDistance: this.PICKUP_STREAM_DISTANCE, drawDistance: this.TEXT_LABEL_DRAW_DISTANCE }).create();
        
        const exteriorPickup = new DynamicPickup({ modelId: pickupIcon, type: 1, x: eX, y: eY, z: eZ, worldId: eVw, interiorId: eInt, streamDistance: this.PICKUP_STREAM_DISTANCE }).create();
        const exteriorTextLabel = new Dynamic3DTextLabel({ x: eX, y: eY, z: eZ, worldId: eVw, interiorId: eInt, text: `Acceso exterior #${door.id}`, color: "#FF6359", streamDistance: this.PICKUP_STREAM_DISTANCE, drawDistance: this.TEXT_LABEL_DRAW_DISTANCE }).create();


        this.pickups.set(door.id, 
            { 
                interior: {
                    textLabel: interiorTextLabel,
                    pickup: interiorPickup,
                }, 
                exterior: {
                    textLabel: exteriorTextLabel,
                    pickup: exteriorPickup
                } 
            }
        );

        this.pickupIdMap.set(interiorPickup.id, { doorId: door.id, type: "interior" });
        this.pickupIdMap.set(exteriorPickup.id, { doorId: door.id, type: "exterior" });
    }

    // ----------------------------------

    deletePickups(doorId: string) {
        const pickups = this.pickups.get(doorId);

        if (pickups) {
            this.pickupIdMap.delete(pickups.interior.pickup.id);
            this.pickupIdMap.delete(pickups.exterior.pickup.id);

            pickups.interior.pickup.destroy();
            pickups.interior.textLabel.destroy();

            pickups.exterior.pickup.destroy();
            pickups.exterior.textLabel.destroy();

            this.pickups.delete(doorId);
        }
    }

    // ----------------------------------

    getDoorByPickupId(pickupId: number): DoorPickupRef | undefined {
        return this.pickupIdMap.get(pickupId);
    }
}


// ----------------------------------

class PublicDoor extends BaseDoor<IDoor> {
    override canAccess(player: Player): boolean {
        return true;
    }
}

// ----------------------------------

class FactionDoor extends BaseDoor<IFactionDoor> {
    get factionId(): string { return this.props.factionId; }

    override canAccess(player: Player): boolean {
        return factionService.isFactionMember(player.getName().name, this.factionId);
    }
}


// ----------------------------------

const doorDbRepo = new DoorRepository();
const doorCacheRepo = new CachedRepository<BaseDoor<any>>(doorDbRepo, logger, "id");

const doorPickupService = new DoorPickupService();
export const doorService = new DoorService(doorCacheRepo, doorPickupService);

// ----------------------------------

GameMode.onInit(async ({ next }) => {
    await doorService.loadAllDoors();
    return next();
});

// ----------------------------------