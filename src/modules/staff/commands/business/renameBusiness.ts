import StaffCommand from "@commands/StaffCommand";
import { businessCacheRepo, businessService } from "@modules/business";
import { Colors } from "@modules/server/colors";


new StaffCommand({
    name: "renamebusiness",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta la ID del negocio.");       
        if (!subcommand.at(1)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta el nuevo nombre a asignar.");

        const business = await businessCacheRepo.findById(subcommand[0]);
        if (!business) return player.sendClientMessage(Colors.WrongSintaxis, "No existe un negocio con esa ID.");

        const previousName = business.name;
        const newName = subcommand.slice(1).join(" ");

        const success = await businessService.modify(subcommand[0], business => business.setName(newName));
        if (!success) return player.sendClientMessage(Colors.WrongSintaxis, "No existe un negocio con esa ID.");
        
        player.sendClientMessage(Colors.White, `Se ha cambiado el nombre del negocio ${business.name} (ID ${business.id}) a ${newName} (antes ${previousName}).`)

        return next();
    }
});