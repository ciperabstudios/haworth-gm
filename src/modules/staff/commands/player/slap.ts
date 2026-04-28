import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "slap",
    requiredFlag: "MANAGE_PLAYERS",
    loggable: true,
    description: "",
    syntax: "/slap [ID] [Cantidad]",
    run: async ({ player, subcommand, next }) => {

        if (subcommand.length < 2) return StaffCommand.getSyntax("slap", player);
    
        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();
        if (isNaN(+subcommand[1])) return player.sendClientMessage(Colors.WrongSintaxis, "La cantidad proporcionada tiene que ser un número.");
        
        const target = Player.getInstance(+subcommand[0])!;
    
        const { x, y, z } = target.getPos();
    
        target.setPos(x, y, z + (+subcommand[1]));
        target.playSound(1130, x, y, z + (+subcommand[1]));
    
    
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.id === target.id ? `${player.getName().name} se slapeó con una altura de ${subcommand[1]}` : `${player.getName().name} slapeó a ${target.getName().name} con una altura de ${subcommand[1]}`}.`);
        return next();

    }
});