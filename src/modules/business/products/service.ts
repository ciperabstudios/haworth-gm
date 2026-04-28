import type { Player } from "@infernus/core";
import type { CachedRepository } from "@utils/interfaces/repository";
import type { Business } from "../refactor";

export class BusinessProductService {
    constructor(private readonly repository: CachedRepository<Business>/* IRepository<Business> */) {}

    async modify<R>(businessId: string, operation: (business: Business) => R): Promise<R | null> {
        return this.repository.modify(businessId, operation);
    }

    async buyProduct(player: Player, businessId: string, productUid: number) {
        const business = await this.repository.findById(businessId);
        if (!business) return false;

        const product = business.purchaseProduct(productUid, player.getMoney());
        if (!product) return false;

        player.giveMoney(-product.price);

        await this.repository.save(businessId, business);
    }
}