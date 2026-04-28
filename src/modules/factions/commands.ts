import FactionCommand from "@commands/FactionCommand";
import { Dialog, DialogStylesEnum, Player, PlayerStateEnum } from "@infernus/core";
import { Colors } from "@modules/server/colors";
import { factionService } from "./infrastructure";
import { vehicleService } from "@modules/vehicles";

new FactionCommand({
    name: "f",
    description: "Chat OOC faccionario.",
    requiredPermission: "faction.ooc_chat",
    category: "PLAYER", // FACTION.
    run: async ({ player, subcommand, faction, member, next }) => {
        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /f [Mensaje]");

        const text = subcommand.join(" ");

        const roleObj = faction.roles.find(r => r.uid === member.roleUid);
        const roleName = roleObj?.name ?? "Miembro";

        const hexColor = faction.color.replace("#", "");
        const formattedMsg = `{${hexColor}}(( [${roleName}] ${player.getName().name}: ${text} ))`;

        const onlinePlayers = Player.getInstances();

        for (const p of onlinePlayers) {
            if (faction.isPlayerMember(p.getName().name)) p.sendClientMessage(-1, formattedMsg);
        }

        return next();
    }
})


new FactionCommand({
    name: "finvite",
    description: "Invitar a un usuario a la facción.",
    requiredPermission: "faction.management",
    run: async ({ player, subcommand, faction, member, next }) => {
        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /invite [ID/Nombre]");

        const targetId = parseInt(subcommand[0]);

        const target = Player.getInstance(targetId);
        if (!target) return player.sendClientMessage(Colors.Red, "Jugador no encontrado.");

        if (faction.isPlayerMember(target.getName().name)) return player.sendClientMessage(Colors.Red, "Este jugador ya es miembro de tu facción.");

        const targetFaction = factionService.getFactionByMemberName(target.getName().name);
        if (targetFaction) return player.sendClientMessage(Colors.Red, "El jugador ya pertenece a otra facción.");

        const minRoleUid = Math.min(...faction.roles.map(r => r.uid));
        
        const dialog = new Dialog({
            style: DialogStylesEnum.MSGBOX,
            caption: `Invitación a ${faction.name}`,
            info: `Has sido invitado a la facción ${faction.name} por ${player.getName().name}.`,
            button1: "Aceptar",
            button2: "Rechazar"
        })

        const { response } = await dialog.show(player);

        if (!response) return player.sendClientMessage(Colors.Red, `El usuario ${player.getName().name} ha rechazado la invitación a la facción.`);
        
        player.sendClientMessage(Colors.Green, `El usuario ${player.getName().name} ha aceptado la invitación a la facción.`);

        //await factionService.modify(faction.id, faction => faction.addMember({ name: target.getName().name, roleUid: minRoleUid }));

        await factionService.addMember(faction.id, target.getName().name, minRoleUid);

        return next();
    }
});




new FactionCommand({
    name: "fkick",
    aliases: ["expulsarmiembro"],
    description: "Expulsar a un miembro de la facción.",
    requiredPermission: "faction.management",
    run: async ({ player, subcommand, faction, member, next }) => {
        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /expulsar [Nombre_Apellido]");
        
        if (faction.leader !== player.getName().name && faction.subLeader !== player.getName().name) return player.sendClientMessage(Colors.Red, "Solo el líder y sub-líder pueden expulsar miembros.");

        const targetName = subcommand.join("_");

        if (!faction.isPlayerMember(targetName)) return player.sendClientMessage(Colors.Red, "Ese jugador no es miembro de tu facción.");
        if (targetName === player.getName().name) return player.sendClientMessage(Colors.Red, "No puedes expulsarte a ti mismo.");
        if (targetName === faction.leader) return player.sendClientMessage(Colors.Red, "No puedes expulsar al líder.");

        //await factionService.modify(faction.id, faction => faction.removeMember(targetName));
        await factionService.removeMember(faction.id, targetName);

        player.sendClientMessage(Colors.Yellow, `Has expulsado a ${targetName} de la facción.`);

        const target = Player.getInstances().find(p => p.getName().name === targetName);
        if (target) target.sendClientMessage(Colors.Red, `Has sido expulsado de la facción ${faction.name}.`);

        return next();
    }
})





new FactionCommand({
    name: "fsetrolename",
    aliases: ["fcambiarnombrerol"],
    requiredPermission: "faction.management",
    description: "",
    run: async ({ player, subcommand, faction, member, next }) => {

        if (faction.leader !== player.getName().name && faction.subLeader !== player.getName().name) return player.sendClientMessage(Colors.Red, "Solo el líder y sub-líder pueden modificar el nombre de los rangos.");

        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /fcambiarnombrerol [UID_Rol] [Nombre nuevo]");

        const roleUid = parseInt(subcommand[1]);

        if (isNaN(roleUid)) return player.sendClientMessage(Colors.WrongSintaxis, "UID de rol inválido.");
        if (!faction.roleExists(roleUid)) return player.sendClientMessage(Colors.Red, "No existe un rol con ese UID en tu facción.");

        const newRoleName = subcommand.slice(1).join(" ");

        const role = faction.roles.find(r => r.uid === roleUid)!;
        const previousName = role.name;

        await factionService.modify(faction.id, faction => faction.changeRoleName(roleUid, newRoleName));

        player.sendClientMessage(Colors.Green, `Has cambiado el nombre del rango ${previousName} a ${newRoleName} (UID: ${role.uid}).`);

        return next();
    }
});


new FactionCommand({
    name: "festacionar",
    aliases: ["fpark"],
    requiredPermission: "faction.park_vehicles",
    description: "",
    run: async ({ player, subcommand, faction, member, next }) => {

        if (faction.leader !== player.getName().name && faction.subLeader !== player.getName().name) return player.sendClientMessage(Colors.Red, "Solo el líder y sub-líder pueden estacionar los vehículos faccionarios.");

        if (!player.isInAnyVehicle()) return player.sendClientMessage(Colors.Red, "No estás en ningún vehículo.");
        if (player.getState() !== PlayerStateEnum.DRIVER) return player.sendClientMessage(Colors.Red, "Solo el piloto puede estacionar el vehículo.");

        const vehicleId = player.getVehicle()!.id;
        
        const vehicle = await vehicleService.findByGameId(vehicleId);
        if (!vehicle) return player.sendClientMessage(Colors.WrongSintaxis, "Ha ocurrido un error intentando estacionar. Contacta con los desarrolladores de Haworth.");

        await vehicleService.updateParkingLocation(vehicle.vId);
        
        player.sendClientMessage(Colors.Green, `Estacionaste el ${vehicle.name} (ID: ${vehicle.id}).`);
        return next();
    }
});




new FactionCommand({
    name: "fpromote",
    requiredPermission: "faction.management",
    aliases: ["fpromover"],
    description: "",
    run: async ({ player, subcommand, faction, member, next }) => {

        if (faction.leader !== player.getName().name && faction.subLeader !== player.getName().name) return player.sendClientMessage(Colors.Red, "Solo el líder y sub-líder pueden promover miembros.");
        
        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /fpromover [ID_Jugador] [UID_Rol]");

        const targetId = parseInt(subcommand[0]);
        const roleUid = parseInt(subcommand[1]);

        const target = Player.getInstance(targetId);
        if (isNaN(targetId)) return player.sendClientMessage(Colors.WrongSintaxis, "ID de jugador inválido.");
        if (!target) return player.sendClientMessage(Colors.Red, "Jugador no encontrado.");

        if (isNaN(roleUid)) return player.sendClientMessage(Colors.WrongSintaxis, "UID de rol inválido.");

        if (!faction.isPlayerMember(target.getName().name)) return player.sendClientMessage(Colors.Red, "El jugador no está en tu facción.");
        if (!faction.roleExists(roleUid)) return player.sendClientMessage(Colors.Red, "No existe un rol con ese UID en tu facción.");
        
        const targetRoleObj = faction.roles.find(r => r.uid === roleUid)!;
        
        faction.changeMemberRole(target.getName().name, roleUid);

        player.sendClientMessage(Colors.Green, `Has ascendido a ${target.getName().name} (${target.id}) al rango ${targetRoleObj.name} (UID: ${targetRoleObj.uid}).`);
        target.sendClientMessage(Colors.LightBlue, `Has sido ascendido al rango ${targetRoleObj.name}.`);

        return next();
    }
});


new FactionCommand({
    name: "fdemote",
    requiredPermission: "faction.management",
    aliases: ["fdegradar"],
    description: "",
    run: async ({ player, subcommand, faction, member, next }) => {

        if (faction.leader !== player.getName().name && faction.subLeader !== player.getName().name) return player.sendClientMessage(Colors.Red, "Solo el líder y sub-líder pueden degradar miembros.");
        
        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /fdegradar [ID_Jugador] [UID_Rol]");

        const targetId = parseInt(subcommand[0]);
        const roleUid = parseInt(subcommand[1])

        const target = Player.getInstance(targetId);
        if (isNaN(targetId)) return player.sendClientMessage(Colors.WrongSintaxis, "ID de jugador inválido.");
        if (!target) return player.sendClientMessage(Colors.Red, "Jugador no encontrado.");

        if (isNaN(roleUid)) return player.sendClientMessage(Colors.WrongSintaxis, "UID de rol inválido.");

        if (!faction.isPlayerMember(target.getName().name)) return player.sendClientMessage(Colors.Red, "El jugador no está en tu facción.");
        if (!faction.roleExists(roleUid)) return player.sendClientMessage(Colors.Red, "No existe un rol con ese UID en tu facción.");
        
        const targetRoleObj = faction.roles.find(r => r.uid === roleUid)!;
        
        faction.changeMemberRole(target.getName().name, roleUid);

        player.sendClientMessage(Colors.Green, `Has degradado a ${target.getName().name} (${target.id}) al rango ${targetRoleObj.name} (UID: ${targetRoleObj.uid}).`);
        target.sendClientMessage(Colors.LightBlue, `Has sido degradado al rango ${targetRoleObj.name}.`);

        return next();
    }
});


new FactionCommand({
    name: "fstats",
    requiredPermission: "faction.stats",
    description: "",
    run: async ({ player, subcommand, faction, member, next }) => {

        const factionStatsData = `Cantidad de miembros: ${faction.members.length}\nCantidad de roles: ${faction.roles.length}`;

        const dialog = new Dialog({
            style: DialogStylesEnum.LIST,
            caption: `H. > Estadísticas de ${faction.name}`,
            info: factionStatsData,
            button1: "Aceptar"
        });

        await dialog.show(player);

        return next();
    }
});




new FactionCommand({
    name: "radio",
    requiredPermission: "police.radio",
    aliases: ["r"],
    description: "",
    run: async ({ player, subcommand, faction, member, next }) => {

        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /r(adio) [Mensaje]");

        const text = subcommand.join(" ");

        // TODO: Volver dinámico el sistema de frecuencias (no hacer CH: 1 hardcodeado).
        // TODO: ¿Será buena idea dejar faction.id como canal? Se ve bastante bien.
    
        const formattedMsg = `** [CH: ${faction.id}] [ID: ${player.id}]: ${text}`;

        for (const p of Player.getInstances()) {
            if (faction.isPlayerMember(p.getName().name)) p.sendClientMessage(Colors.Radio.POLICE_DEPARTMENT, formattedMsg);
        }

        return next();
    }
})