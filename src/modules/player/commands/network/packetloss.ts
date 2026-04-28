import Command from "@commands/Command";
import { Colors } from "@modules/server/colors/constants";
import { NetStats } from "@infernus/core";

new Command({
    name: "packetloss",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const pl = NetStats.getPacketLossPercent(player);

        player.sendClientMessage(Colors.Grey, `Packets loss: ${pl}`);
        
        return next();

    }
});