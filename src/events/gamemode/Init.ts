import Command from "@commands/Command";
import { GameMode } from "@infernus/core";
import { logger } from "@logger";
import { initializeBusinesses } from "@modules/business/refactor/core";
import { seedEconomyStats } from "@modules/economy/newCore";
import { initializeFactions } from "@modules/factions";
import { initializeHouses } from "@modules/house";
import { initializeObjects } from "@modules/objects/core";
import { DEBUG_MODE } from "@modules/server/config";
import { staffRoleRepository } from "@modules/staff/repositories";
import { initializeVehicles } from "@modules/vehicles";
import { loadWeaponDamageIntoCache } from "@modules/weapons/functions";
import { execSync } from "child_process";
const revision = execSync("git rev-parse HEAD").toString().slice(0, 7).trim();



const initData = async () => {
    logger.info("[*] Iniciando sincronización con la base de datos...");

    //await seedEconomyStats();

    await initializeObjects();

    await initializeFactions();

    await initializeBusinesses();

    await initializeVehicles();

    await staffRoleRepository.init(); // TODO: CAMBIAR.

    await initializeHouses();

    await loadWeaponDamageIntoCache();

    logger.info(`Se han procesado ${Command.getCommands().length} comandos exitosamente.`);
}


GameMode.onInit(async ({ next }) => {
    GameMode.showPlayerMarkers(0);
    GameMode.sendRconCommand("language Español | Spanish", "win1252");
    
    if (DEBUG_MODE) {
        GameMode.sendRconCommand("name [DEV] Haworth Roleplay", "win1252");
        GameMode.sendRconCommand("game.mode Frank;", "win1252");
    }

    await initData();

    logger.info(`Haworth encendido exitosamente. Commit actual: #${revision}.`);

    return next();
});