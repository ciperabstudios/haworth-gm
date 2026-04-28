import Business from "@database/schemas/business";
import Character from "@database/schemas/character";
import EconomyStats, { type EconomyStatsProps } from "@database/schemas/economyStats";
import { logger } from "@logger";

export class EconomyStatsService {
    private static DOCUMENT_ID = "main";
    private static RECALCULATION_TIME_COOLDOWN = 5 * 60  * 1000; // 5 minutos.
    private static cache = new Map<string, { value: number; timestamp: number }>();

    static async getTotalMoneyInCirculation(): Promise<number | void> {
        // Cooldown de 5 minutos para optimizar costos.
        if (Date.now() - this.cache.get("recalculate")!.timestamp < this.RECALCULATION_TIME_COOLDOWN) {
            return this.cache.get("recalculate")?.value;
        }

        const economy = await EconomyStats.findById(this.DOCUMENT_ID).lean().exec();

        if (!economy) return;
    
        const props = economy.toObject() as EconomyStatsProps;
    
        let totalMoney = 0;
    
        for (const prop of Object.values(props)) {
            totalMoney += prop;
        }
        
        this.cache.set("recalculate", { value: totalMoney, timestamp: Date.now() });

        return totalMoney;
    }

    static async incPlayerCash(amount: number) {
        await EconomyStats.findByIdAndUpdate(this.DOCUMENT_ID, {
            $inc: { totalPlayerCash: amount }
        });
    }

    static async incBankMoney(amount: number) {
        await EconomyStats.findByIdAndUpdate(this.DOCUMENT_ID, {
            $inc: { totalBankMoney: amount }
        });
    }

    static async incBusinessFunds(amount: number) {
        await EconomyStats.findByIdAndUpdate(this.DOCUMENT_ID, {
            $inc: { totalBusinessFunds: amount }
        });
    }

    static async incFactionFunds(amount: number) {
        await EconomyStats.findByIdAndUpdate(this.DOCUMENT_ID, {
            $inc: { totalFactionFunds: amount }
        });
    }
}

/* Ejemplos de uso
// Cuando un jugador recibe $500
await EconomicStatsService.incPlayerCash(500);

// Cuando paga impuestos desde su banco ($-150)
await EconomicStatsService.incBankMoney(-150);

// Cuando compras en un negocio: sacás de tu dinero en mano y se suma al negocio
await EconomicStatsService.multiIncrement({
  totalPlayerCash: -100,
  totalBusinessFunds: 100
});
*/


export const seedEconomyStats = async () => {
    let totalPlayerCash = 0;
    const totalBankMoney = 0;     // TODO.
    const totalBusinessFunds = 0; // TODO.
    const totalFactionFunds = 0;  // TODO.

    // Dinero de jugadores.
    const players = await Character.find({}, { "currency.cash": 1 });
    for (const player of players) {
        totalPlayerCash += player.currency.cash || 0;
    }

    await EconomyStats.findByIdAndUpdate("main", { totalPlayerCash }, { upsert: true });
    
    logger.info("[ECONOMY] Economía global calculada correctamente.");
}