import Command from "@commands/Command";
import { paydayService } from "./core";
import { Colors } from "@modules/server/colors";
import StaffCommand from "@commands/StaffCommand";
import { Player } from "@infernus/core";

new Command({
    name: "payday",
    description: "",
    run: async ({ player, subcommand, next }) => {

        const missingTime = paydayService.getMissingTime(player);

        player.sendClientMessage(Colors.Grey, `Te faltan ${missingTime} minutos para recibir el payday.`);

        return next();
    }
});


new StaffCommand({
    name: "forzarpayday",
    aliases: ["forcepayday"],
    requiredFlag: "DEVELOPER",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        await paydayService.forcePayday();

        for (const p of Player.getInstances()) {
            p.sendClientMessage(Colors.LightRed, `${player.accountName} ha forzado el pago diario para todos.`);
        }

        return next();
    }
});