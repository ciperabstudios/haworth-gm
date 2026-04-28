import StaffCommand from "@commands/StaffCommand";
import { businessCacheRepo, businessService } from "@modules/business";
import { Colors } from "@modules/server/colors";


new StaffCommand({
    name: "updatebusinessavailability",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: true,
    description: "",
    syntax: "/actualizardisponibilidadneg <ID de negocio>",
    aliases: ["actualizardisponibilidadnegocio", "actualizardisponibilidadneg", "updatebizavailability"],
    run: async ({ player, subcommand, next }) => {
    
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta la ID del negocio.");        

        const business = await businessCacheRepo.findById(subcommand[0]);
        if (!business) return player.sendClientMessage(Colors.WrongSintaxis, "No existe un negocio con esa ID.");

        await businessService.updateAvailability(business.id, !business.available);

        player.sendClientMessage(Colors.White, `Se cambió la disponibilidad del negocio ${business.name} (${business.id}) a '${business.available ? "Disponible" : "No disponible"}'.`);

        return next();
    }
});