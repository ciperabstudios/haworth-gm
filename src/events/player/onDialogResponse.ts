import { PlayerEvent } from "@infernus/core";

PlayerEvent.onDialogResponse(async ({ player, dialogId, response, listItem, buffer, next }) => {
    return next();
});