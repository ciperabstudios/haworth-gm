import HouseModel from "@database/schemas/house";
import { logger } from "@logger";
import type { ICoordinates } from "@utils/interfaces/coordinates";
import { CachedRepository, MongooseRepository, type IRepository } from "@utils/interfaces/repository";
import { DynamicCheckPointEvent, DynamicPickup, DynamicPickupEvent, type Player } from "@infernus/core";
import { type Document, type Model } from "mongoose";
import { showInfoForPlayer } from "@modules/filterscripts/showInfoForPlayer";
import type { CreateHouseDTO, HousePickupRef, IHouse, IHousePickup } from "./interfaces";
import { getInteriorData } from "@modules/maps";
import { Colors } from "@modules/server/colors";
import { getMapZoneName3D, getPlayerAreaZone, getStreetName } from "@modules/server/streets";



class House {
    constructor(private props: IHouse) {};

    get id() { return this.props.id };
    get owner() { return this.props.owner };
    get price() { return this.props.price };
    get available() { return this.props.available };

    get interiorCoords() { return structuredClone(this.props.coordinates.interior) };
    get exteriorCoords() { return structuredClone(this.props.coordinates.exterior) };


    get allProps() { return structuredClone(this.props) };

    // ---------------------------------------
    
    enter(player: Player): boolean {
        const { x, y, z, int, vw } = this.interiorCoords;

        player.setInterior(int);
        player.setVirtualWorld(vw);
        player.setPos(x, y, z);

        return true;
    }

    exit(player: Player): boolean {
        const { x, y, z, int, vw } = this.exteriorCoords;

        player.setInterior(int);
        player.setVirtualWorld(vw);
        player.setPos(x, y, z);

        return true;
    }

    // ---------------------------------------

    isPlayerNear(player: Player, range: number = 2.0): boolean {
        const { x, y, z, vw } = this.exteriorCoords;

        return player.isInRangeOfPoint(range, x, y, z) && player.getVirtualWorld() == vw; 
    }

    isPlayerIn(player: Player): boolean {
        const { int, vw } = this.interiorCoords;

        return player.getInterior() == int && player.getVirtualWorld() == vw;
    }

    // ---------------------------------------

    canBeBought(money: number): boolean {
        return this.props.available && money >= this.props.price;
    }

    // ---------------------------------------

    setOwner(newOwnerName: string | null) {
        this.props.owner = newOwnerName;
        this.props.available = !newOwnerName;

        return true;
    }

    setPrice(newPrice: number) {
        this.props.price = newPrice;
    }

    setAvailability(newAvailability: boolean) {
        if (this.props.owner) {
            logger.warn("No se puede cambiar la disponibilidad de la casa si hay un dueño activo.");
            return false;
        }

        return (this.props.available = newAvailability);
    }

    setInteriorCoordinates(newCoordinates: ICoordinates) {
            this.props.coordinates.interior = newCoordinates;
    
            return true;
    }

    setExteriorCoordinates(newCoordinates: ICoordinates) {
        this.props.coordinates.exterior = newCoordinates;

        return true;
    }

}


// -----------------------------------------------------------------

class HouseRepository extends MongooseRepository<House, IHouse> {
    constructor() {
        super(
            HouseModel as Model<IHouse & Document>,
            (json: IHouse) => new House(json),
            (entity: House) => entity.allProps
        );
    }
}


// -----------------------------------------------------------------


class HouseService {
    private readonly STARTING_VIRTUAL_WORLD = 1;

    // ---------------------------------------

    constructor(
        private readonly repository: CachedRepository<House>, //IRepository<House>,
        private readonly pickupService: HousePickupService
    ) {}

    // ---------------------------------------

    private async getNextVirtualWorld(): Promise<number> {
        const houses = await this.repository.findAll();
        const usedVws = new Set(houses.map(b => b.allProps.coordinates.interior.vw));

        let i = this.STARTING_VIRTUAL_WORLD;
        while (usedVws.has(i)) i++;
        return i;
    }

    // ---------------------------------------

    async loadAllHouses() {
        const houses = await this.repository.findAll();

        this.pickupService.refreshAll(houses);
    }

    // ---------------------------------------

    async createHouse(dto: CreateHouseDTO) {
        const interiorData = getInteriorData(dto.interiorKey);

        if (!interiorData) {
            logger.warn(`Interior Key no encontrada: ${dto.interiorKey}`);
            return false;
        }

        const { x, y, z, interiorId: int } = interiorData;

        const vw = await this.getNextVirtualWorld();

        const data: Omit<IHouse, "id"> = {
            owner: null,
            available: true,
            price: dto.price,
            coordinates: {
                exterior: dto.exterior,
                interior: {
                    x, y, z, int, vw
                }
            }
        }
        
        const newHouse = await this.repository.create(data as any);
        this.pickupService.refreshPickups(newHouse);

        return true;
    }

    async deleteHouse(houseId: string) {
        const deletedHouse = await this.repository.delete(houseId);
        if (deletedHouse) this.pickupService.removePickups(houseId);
    }

    // ---------------------------------------

    async getNearestHouseFromPlayer(player: Player, range: number = 2.0): Promise<House | null> {
        const houses = await this.repository.findAll();

        let closestHouse: House | null = null;
        let minDistance = range;

        const { x, y, z } = player.getPos();

        for (const house of houses) {
            if (player.getVirtualWorld() !== house.exteriorCoords.vw) continue;
            if (player.getInterior() !== house.exteriorCoords.int) continue;

            const { x: hX, y: hY, z: hZ } = house.exteriorCoords;

            const dist = Math.sqrt(
                Math.pow(x - hX, 2) + 
                Math.pow(y - hY, 2) + 
                Math.pow(z - hZ, 2)
            );

            if (dist <= minDistance) {
                minDistance = dist;
                closestHouse = house;
            }
        }

        return closestHouse;
    }

    async getHousePlayerIsIn(player: Player): Promise<House | null> {
        if (!player.getVirtualWorld()) return null;

        const houses = await this.repository.findAll();

        for (const house of houses) {
            const { vw, int } = house.interiorCoords;

            if (vw === player.getVirtualWorld() && int === player.getInterior()) return house;
        }

        return null;
    }

    // ---------------------------------------

    async enterHouse(player: Player, houseId: string): Promise<boolean> {
        const house = await this.repository.findById(houseId);
        if (!house) return false;

        if (!house.isPlayerNear(player)) {
            player.sendClientMessage(Colors.White, "No estás cerca de una casa.");
            return false;
        }

        const { x, y, z } = house.exteriorCoords;
        
        if (!player.isInRangeOfPoint(2, x, y, z)) {
            player.sendClientMessage(Colors.White, "No estás cerca de la entrada de una casa.");
            return false;
        }

        return house.enter(player);
    }

    async exitHouse(player: Player, houseId: string): Promise<boolean> {
        const house = await this.repository.findById(houseId);
        if (!house) return false;

        if (!house.isPlayerIn(player)) {
            player.sendClientMessage(Colors.White, "No estás dentro de una casa.");
            return false;
        }

        const { x, y, z } = house.interiorCoords;

        if (!player.isInRangeOfPoint(2, x, y, z)) {
            player.sendClientMessage(Colors.White, "No estás cerca de la salida de la casa.");
            return false;
        }

        return house.exit(player);
    }

    async purchaseHouse(player: Player, houseId: string): Promise<boolean> {
        const house = await this.repository.findById(houseId);
        if (!house) return false;

        if (!house.canBeBought(player.getMoney())) return false;

        player.giveMoney(-house.price);
        house.setOwner(player.getName().name);

        await this.repository.save(houseId, house);

        return true;
    }

}


// -----------------------------------------------------------------

class HousePickupService {
    private pickups: Map<string, IHousePickup> = new Map();
    private pickupIdMap: Map<number, HousePickupRef> = new Map();

    // ---------------------------------------

    private readonly PICKUP_MODEL_ID = 19902;
    private readonly PICKUP_STREAM_DISTANCE = 100;

    // ---------------------------------------

    refreshPickups(house: House) {
        const existingPickup = this.pickups.get(house.id);

        if (existingPickup) this.removePickups(house.id);

        const extCoords = house.exteriorCoords;
        const intCoords = house.interiorCoords;

        const interiorPickup = new DynamicPickup({ modelId: this.PICKUP_MODEL_ID, type: 1, x: intCoords.x, y: intCoords.y, z: intCoords.z - 1, worldId: intCoords.vw, interiorId: intCoords.int, streamDistance: this.PICKUP_STREAM_DISTANCE }).create();
        const exteriorPickup = new DynamicPickup({ modelId: this.PICKUP_MODEL_ID, type: 1, x: extCoords.x, y: extCoords.y, z: extCoords.z - 1, worldId: extCoords.vw, interiorId: extCoords.int, streamDistance: this.PICKUP_STREAM_DISTANCE }).create();
        
        this.pickups.set(house.id, { interior: interiorPickup, exterior: exteriorPickup });

        this.pickupIdMap.set(interiorPickup.id, { houseId: house.id, type: "interior" })
        this.pickupIdMap.set(exteriorPickup.id, { houseId: house.id, type: "exterior" })
    }


    removePickups(houseId: string) {
        const pickups = this.pickups.get(houseId);

        if (pickups) {
            this.pickupIdMap.delete(pickups.exterior.id);
            this.pickupIdMap.delete(pickups.interior.id);

            pickups.exterior.destroy();
            pickups.interior.destroy();
            this.pickups.delete(houseId);
        }
    }

    getHouseByPickupId(pickupId: number): HousePickupRef | undefined {
        return this.pickupIdMap.get(pickupId);
    }
 
    // Para la carga inicial.
    refreshAll(houses: House[]) {
        for (const house of houses) {
            this.refreshPickups(house);
        }
    }

}


// -----------------------------------------------------------------

class HouseFormatter {
    static getInteriorText(house: House): string {
        const { x, y, z } = house.exteriorCoords;

        const zoneName = `~b~${getMapZoneName3D(x, y, z)}`;
        const result = `~w~Salida a ~n~${zoneName}.`;

        return result;
    }


    static getExteriorText(house: House, isPlayerOwner: boolean): string {
        const { x, y, z } = house.exteriorCoords;

        const isAvailable = house.available 
                            ? `~g~En venta ~w~(~h~~h~$${house.price}~w~)~n~` 
                            : "";

        const streetAddress = `~w~${getStreetName(x, y)}, ${getPlayerAreaZone(x, y)}`;
        const zoneName = `~w~${getMapZoneName3D(x, y, z)}`;
        const propertyCheck = isPlayerOwner ? "~b~Esta es tu propiedad" : "";

        const result = `${isAvailable}${streetAddress}~n~${zoneName}~n~${propertyCheck}`;

        return result;
    }
}


// -----------------------------------------------------------------


const houseDbRepo = new HouseRepository();
export const houseCacheRepo = new CachedRepository<House>(houseDbRepo);

const housePickupService = new HousePickupService();
export const houseService = new HouseService(houseCacheRepo, housePickupService);

export const initializeHouses = async () => {
    await houseCacheRepo.initialize("casas");
    await houseService.loadAllHouses();
}


// -----------------------------------------------------------------


DynamicPickupEvent.onPlayerPickUp(async ({ player, pickup, next }) => {
    const ref = housePickupService.getHouseByPickupId(pickup.id);
    if (!ref) return next();

    const house = await houseCacheRepo.findById(ref.houseId);
    if (!house) return next();

    const text = ref.type === "interior"
                    ? HouseFormatter.getInteriorText(house)
                    : HouseFormatter.getExteriorText(house, house.owner === player.getName().name);

    showInfoForPlayer(player, text, 3000);

    return next();
});


DynamicCheckPointEvent.onPlayerEnter(async ({ player, cp, next, defaultValue }) => {
    return next();
});