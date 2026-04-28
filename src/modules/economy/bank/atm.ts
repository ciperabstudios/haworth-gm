import { autoIncrementPlugin } from "@database/schemas/counter";
import { DynamicObject, DynamicObjectEvent, GameMode } from "@infernus/core";
import { logger } from "@logger";
import type { ICoordinates } from "@utils/interfaces/coordinates";
import { CachedRepository, MongooseRepository } from "@utils/interfaces/repository";
import type { StrictSchemaDefinition } from "@utils/interfaces/schemas";
import { model, Schema, type Document, type Model } from "mongoose";

interface IATM {
    id: string;
    availableMoney: number;
    coordinates: ICoordinates & { angle: number };
}

type CreateATMDTO = Omit<IATM, "id">;

interface IATMDocument extends IATM, Omit<Document, "id"> {};
interface IATMModel extends Model<IATMDocument> {};

// -----------------------------------------------------------------

const coordinatesObjectSchema = new Schema<ICoordinates & { angle: number }>({ 
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    vw: { type: Number, default: 1 },
    angle: { type: Number, default: 0 }
}, { _id: false });

const atmSchemaDefinition: StrictSchemaDefinition<IATM> = {
    id: { type: String, unique: true, immutable: true },
    availableMoney: { type: Number, min: 0, default: 0 },
    coordinates: { type: coordinatesObjectSchema },
}

const atmSchema = new Schema<IATMDocument, IATMModel>(atmSchemaDefinition, { timestamps: true });

atmSchema.plugin(autoIncrementPlugin, {
    id: "atmId",
    field: "id",
    string: true
});

const ATMModel = model<IATMDocument, IATMModel>("atms", atmSchema);

// -----------------------------------------------------------------

export class ATM {
    private _obj: DynamicObject | null = null;

    constructor(private props: IATM) {};

    get id() { return this.props.id; }
    get availableMoney() { return this.props.availableMoney; }
    get coordinates() { return this.props.coordinates; }
    get object() { return this._obj; }

    // ---------------------------------------

    get allProps() { return structuredClone(this.props) };

    // ---------------------------------------

    setObject(obj: DynamicObject) {
        this._obj = obj;
    }

    // ---------------------------------------

    removeMoney(amount: number) {
        if (!this.props.availableMoney) return;
        if (this.props.availableMoney < amount) return;
        if (this.props.availableMoney - amount < 0) return;

        this.props.availableMoney -= amount;
    }

    addMoney(amount: number) {
        this.props.availableMoney += amount;
    }

    // ---------------------------------------

    changeCoordinates(newCoordinates: ICoordinates & { angle: number }) {
        this.props.coordinates = newCoordinates;
    }
}

// -----------------------------------------------------------------

class ATMRepository extends MongooseRepository<ATM, IATM> {
    constructor() {
        super(
            ATMModel as Model<IATM & Document>,
            (data: IATM) => new ATM(data),
            (entity: ATM) => entity.allProps
        );
    }
}

// -----------------------------------------------------------------

export class ATMService {
    constructor(private readonly repository: CachedRepository<ATM>) {}

    // ---------------------------------------

    async modify<R>(atmId: string, operation: (atm: ATM) => R): Promise<R | null> {
        return this.repository.modify(atmId, operation);
    }

    // ---------------------------------------

    async loadAllATMs() {
        await this.repository.initialize("cajeros");

        const atms = await this.repository.findAll();

        atms.forEach(atm => {
            const obj = this.createATMObject(atm.coordinates);
            atm.setObject(obj);
        });
    }

    // ---------------------------------------

    private createATMObject(coordinates: ICoordinates & { angle: number }): DynamicObject {
        const { x, y, z, int, vw, angle } = coordinates;

        const obj = new DynamicObject({ modelId: 2942, x, y, z, rx: 0, ry: 0, rz: angle, worldId: vw, interiorId: int }).create();

        return obj;
    }

    // ---------------------------------------

    async createATM(dto: CreateATMDTO): Promise<ATM> {
        const atm = await this.repository.create(dto as any);

        const obj = this.createATMObject(atm.coordinates);
        atm.setObject(obj);

        return atm;
    }
}

// -----------------------------------------------------------------

const atmDbRepo = new ATMRepository();
const atmCacheRepo = new CachedRepository<ATM>(atmDbRepo, logger, "id");
export const atmService = new ATMService(atmCacheRepo);

export const editingATMByPlayer = new Map<number, ATM>();

// -----------------------------------------------------------------

GameMode.onInit(async ({ next }) => {
    await atmService.loadAllATMs();
    return next();
});


DynamicObjectEvent.onPlayerEdit(async ({ player, object, response, x, y, z, rX, rY, rZ, next }) => {
    if (response !== 1) return next();

    const atm = editingATMByPlayer.get(player.id);
    if (!atm) return next();

    const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

    console.debug({ object, x, y, z, rX, rY, rZ })

    atm.changeCoordinates({ x, y, z, int, vw, angle: rZ });
    atmService.modify(atm.id, atm => atm);

    editingATMByPlayer.delete(player.id);

    return next();
});

// -----------------------------------------------------------------


