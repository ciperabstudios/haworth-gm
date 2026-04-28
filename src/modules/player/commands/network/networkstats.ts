import Command from "@commands/Command";
import { Dialog, DialogStylesEnum, type IDialog, NetStats } from "@infernus/core";

new Command({
    name: "networkstats",
    description: "",
    aliases: ["network", "netstats"],
    run: async ({ player, subcommand, next }) => {

        const DialogData: IDialog = {
            style: DialogStylesEnum.MSGBOX,
            caption: "Network Stats",
            info: NetStats.getPlayerNetworkStats(player).stats,
            button1: "X"
        };
    
        new Dialog(DialogData).show(player);
    
        return next();

    }
});