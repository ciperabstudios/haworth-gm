import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors";
import { StaffChatService, StaffService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "freezeplayer",
    requiredFlag: "MANAGE_PLAYERS",
    loggable: true,
    description: "",
    aliases: ["congelar", "congelarusuario"],
    run: async ({ player, subcommand, next }) => {
        
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que especificar la ID del usuario a congelar.");
        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;

        if (StaffService.isRoleHigher(target, player)) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes congelar a un superior administrativo.");

        if (!target.isControllable()) return player.sendClientMessage(Colors.WrongSintaxis, `El usuario ${target.getName(true).name} (${target.id}) ya se encuentra congelado.`);

        target.toggleControllable(false);
        
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} (${player.id}) congeló a ${target.getName().name} (${target.id}).`);
        return next();
    }
});