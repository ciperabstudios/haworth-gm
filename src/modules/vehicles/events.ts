import { CustomPlayerEvent } from "src/classes/events/CustomEvent";
import { vehicleService } from "./exportables";
import { oneSecondDrivingTimer, speedoMeter } from "./functions";
import { timerManager } from "@managers/TimerManager";

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    await vehicleService.loadPlayerVehicles(player);

    const speedometer = speedoMeter(player);
    await oneSecondDrivingTimer(player, speedometer);

    return next();
});

CustomPlayerEvent.onLogout(async ({ player, next }) => {
    setTimeout(async () => {
        await vehicleService.unloadPlayerVehicles(player);
    }, 60_000 * 5 /* 5 minutos para que se despawneen. */)

    speedoMeter(player).destroy();
    timerManager.deletePlayerTimer(player, "driving");

    return next();
});