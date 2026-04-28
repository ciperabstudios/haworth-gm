import { VehicleEvent } from "@infernus/core";

VehicleEvent.onPlayerEnter(async ({ player, vehicle, isPassenger, next }) => {

    return next();
})