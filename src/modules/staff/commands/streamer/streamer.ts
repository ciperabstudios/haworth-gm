import StaffCommand from "@commands/StaffCommand";
import { Streamer } from "@infernus/core";


new StaffCommand({
    name: "streamer",
    requiredFlag: "MANAGE_STREAMER",
    loggable: false,
    description: "En desarrollo.",
    run: async ({ player, subcommand, next }) => {

        const streamerObjects = Streamer.getRadiusMultiplier(0, player);
        const viewableObjectsLimit = Streamer.getVisibleItems(0, player);

        player.sendClientMessage(-1, `[Objects stream distance]: ${streamerObjects}`);

        player.sendClientMessage(-1, `[Viewable object limit]: ${viewableObjectsLimit}`);
        
        return next();
    },
});



new StaffCommand({
    name: "cfgstreamer",
    requiredFlag: "MANAGE_STREAMER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {

        Streamer.setRadiusMultiplier(0, +subcommand[0], player);

        player.sendClientMessage(-1, `Streamer establecido en: ${subcommand[0] || null}`);

        return next();
    }
});