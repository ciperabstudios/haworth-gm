import Command from "@commands/Command";
//import { showKeysDialog } from "@modules/keys/core";

new Command({
    name: "keys",
    aliases: ["teclas"], 
    description: "Revisa o cambia las teclas para realizar acciones cotidianas en el servidor.",
    run: async ({ player, subcommand, next }) => {

        //await showKeysDialog(player);
        
        return next();
    }
});