import { VehicleEvent } from "@infernus/core";

VehicleEvent.onStreamIn(({ vehicle, forPlayer, next }) => {
    /* if (!vehicle.isOccupied()) {
        const pos = vehicle.getPos();
        const angle = vehicle.getZAngle().angle;
        // vehicle.setPosition(pos.x, pos.y, pos.z);
        vehicle.setZAngle(angle);
    }
     */
    return next();
});