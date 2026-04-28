import StaffCommand from "@commands/StaffCommand";
import { BaseDoor, doorService, type IFactionDoor } from "./core";
import { Colors } from "@modules/server/colors";
import { Dialog, DialogStylesEnum } from "@infernus/core";
import Command from "@commands/Command";
import { factionCacheRepo, factionService } from "@modules/factions";

new StaffCommand({
    name: "createpublicdoor",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (!player.isSpawned()) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar spawneado para utilizar este comando.");

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        const door = await doorService.createPublicDoor({
            interior: { x: 0, y: 0, z: 0, int: 0, vw: 0 },
            exterior: { x, y, z, int, vw },
        });

        player.sendClientMessage(Colors.LightGreen, `Has creado una puerta exitosamente. Utiliza /editdoorint '${door.id}' para editar las coordenadas de su interior.`);

        success();
        return next();
    }
});


new StaffCommand({
    name: "createfactiondoor",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /createfactiondoor <ID_Facción> [ID_Pickup]");
        if (!player.isSpawned()) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar spawneado para utilizar este comando.");
        
        if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.LightRed, "ID de facción inválido.");

        const factionId = subcommand[0];

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.WrongSintaxis, "Facción no encontrada.");

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        let door: BaseDoor<IFactionDoor>;

        if (subcommand.at(1)) {
            if (isNaN(+subcommand[1])) return player.sendClientMessage(Colors.LightRed, "ID de pickup inválido.");

            const pickupId = +subcommand[1];

            door = await doorService.createFactionDoor(factionId, {
                interior: { x: 0, y: 0, z: 0, int: 0, vw: 0 },
                exterior: { x, y, z, int, vw },
                pickupIcon: pickupId
            });

            player.sendClientMessage(Colors.LightGreen, `Has creado una puerta faccionaria exitosamente. Utiliza /editdoorint '${door.id}' para editar las coordenadas de su interior.`);
            
            success();
            return next();
        }

        door = await doorService.createFactionDoor(factionId, {
            interior: { x: 0, y: 0, z: 0, int: 0, vw: 0 },
            exterior: { x, y, z, int, vw },
        });

        player.sendClientMessage(Colors.LightGreen, `Has creado una puerta faccionaria exitosamente. Utiliza /editdoorint '${door.id}' para editar las coordenadas de su interior.`);
        
        success();
        return next();
    }
});


new StaffCommand({
    name: "deletedoor",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /deletedoor <DoorID>");

        const doorId = subcommand[0];

        if (isNaN(+doorId)) return player.sendClientMessage(Colors.WrongSintaxis, "La ID de door ingresada no es válida.");

        const door = await doorService.findById(doorId);
        if (!door) return player.sendClientMessage(Colors.WrongSintaxis, "Door a borrar no encontrada.");

        await doorService.deleteDoor(doorId);

        player.sendClientMessage(Colors.LightGreen, `Puerta ${doorId} borrada exitosamente.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "editdoorint",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /editdoorint <DoorID>");
        if (!player.isSpawned()) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar spawneado para utilizar este comando.");

        const doorId = subcommand[0];

        if (isNaN(+doorId)) return player.sendClientMessage(Colors.WrongSintaxis, "La ID de door ingresada no es válida.");

        const door = await doorService.findById(doorId);
        if (!door) return player.sendClientMessage(Colors.WrongSintaxis, "Door no encontrada.");

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        await doorService.modify(doorId, door => door.setInterior({ x, y, z, int, vw }));

        player.sendClientMessage(Colors.LightGreen, `Has editado el interior de la door ${doorId} exitosamente.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "editdoorext",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /editdoorext <DoorID>");
        if (!player.isSpawned()) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar spawneado para utilizar este comando.");

        const doorId = subcommand[0];

        if (isNaN(+doorId)) return player.sendClientMessage(Colors.WrongSintaxis, "La ID de door ingresada no es válida.");

        const door = await doorService.findById(doorId);
        if (!door) return player.sendClientMessage(Colors.WrongSintaxis, "Door no encontrada.");

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        await doorService.modify(door.id, door => door.setExterior({ x, y, z, int, vw }));

        player.sendClientMessage(Colors.LightGreen, `Has editado el exterior de la door ${doorId} exitosamente.`);

        success();
        return next();
    }
});


new StaffCommand({
    name: "editdoorpickup",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /editdoorpickup <DoorID> <NewPickupID>");

        const [doorId, pickupId] = subcommand;

        if (isNaN(+doorId)) return player.sendClientMessage(Colors.WrongSintaxis, "La ID de door ingresada no es válida.");
        if (isNaN(+pickupId)) return player.sendClientMessage(Colors.LightRed, "ID de pickup inválido.");

        const door = await doorService.findById(doorId);
        if (!door) return player.sendClientMessage(Colors.WrongSintaxis, "Door no encontrada.");

        await doorService.modify(door.id, door => door.setPickupIcon(+pickupId));

        player.sendClientMessage(Colors.LightGreen, `Has editado el pickup de la door ${doorId} exitosamente.`);

        success();
        return next();
    }
});



new StaffCommand({
    name: "checkdoor",
    requiredFlag: "DEVELOPER",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /checkdoor <DoorID>")

        const doorId = subcommand[0];

        if (isNaN(+doorId)) return player.sendClientMessage(Colors.WrongSintaxis, "La ID de door ingresada no es válida.");

        const door = await doorService.findById(doorId);
        if (!door) return player.sendClientMessage(Colors.WrongSintaxis, "Door no encontrada.");

        const { 
            interior: { x: iX, y: iY, z: iZ, int: iInt, vw: iVw }, 
            exterior: { x: eX, y: eY, z: eZ, int: eInt, vw: eVw } 
        } = door.coordinates;

        const formattedDoorData = `Tipo\t${door.kind}\nModelo de pickup\t${door.pickupIcon}\nCoordenadas (interior)\tx: ${iX.toFixed(3)} - y: ${iY.toFixed(3)} - z: ${iZ.toFixed(3)} - int: ${iInt} - vw: ${iVw}\nCoordenadas (exterior)\tx: ${eX.toFixed(3)} - y: ${eY.toFixed(3)} - z: ${eZ.toFixed(3)} - int: ${eInt} - vw: ${eVw}`;

        const dialog = new Dialog({
            style: DialogStylesEnum.TABLIST,
            caption: `H. > Información de la door ${door.id}`,
            info: formattedDoorData,
            button1: "Aceptar"
        });

        await dialog.show(player);
        return next();
    }
});



new Command({
    name: "enterdoor",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const nearestDoor = await doorService.getNearestDoorFromPlayer(player);
        if (!nearestDoor) return next();

        await doorService.enterDoor(player, nearestDoor.id);

        return next();
    }
});



new Command({
    name: "exitdoor",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const nearestDoor = await doorService.getNearestDoorFromPlayer(player);
        if (!nearestDoor) return next();

        await doorService.exitDoor(player, nearestDoor.id);

        return next();
    }
});