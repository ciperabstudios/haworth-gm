import "dotenv/config";

import "./classes/events/CustomEvent";

import "./database";
import "./modules";
import "./events";

import "./modules/commands";

import { Player } from "@infernus/core";
import type { ICharacterDocument, IUserDocument } from "./database";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from "fs";

declare module "@infernus/core" {
    interface Player {
        dbId: string | null;

        account: IUserDocument | null;
        accountId: string | null;
        accountName: string | null;

        character: ICharacterDocument | null;
        playerName: string; // Prevenir bugs de OnPlayerDisconnect.

        isLoggedIn: boolean;

        getName(underscore?: boolean): { name: string; ret: number; };
    }
}

const originalGetName = Player.prototype.getName;

Player.prototype.getName = function(underscore?: boolean) {
    const name = originalGetName.call(this);

    return {
        name: underscore ? name.name.replace("_", " ") : name.name,
        ret: 1
    }
}

// ============================================
// GRACEFUL SHUTDOWN
// ============================================


let isShuttingDown = false;

async function gracefulShutdown(signal: string) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`\n🛑 Señal ${signal} recibida. Guardando datos...`);

    const startTime = Date.now();

    try {
        console.log("Ejemplo de guardado de datos...");
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Saliendo...");
        process.exit(0);
    }
}

// Monitorear archivo de señal cada segundo
const shutdownFile = path.join(__dirname, "../.shutdown");

const shutdownChecker = setInterval(() => {
    if (fs.existsSync(shutdownFile)) {
        clearInterval(shutdownChecker);
        try {
            fs.unlinkSync(shutdownFile);
        // eslint-disable-next-line no-empty
        } catch {}

        gracefulShutdown("RELOAD_SIGNAL");
    }
}, 1000);


// Capturar señales (funcionan en terminales interactivas)
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason) => {
    console.error('💥 Unhandled Rejection:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
});

console.log("🔄 Sistema de guardado en shutdown inicializado");


/* process.on("SIGINT", () => console.log("SIGINT CAPTURADO."));
process.on("SIGTERM", () => console.log("SIGTERM CAPTURADO."));
process.on('SIGHUP', () => console.log("SIGHUP CAPTURADO."));

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
}); */