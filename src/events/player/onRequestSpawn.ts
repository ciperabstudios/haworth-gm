//import { logger } from "@modules/index";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onRequestSpawn(({ player, next }) => {
    return true;
});