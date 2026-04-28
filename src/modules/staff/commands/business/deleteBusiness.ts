import StaffCommand from "@commands/StaffCommand";
import { Dialog, DialogStylesEnum, type IDialog } from "@infernus/core";
import { businessCacheRepo, businessService } from "@modules/business";
import { Colors } from "@modules/server/colors";


new StaffCommand({
    name: "deleteBusiness",
    requiredFlag: "MANAGE_BUSINESS",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Falta la ID del negocio.");

        const business = await businessCacheRepo.findById(subcommand[0]);

        if (!business) return player.sendClientMessage(Colors.WrongSintaxis, "No existe un negocio con la ID proporcionada.");

        const dialog: IDialog = {
            style: DialogStylesEnum.INPUT,
            caption: "Eliminación de negocio",
            info: `Nombre del negocio a eliminar: ${business.name}\nIngresa el nombre del negocio para confirmar su eliminación:`,
            button1: "Confirmar",
            button2: "Cancelar"
        };

        const { response, inputText } = await new Dialog(dialog).show(player);

        if (!response) return player.sendClientMessage(Colors.WrongSintaxis, "Se canceló la eliminación del negocio.");

        if (inputText !== business.name) {
            Dialog.close(player);
            return player.sendClientMessage(Colors.WrongSintaxis, "Se canceló la eliminación del negocio tras poner un nombre incorrecto.");
        }

        await businessService.deleteBusiness(subcommand[0]);

        /*
        const business = businessRepository.getInstance(subcommand[0]);

        if (!business) return player.sendClientMessage(Colors.WrongSintaxis, "No existe un negocio con la ID proporcionada.");

        const dialog: IDialog = {
            style: DialogStylesEnum.INPUT,
            caption: "Eliminación de negocio",
            info: `Nombre del negocio a eliminar: ${business.name}\nIngresa el nombre del negocio para confirmar su eliminación:`,
            button1: "Confirmar",
            button2: "Cancelar"
        };

        const { response, inputText } = await new Dialog(dialog).show(player);

        if (!response) return player.sendClientMessage(Colors.WrongSintaxis, "Se canceló la eliminación del negocio.");

        if (inputText !== business.name) {
            Dialog.close(player);
            return player.sendClientMessage(Colors.WrongSintaxis, "Se canceló la eliminación del negocio tras poner un nombre incorrecto.");
        }

        await businessRepository.delete(subcommand[0]);
 */


        player.sendClientMessage(Colors.White, `Se eliminó exitosamente el negocio ${business.name} (ID ${business.id}).`);

        return next();

    }
});