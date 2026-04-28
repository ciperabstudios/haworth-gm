import { BusinessRepository } from "./repository";
import type { Business } from "./domain";
import { BusinessPickupService, BusinessService } from "./service";
import { CachedRepository } from "@utils/interfaces/repository";
import { BusinessProductService } from "../products";


export const businessDbRepo = new BusinessRepository();
export const businessCacheRepo = new CachedRepository<Business>(businessDbRepo);
// await businessCacheRepo.initialize();

export const businessPickupService = new BusinessPickupService();
export const businessService = new BusinessService(businessCacheRepo, businessPickupService);
//await businessService.loadAllBusinesses();

export const businessProductService = new BusinessProductService(businessCacheRepo);

export const initializeBusinesses = async () => {
    await businessCacheRepo.initialize("negocios");
    await businessService.loadAllBusinesses();
}