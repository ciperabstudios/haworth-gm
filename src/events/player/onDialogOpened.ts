import type { IDialogResCommon, Player } from "@infernus/core";
import { Dialog, PlayerEvent } from "@infernus/core";
import { RemovePlayerDialogFocus, SetPlayerDialogFocus } from "@modules/textdraws";
import { CustomPlayerEvent, CustomPlayerEventTrigger } from "src/classes/events/CustomEvent";

export const inDialogSet = new Set<Player>();
const dialogState = new Map<Player, boolean>();

const originalShow = Dialog.prototype.show;


Dialog.prototype.show = async function (player: Player): Promise<IDialogResCommon> {
    inDialogSet.add(player);

    try {
        const result = await originalShow.call(this, player);

        inDialogSet.delete(player);

        return result;
    } catch (error) {
        if (inDialogSet.has(player)) inDialogSet.delete(player);

        throw error;
    }
}

PlayerEvent.onUpdate(({ player, next }) => {
    const playerInDialog = inDialogSet.has(player);
    const lastState = dialogState.get(player);
    
    if (lastState === playerInDialog) return next();

    dialogState.set(player, playerInDialog);
    CustomPlayerEventTrigger.onDialogOpened(player, playerInDialog);

    return next();
});


CustomPlayerEvent.onDialogOpened(({ player, dialogOpened, next }) => {

    dialogOpened ? SetPlayerDialogFocus(player) : RemovePlayerDialogFocus(player);

    return next();
});









/*
import { Dialog, IDialogResResult, Player } from "@infernus/core";
import { RemovePlayerDialogFocus, SetPlayerDialogFocus } from "@textdraws";

// Guardar una referencia al método original
const originalShow = Dialog.prototype.show;

Dialog.prototype.show = async function (player: Player): Promise<IDialogResResult> {
    // Lógica adicional antes de mostrar el diálogo
    SetPlayerDialogFocus(player);
    

    try {
        // Llamar a la implementación original del método show usando la referencia guardada
        const result = await originalShow.call(this, player);

        // Lógica adicional después de mostrar el diálogo
        RemovePlayerDialogFocus(player);

        // Devolver el resultado original
        return result;
    } catch (error) {
        // Manejo de errores si es necesario
        RemovePlayerDialogFocus(player);
        throw error;
    }
};
*/