//import { logger } from "@modules/index";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onPause(({ player, pausedAt, next }) => {
    //logger.info(`${player.getName().name} está en pausa desde hace ${pausedAt}.`)
    return next();
});