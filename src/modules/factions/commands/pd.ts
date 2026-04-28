import FactionCommand from "@commands/FactionCommand";
import { BoneIdsEnum, Player, SpecialActionsEnum } from "@infernus/core";
import { timerManager } from "@managers/TimerManager";
import { IsPlayerBehindPlayer, NearbyPlayer } from "@modules/player";
import { ProximityDetector } from "@modules/server/chat";
import { Colors } from "@modules/server/colors";
import { getMapZoneName2D } from "@modules/server/streets";


const refMarks: Set<number> = new Set();
const MAX_REF_TIME = 25 * (60 * 1000); // 25 minutos.

new FactionCommand({
    name: "refuerzos",
    aliases: ["ref"],
    description: "",
    requiredPermission: "police.radio", // TODO: Cambiar.
    run: async ({ player, subcommand, next, faction, member }) => {

        if (refMarks.has(player.id)) return player.sendClientMessage(Colors.WrongSintaxis, "Ya tienes un pedido de ayuda activo (/cref).");

        refMarks.add(player.id);

        const { x, y } = player.getPos();

        const formattedMsg = `** ${player.getName(true).name} solicita apoyo en la zona de ${getMapZoneName2D(x, y)}.`;

        player.sendClientMessage(Colors.LightRed, "Has solicitado refuerzos, utiliza el comando '/cref' para cancelarlos.");


        for (const p of Player.getInstances()) {
            if (faction.isPlayerMember(p.getName().name)) {
                p.setMarker(player, Colors.LightBlue);
                p.sendClientMessage(Colors.Radio.POLICE_DEPARTMENT, formattedMsg);
            }
        }

        timerManager.createPlayerTimer(
            player, 
            "policeRef", 
            () => {
                refMarks.delete(player.id);

                for (const p of Player.getInstances()) {
                    if (faction.isPlayerMember(p.getName().name)) p.setMarker(player, -1);
                }

                player.sendClientMessage(Colors.LightBlue, "Tu pedido de refuerzos ha sido cancelado automáticamente.");
            },
            MAX_REF_TIME,
            false
        );

        return next();
    }
});



new FactionCommand({
    name: "cancelarrefuerzos",
    aliases: ["cref", "crefuerzos"],
    description: "",
    requiredPermission: "police.radio", // TODO: Cambiar.
    run: async ({ player, subcommand, next, faction, member }) => {

        if (!refMarks.has(player.id)) return player.sendClientMessage(Colors.WrongSintaxis, "No has solicitado refuerzos.");

        const formattedMsg = `** ${player.getName(true)} ha cancelado la solicitud de refuerzos.`;

        for (const p of Player.getInstances()) {
            if (faction.isPlayerMember(p.getName().name)) p.sendClientMessage(Colors.Radio.POLICE_DEPARTMENT, formattedMsg);
        }

        timerManager.deletePlayerTimer(player, "policeRef");

        return next();
    }
});




// ------------------------------------------------------------------------------------------------------------------------------------


const cuffedPlayers: Set<number> = new Set();

new FactionCommand({
    name: "esposar",
    description: "",
    requiredPermission: "police.cuff",
    run: async ({ player, subcommand, next, faction, member }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /esposar [ID]");

        const id = +subcommand[0];

        if (isNaN(id)) return player.sendClientMessage(Colors.WrongSintaxis, "ID inválida.");

        if (id === player.id) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes esposarte a ti mismo.");

        const target = Player.getInstance(id);
        if (!target) return player.sendClientMessage(Colors.WrongSintaxis, "El usuario no está conectado.");
    
        if (!NearbyPlayer(3, player, target)) return player.sendClientMessage(Colors.WrongSintaxis, "El jugador no está cerca tuyo.");
        if (!IsPlayerBehindPlayer(player, target)) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar detrás del jugador para esposarlo.");

        if (player.isInAnyVehicle()) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes esposar a alguien estando dentro de un vehículo.");
        if (target.isInAnyVehicle()) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes esposar a alguien que está en un vehículo");

        if (faction.isPlayerMember(target.getName().name)) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes esposar a un miembro de tu propia facción.");

        if (cuffedPlayers.has(target.id)) return player.sendClientMessage(Colors.WrongSintaxis, "El jugador ya está esposado, utiliza '/desesposar'.");

        target.sendClientMessage(Colors.LightRed, `Has sido esposado por ${player.getName(true)}.`);
        player.sendClientMessage(Colors.LightRed, `Le has colocado unas esposas a ${target.getName(true)}, utiliza '/desesposar' para quitárselas.`);

        ProximityDetector({ radius: 15, player, color: "#CBA9E4", message: `* ${player.getName(true)} le coloca unas esposas a ${target.getName(true)}.` })

        target.clearAnimations();
        target.setSpecialAction(SpecialActionsEnum.CUFFED);
        target.setAttachedObject(5, 19418, BoneIdsEnum.RightHand, -0.031999, 0.024000, -0.024000, -7.900000, -32.000011, -72.299987, 1.115998, 1.322000, 1.406000);

        cuffedPlayers.add(target.id);

        return next();
    }
});


new FactionCommand({
    name: "desesposar",
    description: "",
    requiredPermission: "police.cuff",
    run: async ({ player, subcommand, next, faction, member }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /desesposar [ID]");

        const id = +subcommand[0];

        if (isNaN(id)) return player.sendClientMessage(Colors.WrongSintaxis, "ID inválida.");

        if (id === player.id) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes desesposarte a ti mismo.");

        const target = Player.getInstance(id);
        if (!target) return player.sendClientMessage(Colors.WrongSintaxis, "El usuario no está conectado.");

        if (!NearbyPlayer(3, player, target)) return player.sendClientMessage(Colors.WrongSintaxis, "El jugador no está cerca tuyo.");
        if (!IsPlayerBehindPlayer(player, target)) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar detrás del jugador para desesposarlo.");

        if (!cuffedPlayers.has(player.id)) return player.sendClientMessage(Colors.WrongSintaxis, "El jugador no está esposado.");

        target.sendClientMessage(Colors.LightBlue, `Has sido desesposado por ${player.getName(true)}.`);
        player.sendClientMessage(Colors.LightBlue, `Le has quitado unas esposas a ${target.getName(true)}.`);

        ProximityDetector({ radius: 15, player, color: "#CBA9E4", message: `* ${player.getName(true)} le quita las esposas a ${target.getName(true)}.` })

        target.clearAnimations();
        target.setSpecialAction(SpecialActionsEnum.NONE);
        target.removeAttachedObject(5);

        cuffedPlayers.delete(target.id);

        return next();
    }
});

