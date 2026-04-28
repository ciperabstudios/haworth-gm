import Command from "@commands/Command";
import { Player } from "@infernus/core";
import { showInfoForPlayer } from "@modules/filterscripts";
import { Colors } from "@modules/server/colors";

const { Custom: { PM } } = Colors;

// Custom.PM.Sender: 0x96964BFF
// Custom.PM.Receiver: 0x9F9F00FF


new Command({
    name: "mensajeprivado",
    description: "Envía un mensaje de forma privada a otro jugador.",
    aliases: ["mp", "pm", "privatemessage"],
    run: async ({ player, subcommand, next }) => {

        if (subcommand.length < 2) return player.sendClientMessage(-1, "Utiliza /mp <ID> <Mensaje>");

        if (!Command.isValidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;

        if (target === player) return player.sendClientMessage(-1, "No puedes enviarte mensajes privados a ti mismo.");

        const message = subcommand.slice(1).join(" ");

        target.sendClientMessage(PM.Receiver, `Privado de ${player.getName(true).name} (ID: ${player.id}): ${message}`);
        player.sendClientMessage(PM.Sender, `Privado a ${target.getName(true).name} (ID: ${target.id}): ${message}`);
        showInfoForPlayer(target, "Tienes un mensaje privado.", 2000);
        
        return next();
    }
});