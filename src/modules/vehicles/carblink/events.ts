import { KeysEnum, PlayerEvent, PlayerStateEnum, VehicleEvent } from "@infernus/core";
import { Carblink, CARBLINK_TIME, CarblinkTimer, LightsVehicle } from "./constants";
//import { BaseVehicle } from "../variants";

/*
VehicleEvent.onSpawn(({ vehicle, next }) => {
    const timer = CarblinkTimer.get(vehicle);
    if (!timer) clearTimeout(timer);
    Carblink.delete(vehicle);
    CarblinkTimer.delete(vehicle);
    next();
});

PlayerEvent.onKeyStateChange(({ player, newKeys, next }) => {
    if (!(newKeys & KeysEnum.YES) || player.getState() !== PlayerStateEnum.DRIVER) return next();

    const vehicle = player.getVehicle() as BaseVehicle;
    if (!LightsVehicle.get(vehicle)) return next();

    const isBlinking = Carblink.get(vehicle) === 0;
    const timer = CarblinkTimer.get(vehicle);

    if (!isBlinking) {
        Carblink.set(vehicle, 0);
        const newTimer = setInterval(() => {
            const status = vehicle.getDamageStatus();
            if (!status) return;

            const { panels, doors, tires } = status;
            const blinkState = Carblink.get(vehicle) ?? 0;
            // Estados de luz para la secuencia de los intermitentes.
            const lightStates = [2, 5, 2, 4, 5, 4];
            vehicle.updateDamageStatus(panels, doors, lightStates[blinkState], tires);

            Carblink.set(vehicle, (blinkState + 1) % lightStates.length);
        }, CARBLINK_TIME);
        CarblinkTimer.set(vehicle, newTimer);
        return next();
    }

    if (timer) clearInterval(timer);

    Carblink.set(vehicle, -1);
    CarblinkTimer.delete(vehicle);

    const status = vehicle.getDamageStatus();
    if (status) {
        const { panels, doors, lights, tires } = status;
        vehicle.updateDamageStatus(panels, doors, lights, tires);
    }

    next();
});

*/