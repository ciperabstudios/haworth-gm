import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors";
import { StaffChatService, StaffService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "expulsar",
    requiredFlag: "KICK",
    loggable: true,
    description: "",
    syntax: "/kick <ID> [Motivo]",
    aliases: ["kick"],
    run: async ({ player, subcommand, next }) => {
        
        if (!subcommand.at(0) || subcommand.length < 2) return StaffCommand.getSyntax("expulsar", player);
    
        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();
        
        const target = Player.getInstance(+subcommand[0])!;
    
        if (StaffService.hasAnyPermissionFlag(target, ["DEVELOPER", "ADMINISTRATOR"])) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes expulsar a un dueño o programador.");
        if (StaffService.isRoleHigher(target, player) || StaffService.isRoleEqual(target, player)) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes expulsar a un miembro de la administración con tu mismo cargo o superior.");
    
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} kickeó a ${target.getName().name}. Motivo: ${subcommand.slice(1).join(" ")}`);
        target.kick();
        // TODO: Logs handling.
        return next();

    }
});