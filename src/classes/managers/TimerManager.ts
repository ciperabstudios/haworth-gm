import { GameMode, type Player } from "@infernus/core";
import { logger } from "@logger";

type TimerCallback = () => unknown;

interface ITimer {
    id: string;
    callback: TimerCallback;
    interval: number;
    lastTick: number;
    isActive: boolean;
    loop: boolean;
}

interface IPlayerTimers {
    timers: Map<string, ITimer>;
}

// ------------------------------------------------------

class TimerService {
    private globalInterval: NodeJS.Timeout | null = null;
    private readonly TICK_RATE = 1_000;

    // Timers por jugador.
    private playerTimers: Map<string, IPlayerTimers> = new Map();

    // Timers globales.
    private globalTimers: Map<string, ITimer> = new Map();

    // --------------------------------------------------

    createPlayerTimer(player: Player, timerId: string, callback: TimerCallback, interval: number, loop: boolean = false): void {
        const playerName = player.getName().name;

        if (!this.playerTimers.has(playerName)) this.playerTimers.set(playerName, { timers: new Map() });

        const playerData = this.playerTimers.get(playerName)!;

        if (playerData.timers.has(timerId)) logger.warn(`Timer '${timerId}' ya existe para ${playerName}, sobrescribiendo...`);

        playerData.timers.set(timerId, {
            id: timerId,
            callback, 
            interval,
            lastTick: Date.now(),
            isActive: true,
            loop
        });

        logger.debug(`Timer '${timerId}' creado para ${playerName} (${interval}ms, loop: ${loop})`);
    }

    createGlobalTimer(timerId: string, callback: TimerCallback, interval: number, loop: boolean = false): void {
        if (this.globalTimers.has(timerId)) logger.warn(`Timer global '${timerId}' ya existe, sobrescribiendo...`);

        this.globalTimers.set(timerId, {
            id: timerId,
            callback,
            interval,
            lastTick: Date.now(),
            isActive: true,
            loop
        });

        logger.debug(`Timer global '${timerId}' creado (${interval}ms, loop: ${loop})`);
    }

    // --------------------------------------------------

    start(): void {
        if (this.globalInterval) {
            logger.warn("El servicio de timers ya está corriendo");
            return;
        }

        this.globalInterval = setInterval(() => {
            this.processTick();
        }, this.TICK_RATE);

        logger.info("Servicio de timers iniciado.");
    }

    stop(): void {
        if (!this.globalInterval) return;

        clearInterval(this.globalInterval);
        this.globalInterval = null;

        logger.info("Servicio de timers detenido");
    }

    // --------------------------------------------------

    private getPlayerTimer(player: Player, timerId: string): ITimer | undefined {
        const playerName = player.getName().name;
        return this.playerTimers.get(playerName)?.timers.get(timerId);
    }

    // --------------------------------------------------

    pausePlayerTimer(player: Player, timerId: string): void {
        const timer = this.getPlayerTimer(player, timerId);
        if (!timer) return;

        timer.isActive = false;

        logger.debug(`Timer '${timerId}' pausado para ${player.getName().name}`);
    }

    resumePlayerTimer(player: Player, timerId: string): void {
        const timer = this.getPlayerTimer(player, timerId);
        if (!timer) return;

        timer.isActive = true;
        timer.lastTick = Date.now();

        logger.debug(`Timer '${timerId}' reanudado para ${player.getName().name}`);
    }

    deletePlayerTimer(player: Player, timerId: string): void {
        const playerName = player.getName().name;
        const playerData = this.playerTimers.get(playerName);

        const deleted = playerData?.timers.delete(timerId);
        if (deleted) logger.debug(`Timer '${timerId}' eliminado para ${playerName}`);
    }

    clearPlayerTimers(player: Player): void {
        const playerName = player.getName().name;
        const playerData = this.playerTimers.get(playerName);

        if (!playerData) return;

        const count = playerData.timers.size;
        this.playerTimers.delete(playerName);
        logger.debug(`${count} timer(s) eliminado(s) para ${playerName}`);
    }

    getPlayerTimerTimeRemaining(player: Player, timerId: string): number {
        const timer = this.getPlayerTimer(player, timerId);
        if (!timer) return -1;

        const elapsed = Date.now() - timer.lastTick;
        return Math.max(0, timer.interval - elapsed);
    }

    // --------------------------------------------------

    pauseGlobalTimer(timerId: string): void {
        const timer = this.globalTimers.get(timerId);
        if (!timer) return;

        timer.isActive = false;

        logger.debug(`Timer global '${timerId}' pausado.`);
    }

    resumeGlobalTimer(timerId: string): void {
        const timer = this.globalTimers.get(timerId);
        if (!timer) return;

        timer.isActive = true;
        timer.lastTick = Date.now();

        logger.debug(`Timer global '${timerId}' reanudado.`);
    }

    deleteGlobalTimer(timerId: string): void {
        if (this.globalTimers.delete(timerId)) logger.debug(`Timer global '${timerId}' eliminado.`);
    }

    getGlobalTimerTimeRemaining(timerId: string): number {
        const timer = this.globalTimers.get(timerId);
        if (!timer) return -1;

        const elapsed = Date.now() - timer.lastTick;
        return Math.max(0, timer.interval - elapsed);
    }

    // --------------------------------------------------

    private processPlayerTimers(): void {
        const now = Date.now();

        for (const [playerName, playerData] of this.playerTimers.entries()) {
            for (const [timerId, timer] of playerData.timers.entries()) {
                if (!timer.isActive) continue;

                const elapsed = now - timer.lastTick;
                if (elapsed < timer.interval) continue;

                timer.lastTick = now;

                try {
                    timer.callback();
                } catch (error) {
                    logger.error(`Error en timer '${timerId}' de ${playerName}:`, error);
                }

                if (!timer.loop) {
                    playerData.timers.delete(timerId);
                    logger.debug(`Timer '${timerId}' completado para ${playerName}`);
                }
            }
        }
    }

    private processGlobalTimers(): void {
        const now = Date.now();

        for (const [timerId, timer] of this.globalTimers.entries()) {
            if (!timer.isActive) continue;

            const elapsed = now - timer.lastTick;
            if (elapsed < timer.interval) continue;

            timer.lastTick = now;

            try {
                timer.callback();
            } catch (error) {
                logger.error(`Error en timer global '$timerId}':`, error);
            }

            if (!timer.loop) {
                this.globalTimers.delete(timerId);
                logger.debug(`Timer global '${timerId}' completado.`);
            }
        }
    }

    private processTick(): void {
        this.processPlayerTimers();
        this.processGlobalTimers();
    }
}

// ------------------------------------------------------

export const timerManager = new TimerService();

// ------------------------------------------------------

GameMode.onInit(async ({ next }) => {
    timerManager.start();

    return next();
});