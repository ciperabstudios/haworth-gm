import Command from "@commands/Command";
import { businessService } from "./refactor/core";
import { Colors } from "@modules/server/colors";

new Command({
    name: "enterb",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const nearestBusiness = await businessService.getNearestBusinessFromPlayer(player);
        if (!nearestBusiness) return player.sendClientMessage(Colors.White, "No estás cerca de un negocio.");
       
        await businessService.enterBusiness(player, nearestBusiness.id);

        return next();
    }
});


new Command({
    name: "exitb",
    description: "description",
    syntax: "syntax",
    aliases: ["aliases"],
    run: async ({ player, subcommand, next }) => {
       
        const businessIsPlayerIn = await businessService.getBusinessPlayerIsIn(player);
        if (!businessIsPlayerIn) return player.sendClientMessage(Colors.White, "No estás dentro de un negocio.");

        businessIsPlayerIn.exit(player);

        return next();
    }
});