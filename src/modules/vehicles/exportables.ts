import { CachedRepository } from "@utils/interfaces/repository";
import { logger } from "@logger";
import type { CustomBaseVehicle } from "./variants/BaseVehicle";
import { VehicleRepository } from "./infrastructure/repository";
import { VehicleService } from "./infrastructure/service";

const vehicleDbRepo = new VehicleRepository();
const vehicleCacheRepo = new CachedRepository<CustomBaseVehicle<any>>(vehicleDbRepo, logger, "vId");
export const vehicleService = new VehicleService(vehicleCacheRepo);

export const initializeVehicles = async () => {
    await vehicleService.resetAllInGameIds();
    await vehicleService.loadStaticVehicles();
};