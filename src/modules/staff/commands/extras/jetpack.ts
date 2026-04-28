import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors/constants";
import { SpecialActionsEnum } from "@infernus/core";


new StaffCommand({
    name: "jetpack",
    requiredFlag: "EXTRAS",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {

        player.setSpecialAction(SpecialActionsEnum.USEJETPACK);
        
        player.sendClientMessage(Colors.White, "Te has colocado un jetpack.");
        return next();

    }
});