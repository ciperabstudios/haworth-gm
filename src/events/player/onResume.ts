//import { logger } from "@modules/index";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onResume(({ player, diff, next }) => {
    const msg = `${player.getName().name} ha estado en pausa por ${diff} milisegundos.`;
    //logger.info(msg);
    return next();
});