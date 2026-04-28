import { Player, PlayerEvent } from "@infernus/core";
import { logger } from "@logger";
import { timerManager } from "@managers/TimerManager";
import { LevelService } from "@modules/server/level";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";

interface IPaydayData {
    accumulatedMinutes: number;
    isAfk: boolean;
    lastTickProcessed: number;
}


class PaydayService {
    private readonly PAYDAY_INTERVAL = 60_000;
    private readonly PAYDAY_REQUIRED_MINUTES = 60;
    
    private playerData: Map<string, IPaydayData> = new Map();

    // --------------------------------------------------------

    getProgress(player: Player): IPaydayData | undefined {
        return this.playerData.get(player.getName().name);
    }

    restoreProgress(player: Player) {
        const playerName = player.getName().name;
        const savedData = this.playerData.get(playerName);

        this.playerData.set(playerName, {
            accumulatedMinutes: savedData?.accumulatedMinutes || 0,
            isAfk: false,
            lastTickProcessed: Date.now()
        });

        timerManager.createPlayerTimer(
            player,
            "payday",
            async () => await this.processPlayerTick(player),
            this.PAYDAY_INTERVAL,
            true
        );
    }

    setAFK(player: Player, state: boolean) {
        const data = this.playerData.get(player.getName().name);
        if (!data) return;

        data.isAfk = state;
        
        state
            ? timerManager.pausePlayerTimer(player, "payday")
            : timerManager.resumePlayerTimer(player, "payday");
        
        logger.debug(`${player.getName().name} ${state ? "está" : "dejó de estar"} AFK.`);
    }

    // --------------------------------------------------------

    getMissingTime(player: Player): number {
        const data = this.playerData.get(player.getName().name);
        if (!data) return this.PAYDAY_REQUIRED_MINUTES;

        return this.PAYDAY_REQUIRED_MINUTES - data.accumulatedMinutes;
    }

    // --------------------------------------------------------

    async forcePayday(player?: Player) {
        if (player) {
            const data = this.playerData.get(player.getName().name);
            if (!data) return;

            await this.givePayday(player);
            data.accumulatedMinutes = 0;

            return;
        }

        Player.getInstances().forEach(async (p) => {
            const data = this.playerData.get(p.getName().name);
            if (!data) return;

            await this.givePayday(p)
            data.accumulatedMinutes = 0;
        });
    }


    private async processPlayerTick(player: Player) {
        const data = this.playerData.get(player.getName().name);
        if (!data || data.isAfk) return;

        data.accumulatedMinutes++;

        if (data.accumulatedMinutes >= this.PAYDAY_REQUIRED_MINUTES) {
            await this.givePayday(player);
            data.accumulatedMinutes = 0;
        }
    }

    // --------------------------------------------------------

    private async givePayday(player: Player) {
        const salary = 1200;
        const tax = 200;
        const netSalary = salary - tax;

        player.giveMoney(netSalary);

        await LevelService.addLevelPoints(player, 1);

        // Mensajes de payday
        player.sendClientMessage(0xFFFFFFFF, "|___________ PAYDAY ___________|");
        player.sendClientMessage(0xFFFFFFFF, `  Sueldo: $${salary}`);
        player.sendClientMessage(0xFF0000FF, `  Impuestos: -$${tax}`);
        player.sendClientMessage(0x00FF00FF, `  Total: $${netSalary}`);
        player.sendClientMessage(0xFFFFFFFF, "|______________________________|");

        player.playSound(1058, 0, 0, 0);
    }
}

// ------------------------------------------------------------

export const paydayService = new PaydayService();

// ------------------------------------------------------------

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    paydayService.restoreProgress(player);

    return next();
});


PlayerEvent.onPause(async ({ player, pausedAt, next }) => {
    paydayService.setAFK(player, true);

    return next();
});


PlayerEvent.onResume(async ({ player, pausedAt, now, diff, next }) => {
    paydayService.setAFK(player, false);

    return next();
});


CustomPlayerEvent.onLogout(async ({ player, next }) => {
    timerManager.deletePlayerTimer(player, "payday");
    return next();
});