import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService, StaffService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "traer",
    requiredFlag: "MANAGE_PLAYERS",
    loggable: true,
    description: "",
    syntax: "/traer <ID>",
    aliases: ["bringplayer", "traerjugador"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return StaffCommand.getSyntax("traer", player);

        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;
    
        if (target.id === player.id) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes traerte a tí mismo.");
        if (StaffService.hasAnyPermissionFlag(target, ["ADMINISTRATOR", "DEVELOPER"])) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes traer a dueños o programadores.");
    
        const { x, y, z } = player.getPos();
    
        target.setVirtualWorld(player.getVirtualWorld());
        target.setInterior(player.getInterior());
        target.setPos(x, y, z);
    
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} ha traído a su posición a ${target.getName().name}.`);
        return next();

    }
});
