import Command from "@commands/Command";
import { PlayerStateEnum } from "@infernus/core";
import { showInfoForPlayer } from "@modules/filterscripts";
import { Colors } from "@modules/server/colors";
import { vehicleService, VehicleUtils } from "@modules/vehicles";


new Command({
    name: "motor",
    aliases: ["engine"],
    category: "PLAYER",
    subcategory: "VEHICLES",
    description: "Enciende o apaga el motor de un vehículo.",
    run: async ({ player, subcommand, next }) => {

        if (!player.isInAnyVehicle()) return showInfoForPlayer(player, "No estás dentro de un vehículo.", 3000);
        if (player.getState() !== PlayerStateEnum.DRIVER) return showInfoForPlayer(player, "Tienes que ser el conductor para encender el motor.", 3000);

        const veh = vehicleService.findByGameId(player.getVehicle()!.id)!;

        if (VehicleUtils.isType(veh.getModel(), "BIKE")) return player.sendClientMessage(Colors.WrongSintaxis, "Las bicicletas no cuentan con motor.");

        const message = `** ${player.getName(true).name} gira su llave, ${!veh.isEngineOn() ? "encendiendo" : "apagando"} el motor del ${veh.name}.`;
        player.sendClientMessage("#CBA9E4", message);

        showInfoForPlayer(player, `${!veh.isEngineOn() ? "Encendiendo" : "Apagando"} vehículo...`, 2000);
        
        setTimeout(() => veh.toggleEngine(!veh.isEngineOn()), 200);

        return next();
    }
});



new Command({
    name: "luces",
    aliases: ["lights"],
    category: "PLAYER",
    subcategory: "VEHICLES",
    description: "Enciende o apaga las luces de un vehículo.",
    run: async ({ player, subcommand, next }) => {
        
        if (!player.isInAnyVehicle()) return showInfoForPlayer(player, "No estás dentro de un vehículo.", 3000);

        const veh = vehicleService.findByGameId(player.getVehicle()!.id)!;

        if (VehicleUtils.isType(veh.getModel(), "BIKE")) return player.sendClientMessage(Colors.WrongSintaxis, "Las bicicletas no cuentan con luces.");

        const message = `** ${player.getName(true).name} ${!veh.areLightsOn() ? "prende" : "apaga"} las luces del ${veh.name}.`;
        player.sendClientMessage("#CBA9E4", message);

        veh.toggleLights(!veh.areLightsOn());

        return next();
    }
});


new Command({
    name: "alarma",
    aliases: ["alarm"],
    category: "PLAYER",
    subcategory: "VEHICLES",
    description: "Enciende o apaga la alarma de un vehículo.",
    run: async ({ player, subcommand, next }) => {
        
        if (!player.isInAnyVehicle()) return showInfoForPlayer(player, "No estás dentro de un vehículo.", 3000);
        if (player.getState() !== PlayerStateEnum.DRIVER) return showInfoForPlayer(player, "Tienes que ser el conductor para encender la alarma.", 3000);

        const veh = vehicleService.findByGameId(player.getVehicle()!.id)!;

        const message = `* ${player.getName(true).name} ${!veh.isAlarmOn() ? "prende" : "apaga"} la alarma del ${veh.name}.`;
        player.sendClientMessage("#CBA9E4", message);

        veh.toggleAlarm(!veh.isAlarmOn());

        return next();
    }
});



new Command({
    name: "capo",
    aliases: ["bonnet"],
    category: "PLAYER",
    subcategory: "VEHICLES",
    description: "Abre o cierra el capó de un vehículo.",
    run: async ({ player, subcommand, next }) => {
        
        const closestVehicle = VehicleUtils.getPlayerClosestVehicle(player);
        if (!closestVehicle) return showInfoForPlayer(player, "No estás cerca de ningún vehículo.",  3000);

        const veh = vehicleService.findByGameId(closestVehicle.id)!;

        if (!VehicleUtils.hasCapoOrDoors(veh.getModel())) return player.sendClientMessage(Colors.WrongSintaxis, "Este vehículo no cuenta con capó.");

        const { fX: x, fY: y, z } = VehicleUtils.getPosInFront(veh.id);
        if (!player.isInRangeOfPoint(2.5, x, y, z)) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar más cerca del capó para abrirlo.");

        const message = `* ${player.getName(true).name} ${!veh.isBonnetOpen() ? "abre" : "cierra"} el capó del ${veh.name}.`;
        player.sendClientMessage("#CBA9E4", message);

        veh.toggleBonnet(!veh.isBonnetOpen());

        return next();
    }
});
/* 

new Command({
    name: "cinturon",
    aliases: ["seatbelt"],
    category: "PLAYER",
    subcategory: "VEHICLES",
    description: "Coloca o descoloca el cinturón de un jugador en un vehículo.",
    run: async ({ player, subcommand, next }) => {
        
        if (!player.isInAnyVehicle()) return showInfoForPlayer(player, "No estás dentro de un vehículo.", 3000);

        const veh = player.getVehicle() as BaseVehicle;

        veh.toggleSeatbelt(player);

        return next();
    }
});


new Command({
    name: "seguro",
    aliases: ["lock"],
    category: "PLAYER",
    subcategory: "VEHICLES",
    description: "Bloquea o desbloquea las puertas de un vehículo.",
    run: async ({ player, subcommand, next }) => {
        
        const closestVehicle = VehicleUtils.getPlayerClosestVehicle(player);
        if (!closestVehicle) return showInfoForPlayer(player, "No estás cerca de ningún vehículo.", 3000);

        closestVehicle.lockDoors(player);

        return next();
    }
});


new Command({
    name: "ventanilla",
    aliases: ["ventana", "ventanilla" ,"window"],
    description: "Sube o baja la ventanilla de tu asiento en un vehículo.",
    run: async ({ player, subcommand, next }) => {
        
        if (!player.isInAnyVehicle()) return showInfoForPlayer(player, "No estás dentro de un vehículo.", 3000);
        if (player.getState() !== PlayerStateEnum.DRIVER) return next();

        const veh = player.getVehicle() as BaseVehicle;

        await veh.windowManagement(player);

        return next();
    }
});


new Command({
    name: "puertasveh",
    description: "Accede al panel de puertas de un vehículo.",
    run: async ({ player, subcommand, next }) => {
        
        const veh = player.getVehicle() as BaseVehicle | undefined;

        if (!veh) return;

        await veh.doorManagement(player);

        return next();
    }
});


new Command({
    name: "revisarveh",
    description: "",
    syntax: "/revisarveh",
    run: async ({ player, subcommand, next }) => {

      const vehicle = player.getVehicle();
      
      ShowPlayerVehicleStatus(player, vehicle?.id as number, 0);
      return next();

    }
}); */