import { VehicleEvent } from "@infernus/core";

VehicleEvent.onSpawn(async ({ vehicle, next }) => {

    return next();
})