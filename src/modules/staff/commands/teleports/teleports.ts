import StaffCommand from "@commands/StaffCommand";
//import { BaseVehicle } from "@/modules";
import { Player } from "@infernus/core";


type City = "Los Santos" | "San Fierro" | "Las Venturas";

const teleportPlayerToCity = (player: Player, city: City) => {

    const CITIES_COORDS = {
        "Los Santos":   { x: 1529.6,     y: -1705.5,   z: 13.4    },
        "San Fierro":   { x: -2016.4399, y: -79.7714,  z: 35.3203 },
        "Las Venturas": { x: 1694.6566,  y: 1453.4523, z: 10.7632 }
    }

    const { x, y, z } = CITIES_COORDS[city];

    player.setInterior(0);
    player.setVirtualWorld(0);

/*     if (player.isInAnyVehicle()) { // TODO
        const veh = player.getVehicle() as BaseVehicle;
        //veh.move({ x, y, z });

        return player.sendClientMessage(-1, `Has sido teletransportado a ${city}.`);
    } */

    player.setPos(x, y, z);

    return player.sendClientMessage(-1, `Has sido teletransportado a ${city}.`);
}


new StaffCommand({
    name: "ls",
    requiredFlag: "TELEPORTS",
    loggable: true,
    description: "Envía para Los Santos al administrador que lo utilizó.",
    run: async ({ player, subcommand, next }) => {

        teleportPlayerToCity(player, "Los Santos");

        return next();

    }
});


new StaffCommand({
    name: "sf",
    requiredFlag: "TELEPORTS",
    loggable: true,
    description: "Envía para San Fierro al administrador que lo utilizó.",
    run: async ({ player, subcommand, next }) => {

        teleportPlayerToCity(player, "San Fierro");

        return next();

    }
});


new StaffCommand({
    name: "lv",
    requiredFlag: "TELEPORTS",
    loggable: true,
    description: "Envía para Las Venturas al administrador que lo utilizó.",
    run: async ({ player, subcommand, next }) => {

        teleportPlayerToCity(player, "Las Venturas");

        return next();

    }
});