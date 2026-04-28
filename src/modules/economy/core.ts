import Command from "@commands/Command";
import { logger } from "@logger";
import Character from "@database/schemas/character";
import { Player, PlayerEvent } from "@infernus/core";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";

// Añadir en el Schema de Character.
export interface IPlayerCurrency {
    cash: number;
    // bank ...
}

const playerCurrency = new Map<Player, IPlayerCurrency>();

const originalGetMoney = Player.prototype.getMoney;
const originalGiveMoney = Player.prototype.giveMoney;

// Hook al método para gestionar el dinero completamente server-side.
Player.prototype.giveMoney = function(money: number): boolean {
    const success = originalGiveMoney.call(this, money);
    
    if (success) {
        const realMoney = originalGetMoney.call(this);
        playerCurrency.set(this, { cash: realMoney });
    }

    return success;
}

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    const cash = player.character!.currency.cash;

    playerCurrency.set(player, { cash });
    player.giveMoney(cash);

    return next();
});


CustomPlayerEvent.onLogout(async ({ player, next }) => {
    if (!playerCurrency.get(player)) return next();

    const cash = player.getMoney();

    await player.character!.updateOne(
        {
            $set: { "currency.cash": cash ?? 0 } 
        }
    );

    playerCurrency.delete(player);

    return next();
});