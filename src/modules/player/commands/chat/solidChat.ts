import Command from "@commands/Command";
import { Colors, validateColor } from "@modules/server/colors";
import { createSolidChatTextDraw, destroyTextDrawIfExists, pSolidChatTextDrawMap } from "@modules/textdraws";


new Command({
    name: "solidchat",
    description: "Establece el fondo del chat de un color a elección.",
    aliases: ["solid"],
    
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Utiliza /solidchat <negro | '#hex' | quitar>");

        const OPTIONS = ["negro", "quitar"];
        const option = subcommand[0];

        if (!OPTIONS.includes(option) && !option.startsWith("#")) return player.sendClientMessage(Colors.WrongSintaxis, "Utiliza /solidchat <negro | '#hex' | quitar>");

        
    
        if (option === "quitar") return destroyTextDrawIfExists(player);

        
        if (option === "negro") {
            destroyTextDrawIfExists(player);

            pSolidChatTextDrawMap.set(player, createSolidChatTextDraw(player));
            return next();
        }


        if (option.startsWith("#")) {
            const color = validateColor(option);
            if (!color) return player.sendClientMessage(Colors.WrongSintaxis, "El color debe de ser un valor hexadecimal válido de 3 o 6 caracteres (ej: #f13 o #ff1133).");

            destroyTextDrawIfExists(player);

            pSolidChatTextDrawMap.set(player, createSolidChatTextDraw(player, `#${color}`));
            return next();
        }
    }
});