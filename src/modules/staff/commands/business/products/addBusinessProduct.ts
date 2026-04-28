import StaffCommand from "@commands/StaffCommand";
import { businessProductService } from "@modules/business";
import { Colors } from "@modules/server/colors";

new StaffCommand({
    name: "addbizproduct",
    aliases: ["addbizprod", "crearprodneg"],
    description: "",
    loggable: true,
    requiredFlag: "MANAGE_BUSINESS", 
    run: async ({ player, subcommand, next }) => {

        // Validación de argumentos básicos
        if (subcommand.length < 5) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /addbizprod [ID] [Precio] [Tipo] [Stock] [Nombre]");

        const businessId = subcommand[0];
        const price = parseInt(subcommand[1]);
        const type = parseInt(subcommand[2]); // 0: Item, 1: Arma, 2: Vida...
        const stock = parseInt(subcommand[3]); // -1 para infinito
        
        // El nombre puede tener espacios, así que tomamos desde el índice 4 al final
        const name = subcommand.slice(4).join(" ");

        if (isNaN(price) || isNaN(type) || isNaN(stock)) return player.sendClientMessage(Colors.Grey, "Error: Precio, Tipo, Valor y Stock deben ser números.");
        
        // Llamada al servicio
        const success = await businessProductService.modify(businessId, business => business.addProduct(name, price, "ITEM", stock));

        if (!success) return player.sendClientMessage(Colors.Red, "El negocio no existe.");
        

        player.sendClientMessage(Colors.Green, `Producto '${name}' agregado al negocio ${businessId} correctamente.`);
        return next();
    }
});