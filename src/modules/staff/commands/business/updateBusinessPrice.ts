import StaffCommand from "@commands/StaffCommand";
import { businessCacheRepo, businessService } from "@modules/business";
import { Colors } from "@modules/server/colors";


new StaffCommand({
    name: "updatebusinessprice",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: true,
    description: "",
    syntax: "/actualizarprecioneg <ID de negocio> [ID del usuario o 'none']",
    aliases: ["actualizarprecionegocio", "actualizarprecioneg", "updatebizprice"],
    run: async ({ player, subcommand, next }) => {
    
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta la ID del negocio.");        
        if (!subcommand.at(1)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta el precio.");

        const business = await businessCacheRepo.findById(subcommand[0]);
        if (!business) return player.sendClientMessage(Colors.WrongSintaxis, "No existe un negocio con esa ID.");

        const price = Number(subcommand[1]);

        if (!Number.isFinite(price)) return player.sendClientMessage(Colors.WrongSintaxis, "El precio tiene que ser un valor numérico válido.");
        if (price <= 0) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes asignar un precio menor o igual a cero (0).");

        const previousPrice = business.price;

        await businessService.modify(business.id, b => b.setPrice(price));

        player.sendClientMessage(Colors.White, `Se cambió el precio del negocio ${business.name} (${business.id}) a ${price} (antes ${previousPrice}).`);

        return next();
    }
});