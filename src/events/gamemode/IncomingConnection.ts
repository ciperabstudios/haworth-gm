import { logger } from "@logger";
import { GameMode } from "@infernus/core";

GameMode.onIncomingConnection(({ next, playerId, ipAddress, port }) => {
    logger.info(`Conexión entrante: ${playerId} - ${ipAddress}:${port}`)
    return next();
});