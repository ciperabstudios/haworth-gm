import type { Player } from "@infernus/core";
import type { IObject } from "@modules/objects/interface";
import type { IItemHandler } from "@modules/objects/registry";
import { Colors } from "@modules/server/colors";
import { phoneService } from "./core";
import { showInfoForPlayer } from "@modules/filterscripts";
import { logger } from "@logger";

export interface PhoneObjectMetadata {
    phoneId: string;
    modelId: number;
    attachTag: "PHONE";
    size: "small";
}

class PhoneItemHandler implements IItemHandler {

    /* validateMetadata(metadata: any): boolean {
        return typeof metadata.phoneId === "string";
    } */

    async onUse(player: Player, object: IObject, action?: string): Promise<void> {
        if (!object.metadata) {
            player.sendClientMessage(Colors.Red, "Este objeto está corrupto. Contacta con la administración en caso de que el problema persista.");
            return;
        }

        const phoneId = (object.metadata as PhoneObjectMetadata).phoneId;

        const phone = await phoneService.findById(phoneId);

        if (!phone) {
            player.sendClientMessage(Colors.LightRed, "No se han encontrado los datos de este teléfono. Contacta con la administración en caso de que el problema persista.");
            return;
        }

        if (!action) {
            if (phone.state === "off") {
                player.sendClientMessage(Colors.LightRed, "El teléfono está apagado.");
                return;
            }

            player.sendClientMessage(-1, "{CBA9E4} * Revisas tu teléfono.");
            return await phoneService.openInterface(player, phone);
        }

        switch (action.toLowerCase()) {
             case "encender": {
                if (phone.state === "on") {
                    showInfoForPlayer(player, "~g~~h~Tu teléfono ya está encendido.", 3000);
                    break;
                }

                await phoneService.modify(phone.id, phone => phone.turnOn());

                player.sendClientMessage(-1, "{CBA9E4} * Encendiste tu teléfono.");
                break;
            }

            case "apagar": {
                if (phone.state === "off") {
                    showInfoForPlayer(player, "~r~~h~Tu teléfono ya está apagado.", 3000);
                    break;
                }

                await phoneService.modify(phone.id, phone => phone.turnOff());

                player.sendClientMessage(-1, "{CBA9E4} * Apagaste tu teléfono.");
                break;
            }

            // case "atender"
            // case "colgar"
            // case "rechazarLlamada"

            default:
                logger.error(`Acción de teléfono desconocida: ${action}`);
                break;
        }
    }

}


const phoneItemHandler = new PhoneItemHandler();

export default phoneItemHandler;