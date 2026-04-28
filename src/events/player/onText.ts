//import { BaseVehicle } from "@/modules";
import { ProximityDetector } from "@modules/server/chat/functions";
import { PlayerEvent } from "@infernus/core";


PlayerEvent.onText(({ player, text, buffer, next }) => {
    

    if (!player.isInAnyVehicle()) {
        const message = `${player.getName(true).name} dice: ${text}`;

        ProximityDetector({ radius: 30, player, color: "#ffffff", message });
        return false;
    }


    //const veh = player.getVehicle() as BaseVehicle;

    /*const playerWindowSeat = veh.windows[player.getVehicleSeat()];

    const message = `${player.getName().name.replace("_", " ")} dice [{FF9B6A}en el auto - ven. ${playerWindowSeat === "CLOSED" ? "alta" : "baja"}{FFFFFF}]: ${text}`;

    veh.seats.forEach(player => ProximityDetector({ radius: 10, player, color: "#ffffff", message }));*/

    return false;
});