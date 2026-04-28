import Command from "@commands/Command";
import { Colors } from "@modules/server/colors/constants";

new Command({
    name: "getpos",
    description: "",
    aliases: ["coords", "coordenadas", "coordinates"],
    run: async ({ player, subcommand, next }) => {

        if (!player.isSpawned()) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que spawnear para poder utilizar este comando.");

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()]
    
        player.sendClientMessage(Colors.White, `${x}, ${y}, ${z} vw: ${vw} - int: ${int}`);
    
        return next();

    }
})