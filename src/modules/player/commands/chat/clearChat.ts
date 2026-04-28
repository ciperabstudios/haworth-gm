import Command from "@commands/Command";
import { ClearChat } from "@modules/server/chat";

new Command({
    name: "limpiarchat",
    description: "Limpia el chat para más comodidad.",
    aliases: ["clearchat"],
    run: async ({ player, subcommand, next }) => {
        ClearChat(player);
        return next();
    }
});