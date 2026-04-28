import Command from "@commands/Command";
import { Colors, hexToRgb, isValidRgbNumber, rgbToHex } from "@modules/server/colors";


new Command({
    name: "hexargb",
    description: "",
    syntax: "/hexargb <#hex>",
    aliases: ["hextorgb"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return Command.getSyntax("hexargb", player);

        const colorArgument = subcommand[0];
    
        const HEX_REGEX = /^#([0-9a-f]{3}){1,2}$/i;
    
        if (!HEX_REGEX.test(colorArgument)) return player.sendClientMessage(Colors.WrongSintaxis, "El color debe de ser un valor hexadecimal válido de 3 o 6 caracteres (ej: #f13 o #ff1133).");
    
        const cleanedColor = colorArgument.replace("#", "");
        const finalColor = `#${cleanedColor.length === 3 ? cleanedColor.split("").map(c => `${c}${c}`).join("") : cleanedColor}`;
    
        player.sendClientMessage(Colors.White, `La conversión de ${colorArgument} en RGB es (${hexToRgb(finalColor)?.join(", ")}).`);
    
        return next();
    }
});


new Command({
    name: "rgbahex",
    description: "",
    syntax: "/rgbahex <r> <g> <b>",
    aliases: ["rgbtohex"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return Command.getSyntax("rgbahex", player);
        if (!isValidRgbNumber(+subcommand[0]) || !isValidRgbNumber(+subcommand[1]) || !isValidRgbNumber(+subcommand[2])) return player.sendClientMessage(Colors.WrongSintaxis, "Los argumentos r, g y b tienen que ser números válidos del 0 al 255.")
    
        const [r, g, b] = [+subcommand[0], +subcommand[1], +subcommand[2]];
    
        player.sendClientMessage(Colors.White, `La conversión de (${r}, ${g}, ${b}) en hexadecimal es ${rgbToHex(r, g, b)}.`);
    
        return next();

    }
});