import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors";
import { atmService, editingATMByPlayer } from "./atm";

new StaffCommand({
    name: "crearatm",
    aliases: ["crearcajero"],
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next, success }) => {

        if (!player.isSpawned()) return player.sendClientMessage(Colors.WrongSintaxis, "Tienes que estar spawneado para crear un cajero.");

        const { x, y, z } = player.getPos();
        const [vw, int] = [player.getVirtualWorld(), player.getInterior()];

        const atm = await atmService.createATM({
            availableMoney: 0,
            coordinates: { x, y, z, vw, int, angle: 0 }
        });

        editingATMByPlayer.set(player.id, atm);
        atm.object?.edit(player);

        player.sendClientMessage(Colors.Green3, "Has creado un cajero exitosamente.");

        success();
        return next();
    }
});