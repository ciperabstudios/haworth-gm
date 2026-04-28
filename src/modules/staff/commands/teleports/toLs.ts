import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService, StaffService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "mandarls",
    requiredFlag: "TELEPORTS",
    loggable: true,
    description: "",
    syntax: "/mandarls <ID>",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return StaffCommand.getSyntax("mandarls", player);
    
        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;

        if (StaffService.hasAnyPermissionFlag(target, ["ADMINISTRATOR", "DEVELOPER"])) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes mandar a LS a los dueños o programadores.");
    
        const { x, y, z } = {
            x: 1529.6,
            y: -1705.5,
            z: 13.4,
        };
        
        target.setPos(x, y, z);
        target.sendClientMessage(Colors.White, `Fuiste llevado a Los Santos por ${player.getName().name}.`);
    
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} llevó a Los Santos a ${target.getName().name}.`);
    
        return next();

    }
});
