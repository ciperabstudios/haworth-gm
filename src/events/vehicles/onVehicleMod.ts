import { Vehicle, VehicleEvent } from "@infernus/core";

VehicleEvent.onMod(({ player, vehicle, componentId, next }) => {
    // Anti car component cheat.
    vehicle.removeComponent(componentId);
    return next();
});