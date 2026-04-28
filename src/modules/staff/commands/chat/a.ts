import StaffCommand from "@commands/StaffCommand";
import { StaffChatService } from "@modules/staff/core";

new StaffCommand({
    name: "chatstaff",
    requiredFlag: "ADMIN_CHAT",
    loggable: false,
    description: "",
    syntax: "/a <Mensaje>",
    aliases: ["a"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return StaffCommand.getSyntax("chatstaff", player);
    
        StaffChatService.sendChatMessage(player, subcommand.join(" "));
    
        return next();
    }
});