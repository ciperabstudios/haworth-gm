import StaffCommand from "@commands/StaffCommand";
import { businessCacheRepo } from "@modules/business/refactor";
import { Colors } from "@modules/server/colors";


new StaffCommand({
    name: "gointobusiness",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: true,
    description: "",
    aliases: ["irinteriornegocio", "irintneg", "irintnegocio", "entertobiz"],
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Adjunta la ID del negocio.");

        const business = await businessCacheRepo.findById(subcommand[0]);

        if (!business) return next();

        const { x, y, z, int, vw } = business.interiorCoords;

        player.setPos(x, y, z);
        player.setVirtualWorld(vw);
        player.setInterior(int);

        return next();
    }
});