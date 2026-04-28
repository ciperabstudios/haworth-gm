import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService, StaffService } from "@modules/staff/core";
import { Player } from "@infernus/core";


new StaffCommand({
    name: "darvida",
    requiredFlag: "MANAGE_PLAYERS",
    loggable: true,
    description: "",
    syntax: "/sethealth [ID] <Vida>",
    aliases: ["sethealth"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return StaffCommand.getSyntax("darvida", player);
        
        let maxHealth = +subcommand[0] > 100 ? 100 : +subcommand[0];
    
        if (subcommand.length > 1) {
    
            maxHealth = +subcommand[1] > 100 ? 100 : +subcommand[1];
    
            if (!StaffCommand.isValidId(player, +subcommand[0])) return next();
            if (isNaN(+subcommand[1])) return player.sendClientMessage(Colors.WrongSintaxis, "La vida proporcionada tiene que ser un número.");
    
            const target = Player.getInstance(+subcommand[0])!;
            
            if (StaffService.hasAnyPermissionFlag(target, ["ADMINISTRATOR", "DEVELOPER"])) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes manipular la vida de los dueños o programadores.");

            target.setHealth(maxHealth);
    
            StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} seteó la vida de ${target.getName().name} en ${subcommand[1]}.`);
            return next();
        }
    
        if (isNaN(+subcommand[0])) return player.sendClientMessage(Colors.WrongSintaxis, "La vida proporcionada tiene que ser un número.");
    
        player.setHealth(maxHealth);
    
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} se ha seteado la vida en ${maxHealth}.`);
        return next();

    }
});