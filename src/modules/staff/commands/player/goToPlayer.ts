import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "ir",
    requiredFlag: "MANAGE_PLAYERS",
    loggable: true,
    description: "",
    syntax: "/ir <ID>",
    aliases: ["gotoplayer", "goto"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return StaffCommand.getSyntax("ir", player);
    
        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();
        
        const target = Player.getInstance(+subcommand[0])!;
    
        if (target.id === player.id) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes ir a tu misma ubicación.");
    
        const { x, y, z } = target.getPos();
        const [int, vw] = [target.getInterior(), target.getVirtualWorld()];
    
        player.setVirtualWorld(vw);
        player.setInterior(int);
        player.setPos(x, y, z + 2);
    
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} ha ido a la ubicación de ${target.getName().name}.`);
        return next();

    }
});
