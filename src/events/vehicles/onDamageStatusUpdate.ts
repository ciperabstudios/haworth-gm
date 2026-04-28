import { VehicleEvent } from "@infernus/core";

VehicleEvent.onDamageStatusUpdate(async ({ vehicle, player, next }) => {
    return next();
})