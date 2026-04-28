import StaffCommand from "@commands/StaffCommand";
import { Player } from "@infernus/core";
import { businessCacheRepo, businessService } from "@modules/business";
import { Colors } from "@modules/server/colors";


new StaffCommand({
    name: "updatebusinessowner",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: true,
    description: "",
    syntax: "/actualizardueñoneg <ID de negocio> [ID del usuario o 'none']",
    aliases: ["actualizardueñonegocio", "actualizardueñoneg", "updatebizowner"],
    run: async ({ player, subcommand, next }) => {
    
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta la ID del negocio.");       
        if (!subcommand.at(1)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta el dueño a asignar ('none' para remover).");

        const business = await businessCacheRepo.findById(subcommand[0]);
        if (!business) return player.sendClientMessage(Colors.WrongSintaxis, "No existe un negocio con esa ID.");

        
        if (subcommand.at(1) === "none") {
            if (!business.owner) return player.sendClientMessage(Colors.WrongSintaxis, "El negocio no cuenta con un dueño a remover.");

            const previousOwner = business.owner;

            await businessService.changeOwner(business.id, null);

            player.sendClientMessage(Colors.White, `Se removió el dueño (${previousOwner}) del negocio ${business.name} (ID ${business.id})`)

            return next();
        }

        const target = Player.getInstance(+subcommand[1]);
        if (!target) return player.sendClientMessage(Colors.WrongSintaxis, "No hay ningún usuario conectado con esa ID.");

        await businessService.changeOwner(business.id, target.getName().name);

        player.sendClientMessage(Colors.White, `Se ha asignado dueño del negocio ${business.name} (ID ${business.id}) a ${target.getName(true).name} (ID ${target.id}).`)

        return next();
    }
});