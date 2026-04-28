import Command from "@commands/Command";
import { showKeysDialog } from "./dialog";

new Command({
    name: "devkeys",
    description: "",
    run: async ({ player, subcommand, next }) => {

        await showKeysDialog(player);

        return next();
    }
});