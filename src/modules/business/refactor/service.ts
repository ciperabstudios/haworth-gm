import { DynamicPickup, Player } from "@infernus/core";
import { Colors } from "@modules/server/colors/constants";
import type { CachedRepository } from "@utils/interfaces/repository";
import type { Business } from "./domain";
import type { BusinessDTO, IBusiness, IBusinessPickup, PickupRef } from "./interfaces";


export class BusinessService {
    private readonly STARTING_VIRTUAL_WORLD = 100;

    constructor(
        private readonly repository: CachedRepository<Business>, //IRepository<Business>,
        private readonly pickupService: BusinessPickupService
    ) {}

    async modify<R>(businessId: string, operation: (business: Business) => R): Promise<R | null> {
        return this.repository.modify(businessId, operation);
    }

    private async getNextVirtualWorld(): Promise<number> {
        const businesses = await this.repository.findAll();
        const usedVws = new Set(businesses.map(b => b.interiorCoords.vw));

        let i = this.STARTING_VIRTUAL_WORLD;
        while (usedVws.has(i)) i++;
        return i;
    }


    async loadAllBusinesses() {
        const businesses = await this.repository.findAll();

        this.pickupService.refreshAll(businesses);
    }


    async createBusiness(props: BusinessDTO) {
        const vw = await this.getNextVirtualWorld();

        const data: Omit<IBusiness, "id"> = {
            ...props,
            available: true,
            owner: null,
            coordinates: {
                ...props.coordinates,
                interior: { ...props.coordinates.interior, vw }
            },
            products: []
        };

        const newBusiness = await this.repository.create(data as any);
        this.pickupService.refreshPickups(newBusiness);
    }


    async deleteBusiness(businessId: string) {
        const deletedBiz = await this.repository.delete(businessId);
        if (deletedBiz) this.pickupService.removePickups(businessId);
    }


    async updateAvailability(businessId: string, newAvailability: boolean): Promise<boolean> {
        const result = await this.repository.modify(businessId, business => {
            business.setAvailability(newAvailability);
            this.pickupService.refreshPickups(business);
        });

        return !!result;
    }


    async changeOwner(businessId: string, newOwnerName: string | null): Promise<boolean> {
        const result = await this.repository.modify(businessId, business => {
            business.setOwner(newOwnerName);
            this.pickupService.refreshPickups(business);
        });

        return !!result;
    }


    async getNearestBusinessFromPlayer(player: Player, range: number = 2.0): Promise<Business | null> {
        const businesses = await this.repository.findAll();

        let closestBiz: Business | null = null;
        let minDistance = range;

        const { x, y, z } = player.getPos();

        for (const biz of businesses) {
            if (player.getVirtualWorld() !== biz.exteriorCoords.vw) continue;
            if (player.getInterior() !== biz.exteriorCoords.int) continue;

            const { x: bX, y: bY, z: bZ } = biz.exteriorCoords;

            const dist = Math.sqrt(
                Math.pow(x - bX, 2) + 
                Math.pow(y - bY, 2) + 
                Math.pow(z - bZ, 2)
            );

            if (dist <= minDistance) {
                minDistance = dist;
                closestBiz = biz;
            }
        }

        return closestBiz;
    }


    async getBusinessPlayerIsIn(player: Player): Promise<Business | null> {
        if (!player.getVirtualWorld()) return null;

        const businesses = await this.repository.findAll();

        for (const biz of businesses) {
            const { vw, int } = biz.interiorCoords;

            if (vw === player.getVirtualWorld() && int === player.getInterior()) return biz;
        }

        return null;
    }


    async enterBusiness(player: Player, businessId: string): Promise<boolean> {
        const business = await this.repository.findById(businessId);
        if (!business) return false;

        if (!business.isPlayerNear(player)) {
            player.sendClientMessage(Colors.White, "No estás cerca de un negocio.");
            return false;
        }

        const { x, y, z } = business.exteriorCoords;

        if (!player.isInRangeOfPoint(2, x, y, z)) {
            player.sendClientMessage(Colors.White, "No estás cerca de la entrada del negocio.");
            return false;
        }

        return business.enter(player);
    }


    async exitBusiness(player: Player, businessId: string): Promise<boolean> {
        const business = await this.repository.findById(businessId);
        if (!business) return false;

        if (!business.isPlayerIn(player)) {
            player.sendClientMessage(Colors.White, "No estás dentro de un negocio.");
            return false;
        }

        const { x, y, z } = business.interiorCoords;

        if (!player.isInRangeOfPoint(2, x, y, z)) {
            player.sendClientMessage(Colors.White, "No estás cerca de la salida del negocio.");
            return false;
        }

        return business.exit(player);
    }


    async purchaseBusiness(player: Player, businessId: string): Promise<boolean> {
        const business = await this.repository.findById(businessId);
        if (!business) return false;

        if (!business.canBeBought(player.getMoney())) return false;

        player.giveMoney(-business.price);
        business.setOwner(player.getName().name);

        await this.repository.save(businessId, business);

        this.pickupService.refreshPickups(business);

        return true;
    }

}




export class BusinessPickupService {
    private pickups: Map<string, IBusinessPickup> = new Map();
    private pickupIdMap: Map<number, PickupRef> = new Map();

    private readonly PICKUP_MODEL_FOR_SALE  = 1273;
    private readonly PICKUP_MODEL_OWNED     = 1272;
    private readonly PICKUP_MODEL_INTERIOR  = 19198;

    private readonly PICKUP_STREAM_DISTANCE = 100;
    

    refreshPickups(business: Business) {
        const existingPickup = this.pickups.get(business.id);

        if (existingPickup) this.removePickups(business.id);

        const exteriorPickupModel = business.canBeBought(Infinity) ? this.PICKUP_MODEL_FOR_SALE : this.PICKUP_MODEL_OWNED;

        const extCoords = business.exteriorCoords;
        const intCoords = business.interiorCoords;

        const interiorPickup = new DynamicPickup({ modelId: this.PICKUP_MODEL_INTERIOR, type: 1, x: intCoords.x, y: intCoords.y, z: intCoords.z, worldId: intCoords.vw, interiorId: intCoords.int, streamDistance: this.PICKUP_STREAM_DISTANCE }).create();
        const exteriorPickup = new DynamicPickup({ modelId: exteriorPickupModel, type: 1, x: extCoords.x, y: extCoords.y, z: extCoords.z, worldId: extCoords.vw, interiorId: extCoords.int, streamDistance: this.PICKUP_STREAM_DISTANCE }).create();
        
        this.pickups.set(business.id, { interior: interiorPickup, exterior: exteriorPickup });

        this.pickupIdMap.set(interiorPickup.id, { businessId: business.id, type: "interior" })
        this.pickupIdMap.set(exteriorPickup.id, { businessId: business.id, type: "exterior" })
    }


    removePickups(businessId: string) {
        const pickups = this.pickups.get(businessId);

        if (pickups) {
            this.pickupIdMap.delete(pickups.exterior.id);
            this.pickupIdMap.delete(pickups.interior.id);

            pickups.exterior.destroy();
            pickups.interior.destroy();
            this.pickups.delete(businessId);
        }
    }

    getBusinessByPickupId(pickupId: number): PickupRef | undefined {
        return this.pickupIdMap.get(pickupId);
    }
 
    // Para la carga inicial.
    refreshAll(businesses: Business[]) {
        for (const biz of businesses) {
            this.refreshPickups(biz);
        }
    }
}