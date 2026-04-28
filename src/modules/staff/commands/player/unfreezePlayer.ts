import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors";
import { StaffChatService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "unfreezeplayer",
    requiredFlag: "MANAGE_PLAYERS",
    loggable: true,
    description: "",
    aliases: ["descongelar", "descongelarusuario"],
    run: async ({ player, subcommand, next }) => {
        
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que especificar la ID del usuario a descongelar.");
        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;

        if (target.isControllable()) return player.sendClientMessage(Colors.WrongSintaxis, `El usuario ${target.getName(true).name} (${target.id}) no se encuentra congelado.`);

        target.toggleControllable(true);
        
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} (${player.id}) descongeló a ${target.getName().name} (${target.id}).`);
        return next();
    }
});