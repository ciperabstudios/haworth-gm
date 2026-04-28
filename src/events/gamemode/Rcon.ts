//import { logger } from "@modules/index";
import { GameMode } from "@infernus/core";

GameMode.onRconCommand(({ cmd, next }) => {
    //logger.info(`RCON: se utilizó el comando ${cmd}.`)
    return next();
});

GameMode.onRconLoginAttempt(({ ip, password, success, next }) => {
    //logger.info(`RCON: intento de login - ${ip} ${password} ${success}`);
    return next();
});