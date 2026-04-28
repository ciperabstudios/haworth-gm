import Command from "@commands/Command";
import FactionCommand from "@commands/FactionCommand";
import StaffCommand from "@commands/StaffCommand";
import { Player, PlayerStateEnum } from "@infernus/core";
import { Dialog, DialogStylesEnum } from "@infernus/core";
import { ALL_FACTION_PERMISSIONS_LIST, FACTION_PERMISSIONS, FACTION_PERMISSIONS_DESCRIPTIONS, factionCacheRepo, factionService, type FactionPermissionString } from "@modules/factions";
import { Colors } from "@modules/server/colors";
import { vehicleService } from "@modules/vehicles";

new StaffCommand({
    name: "createfaction",
    requiredFlag: "MANAGE_FACTIONS",
    aliases: ["cf"],
    description: "",
    loggable: true,
    run: async ({ player, subcommand, next }) => {

        const FACTION_TYPES = ['POLICE', 'MEDIC', 'GOVERNMENT'];

        if (!subcommand.length || subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, `Uso: /cf [${FACTION_TYPES.join("|")}] [Nombre]`);

        const type = subcommand[0]?.toUpperCase();
        const name = subcommand.slice(1).join(" ");
        
        
        if (!FACTION_TYPES.includes(type) || !name) return player.sendClientMessage(Colors.WrongSintaxis, `Uso: /cf [${FACTION_TYPES.join("|")}] [Nombre]`);
        
        await factionService.createFaction({ name, type: type as any });

        player.sendClientMessage(Colors.Green, `Facción ${name} creada exitosamente.`);

        return next();
    }
});



new StaffCommand({
    name: "createfactionrole",
    requiredFlag: "MANAGE_FACTIONS",
    description: "",
    aliases: ["cfr"], 
    loggable: true,
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.length || subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /cfr [ID_Faccion] [Nombre]");

        const factionId = subcommand[0];
        const roleName = subcommand.slice(1).join(" ");


        const success = await factionService.createRole(factionId, roleName);

        success
            ? player.sendClientMessage(Colors.Green, "Rango creado.")
            : player.sendClientMessage(Colors.WrongSintaxis, "Error: Facción no existe o rango duplicado.")


        return next();
    }
});



new Command({
    name: "factions",
    aliases: ["facs"],
    description: "Muestra la lista de todas las facciones",
    run: async ({ player, subcommand, next }) => {

        const factions = await factionCacheRepo.findAll();

        if (!factions.length) return player.sendClientMessage(Colors.WrongSintaxis, "No hay facciones creadas.");

        const factionsData = factions.map(f => {
            return `${f.name}\t${f.alias}\t${f.members.length}`;
        }).join("\n");

        const dialog = new Dialog({
            style: DialogStylesEnum.TABLIST_HEADERS,
            caption: "H. > Listado de facciones",
            info: "Nombre\tAlias\tCant. Miembros\n" + factionsData
        });

        await dialog.show(player);

        return next();
    }
});



new StaffCommand({
    name: "factionranks",
    aliases: ["franks"],
    requiredFlag: "MANAGE_FACTIONS",
    loggable: false,
    description: "Muestra los rangos y sus UIDs de una facción.",
    run: async ({ player, subcommand, next }) => {
        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /factionranks [FactionID]");

        const [factionId] = subcommand;
        const faction = await factionCacheRepo.findById(factionId);

        if (!faction) return player.sendClientMessage(Colors.WrongSintaxis, "Facción no encontrada.");

        const factionRolesData = faction.roles.map(r => {
            return `${r.uid}\t${r.name}`;
        }).join("\n")

        const dialog = new Dialog({
            style: DialogStylesEnum.TABLIST_HEADERS,
            caption: `H. > Rangos de ${faction.name}`,
            info: "UID\tNombre\n" + factionRolesData
        });

        await dialog.show(player);

        return next();
    }
});



new StaffCommand({
    name: "setfactionmember",
    requiredFlag: "MANAGE_FACTIONS",
    loggable: true,
    description: "Asigna a un jugador a una facción.",
    run: async ({ player, subcommand, next }) => {
        if (subcommand.length < 3) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /setfactionmember [PlayerID] [FactionID] [RoleUID]");

        const targetId = parseInt(subcommand[0]);
        const factionId = subcommand[1];
        const roleUid = parseInt(subcommand[2]);

        const target = Player.getInstance(targetId);
        if (!target || !target.isConnected()) return player.sendClientMessage(Colors.Red, "Jugador no conectado.");

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.Red, "Facción no encontrada.");

        if (!faction.roleExists(roleUid)) return player.sendClientMessage(Colors.WrongSintaxis, `El rol con UID ${roleUid} no existe en esta facción.`);

        if (faction.isPlayerMember(target.getName().name)) return player.sendClientMessage(Colors.WrongSintaxis, "El jugador ya pertenece a esta facción.");

        const success = await factionService.modify(factionId, faction => faction.addMember({ name: target.getName().name, roleUid }));
        if (!success) return player.sendClientMessage(Colors.Red, "Error al agregar miembro (Revisa logs).");

        player.sendClientMessage(Colors.Green, `Has asignado a ${target.getName().name} a la facción ${faction.name}.`);
        target.sendClientMessage(Colors.LightBlue, `Has sido asignado a la facción ${faction.name} por un administrador.`);

        return next();
    }
});



new StaffCommand({
    name: "removefactionmember",
    requiredFlag: "MANAGE_FACTIONS",
    loggable: true,
    description: "Remueve a un jugador de una facción.",
    run: async ({ player, subcommand, next }) => {
        if (subcommand.length < 3) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /removefactionmember [PlayerID] [FactionID]");

        const targetId = parseInt(subcommand[0]);
        const factionId = subcommand[1];

        const target = Player.getInstance(targetId);
        if (!target || !target.isConnected()) return player.sendClientMessage(Colors.Red, "Jugador no conectado.");

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.Red, "Facción no encontrada.");

        if (faction.isPlayerMember(target.getName().name)) return player.sendClientMessage(Colors.WrongSintaxis, "El jugador no pertenece a esta facción.");

        const success = await factionService.modify(factionId, faction => faction.removeMember(target.getName().name));
        if (!success) return player.sendClientMessage(Colors.Red, "Error al remover miembro (Revisa logs).");

        player.sendClientMessage(Colors.Green, `Has removido a ${target.getName().name} de la facción ${faction.name}.`);
        target.sendClientMessage(Colors.LightBlue, `Has sido removido de la facción ${faction.name} por un administrador.`);

        return next();
    }
})




new StaffCommand({
    name: "removefactionrole",
    requiredFlag: "MANAGE_FACTIONS",
    loggable: true,
    description: "Elimina un rol de una facción (si no tiene miembros).",
    run: async ({ player, subcommand, next }) => {
        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /removerank [FactionID] [RoleUID]");

        const factionId = subcommand[0];
        const roleUid = parseInt(subcommand[1]);

        if (isNaN(roleUid)) return player.sendClientMessage(Colors.WrongSintaxis, "El UID ingreado no es válido.");

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.WrongSintaxis, "Facción no encontrada.");

        if (faction.roleHasMembers(roleUid)) return player.sendClientMessage(Colors.Red, "No puedes borrar este rango porque hay miembros que lo poseen. Cámbialos de rango primero.");
        
        const success = await factionService.modify(factionId, faction => faction.removeRole(roleUid));

        success
            ? player.sendClientMessage(Colors.Yellow, `Rango con UID ${roleUid} eliminado de ${faction.name}.`)
            : player.sendClientMessage(Colors.Red, "Error al eliminar rango (Quizás no existe).");

        return next();
    }
});


new StaffCommand({
    name: "factionwipe",
    aliases: ["fwipe"],
    requiredFlag: "MANAGE_FACTIONS",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /f(action)wipe [ID_Facción]");
        
        const factionId = subcommand[0];

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.Red, "No se encontró una facción con esa ID.");

        const factionMembers = faction.members;
        if (!factionMembers.length) return player.sendClientMessage(Colors.Red, "La facción no cuenta con miembros.");

        const dialog = new Dialog({
            style: DialogStylesEnum.INPUT,
            caption: "H. > Limpieza de facción (miembros)",
            info: `Estás a punto de limpiar la facción ${faction.name} (${faction.alias}) (ID: ${faction.id}).\n\nLa facción cuenta actualmente con ${faction.members.length} miembros.\n\nSi estás seguro, escribe el nombre de la facción:`,
            button1: "Borrar",
            button2: "Cancelar"
        });

        const { response, inputText } = await dialog.show(player);
        
        if (!response) return player.sendClientMessage(Colors.Red, "Se canceló la limpieza de la facción (limpieza cancelada).");
        if (inputText !== faction.name) return player.sendClientMessage(Colors.Red, "Se canceló la limpieza de la facción (nombre incorrecto introducido).");

        await factionService.modify(factionId, faction => {
            factionMembers.forEach(m => faction.removeMember(m.name));
        });

        player.sendClientMessage(Colors.Green, `Se han limpiado ${factionMembers.length} miembros de la facción ${faction.name} (ID: ${faction.id}).`);
        return next();
    }
});


new StaffCommand({
    name: "factionroleswipe",
    aliases: ["frwipe"],
    requiredFlag: "MANAGE_FACTIONS",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /f(action)rwipe [ID_Facción]");
        
        const factionId = subcommand[0];

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.Red, "No se encontró una facción con esa ID.");

        const factionRoles = faction.roles;
        if (!factionRoles.length) return player.sendClientMessage(Colors.Red, "La facción no cuenta con roles.");

        const dialog = new Dialog({
            style: DialogStylesEnum.INPUT,
            caption: "H. > Limpieza de facción (roles)",
            info: `Estás a punto de limpiar la facción ${faction.name} (${faction.alias}) (ID: ${faction.id}).\n\nLa facción cuenta actualmente con ${faction.roles.length} roles.\n\nTen en cuenta que los roles con miembros no van a ser limpiados. Para ello, tienes que expulsar a los miembros antes.\n\nSi estás seguro, escribe el nombre de la facción:`,
            button1: "Borrar",
            button2: "Cancelar"
        });

        const { response, inputText } = await dialog.show(player);
        
        if (!response) return player.sendClientMessage(Colors.Red, "Se canceló la limpieza de la facción (limpieza cancelada).");
        if (inputText !== faction.name) return player.sendClientMessage(Colors.Red, "Se canceló la limpieza de la facción (nombre incorrecto introducido).");

        let wipedRolesCount = 0;

        await factionService.modify(factionId, faction => {
            for (const role of factionRoles) {
                if (faction.roleHasMembers(role.uid)) continue;

                faction.removeRole(role.uid);
                wipedRolesCount++;
            }
        });

        player.sendClientMessage(Colors.Green, `Se han limpiado ${wipedRolesCount} roles de la facción ${faction.name} (ID: ${faction.id}).`);
        player.sendClientMessage(Colors.Green, `Aún quedan ${faction.roles.length} roles que cuentan con miembros.`);

        return next();
    }
});



new StaffCommand({
    name: "fgrant",
    requiredFlag: "MANAGE_FACTIONS",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /fgrant [ID] [Permiso]");

        const factionId = subcommand[0];
        const permission = subcommand[1]; // Ej 'police.cuff'

        if (!ALL_FACTION_PERMISSIONS_LIST.includes(permission)) return player.sendClientMessage(Colors.Red, "El permiso ingresado no existe.");

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.Red, "Facción no encontrada.");

        if (faction.hasPermission(permission as FactionPermissionString)) return player.sendClientMessage(Colors.Red, "La facción ya cuenta con ese permiso.");

        await factionService.modify(factionId, faction => faction.addPermission(permission as FactionPermissionString));

        player.sendClientMessage(Colors.Green, `Permiso '${permission}' añadido a ${faction.name}.`);

        return next();
    }
});



new StaffCommand({
    name: "frevoke",
    requiredFlag: "MANAGE_FACTIONS",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /frevoke [ID] [Permiso]");

        const factionId = subcommand[0];
        const permission = subcommand[1]; // Ej 'police.cuff'

        if (!ALL_FACTION_PERMISSIONS_LIST.includes(permission)) return player.sendClientMessage(Colors.Red, "El permiso ingresado no existe.");

        const faction = await factionCacheRepo.findById(factionId);
        if (!faction) return player.sendClientMessage(Colors.Red, "Facción no encontrada.");

        if (!faction.hasPermission(permission as FactionPermissionString)) return player.sendClientMessage(Colors.Red, "La facción no cuenta con ese permiso.");

        await factionService.modify(factionId, faction => faction.removePermission(permission as FactionPermissionString));

        player.sendClientMessage(Colors.Green, `Permiso '${permission}' revocado de ${faction.name}.`);

        return next();
    }
});



new StaffCommand({
    name: "flist",
    requiredFlag: "MANAGE_FACTIONS",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        const allFactions = await factionCacheRepo.findAll();

        const factionPermsData = Object.entries(FACTION_PERMISSIONS).map(([category, perms]) => {
            const permissionList = Object.values(perms).map(p => {

                const description = FACTION_PERMISSIONS_DESCRIPTIONS[p];
                const assignments = allFactions.filter(f => f.hasPermission(p)).length;

                return `${category}\t${p}\t${assignments}\t${description}`
            }).join("\n");

            return permissionList;
        }).join("\n");
        
        const dialog = new Dialog({
            style: DialogStylesEnum.TABLIST_HEADERS,
            caption: "H. > Listado de permisos faccionarios",
            info: "Categoría\tPermiso\tAsignado\tDescripción\n" + factionPermsData,
            button1: "Aceptar"
        });

        await dialog.show(player);
    
        return next();
    }
})