import { logger } from "@logger";
import { GameMode } from "@infernus/core";

GameMode.onExit(({ next }) => {
    logger.info("GM cerrada/apagada.");
    return next();
});
  