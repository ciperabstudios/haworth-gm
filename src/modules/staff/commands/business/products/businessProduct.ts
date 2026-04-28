import StaffCommand from "@commands/StaffCommand";
import { businessCacheRepo } from "@modules/business";
import { Colors } from "@modules/server/colors";

new StaffCommand({
    name: "bizproducts",
    description: "",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: false,
    run: async ({ player, subcommand, next }) => {
        if (!subcommand[0]) return player.sendClientMessage(Colors.WrongSintaxis, "Falta ID de negocio.");

        // Usamos el repositorio directamente para leer (o un método getProducts en el servicio)
        const business = await businessCacheRepo.findById(subcommand[0]); 
        if (!business) return player.sendClientMessage(Colors.Red, "Negocio no existe.");

        player.sendClientMessage(Colors.Green, `--- Productos de ${business.name} ---`);
        
        if (business.products.length === 0) {
            player.sendClientMessage(Colors.Grey, "No hay productos.");
            return next();
        }

        for (const p of business.products) {
            player.sendClientMessage(Colors.White, 
                `ID: ${p.uid} | ${p.name} | Precio: $${p.price} | Tipo: ${p.type} | Stock: ${p.stock}`
            );
        }
        return next();
    }
});