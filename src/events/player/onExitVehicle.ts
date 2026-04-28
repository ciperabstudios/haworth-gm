import { speedoMeter } from "@modules/vehicles/functions";
import { VehicleEvent } from "@infernus/core";

VehicleEvent.onPlayerExit(({ player, vehicle, next }) => {
    speedoMeter(player)?.hide();
    return next();
});