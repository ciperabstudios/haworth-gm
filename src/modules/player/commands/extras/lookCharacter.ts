import Command from "@commands/Command";
import { Player } from "@infernus/core";
import Character from "@database/schemas/character";
import { NearbyPlayer } from "@modules/player/functions";
import { cmToFeetAndInches, kgToLb } from "@modules/server/functions";
import { Colors } from "@modules/server/colors";
import { ProximityDetector } from "@modules/server/chat";


new Command({
    name: "mirar",
    description: "Revisa los detalles físicos de una persona.",
    aliases: ["look", "observar", "detallar"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(-1, "Utiliza /mirar <ID>");

        if (!Command.isValidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;
        
        //if (target === player) return player.sendClientMessage(-1, "No puedes mirarte a ti mismo.");

        if (!NearbyPlayer(5.0, player, target)) return player.sendClientMessage(-1, "Asegúrate de estar cerca del jugador.");

        const targetData = await Character.findOne({ name: target.getName().name });
        if (!targetData) return;

        const { height: Height, weight: Weight, ethnicity: Ethnicity, hair: Hair, eyes: Eyes } = targetData.profile;
        
        const { genre: Genre } = targetData;
        const formattedGenre = Genre === "male" ? 'Masculino' : 'Femenino';

        const { feet, inches } = cmToFeetAndInches(Height);
        const formattedHeight = `${feet}'${inches}"`;

        const formattedWeight = Math.floor(kgToLb(Weight));

        player.sendClientMessage(Colors.ForestGreen, `|_________ Descripción de ${target.getName(true).name} _________|`);
        player.sendClientMessage(Colors.Grey, `Género: ${formattedGenre} - Altura: ${formattedHeight} (${Height}cm) - Peso: ~${formattedWeight}lb (${Weight}kg)`);
        player.sendClientMessage(Colors.Grey, `Color de pelo: ${Hair} - Color de ojos: ${Eyes} - Etnia: ${Ethnicity}`);

        ProximityDetector({ radius: 5, player, color: `#CBA9E4`, message: `${player.getName(true).name} observa a ${target.getName(true).name}.` });
        return next();
    }
});