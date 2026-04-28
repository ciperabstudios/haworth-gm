//import { logger } from "@modules/index";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onFinishedDownloading(({ player, virtualWorld, next }) => {

    // TODO: Vincular el diálogo de Login en este evento. 

    return next();
});