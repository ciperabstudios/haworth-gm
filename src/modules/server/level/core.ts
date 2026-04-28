import CharacterModel from "@database/schemas/character";
import { Player } from "@infernus/core";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";


// ------------------------------------------

export interface ILevelData {
    actual: number;
    points: number;
    totalPoints: number;
}

const playerLevelData = new Map<number, ILevelData>();

// ------------------------------------------

export class LevelService {
    private static readonly LEVEL_FACTOR = 4;

    // -------------------------

    static calculateLevelPoints(level: number): number {
        return (level + this.LEVEL_FACTOR) * this.LEVEL_FACTOR;
    }

    // -------------------------


    private static updateCache(player: Player): void {
        const character = player.character;
        if (!character) return;

        playerLevelData.set(player.id, character.level);
    }


    // -------------------------

    static getPlayerLevelData(player: Player) {
        if (playerLevelData.has(player.id)) return playerLevelData.get(player.id)!;

        const character = player.character;
        if (!character) return null;

        playerLevelData.set(player.id, character.level);
        return character.level;
    }


    static async setLevel(player: Player, level: number) {
        const character = player.character;
        if (!character) return;

        character.level = {
            actual: level,
            points: 0,
            totalPoints: this.calculateLevelPoints(level)
        }

        await character.save();
        this.updateCache(player);

        player.setScore(level);
    }


    static async setLevelPoints(player: Player, points: number) {
        const character = player.character;
        if (!character) return;

        const { actual, totalPoints } = character.level;
        
        const newLevel = (points < totalPoints) ? actual : actual + 1;
        const newPoints = (points < totalPoints) ? points : Math.max(0, points - totalPoints);

        character.level = {
            actual: newLevel,
            points: newPoints,
            totalPoints: this.calculateLevelPoints(newLevel)
        };

        await character.save();
        this.updateCache(player);

        player.setScore(newLevel);
    }


    static async addLevelPoints(player: Player, points: number) {
        const character = player.character;
        if (!character) return;

        const { actual, points: savedPoints, totalPoints } = character.level;

        const newPoints = (savedPoints + points) >= totalPoints 
            ? (savedPoints + points) - totalPoints 
            : savedPoints + points;

        
        const newLevel = (savedPoints + points) >= totalPoints
            ? actual + 1
            : actual;
        
        character.level = {
            actual: newLevel,
            points: Math.max(0, newPoints),
            totalPoints: this.calculateLevelPoints(newLevel)
        };

        await character.save();
        this.updateCache(player);

        player.setScore(newLevel);
    }


    static async removeLevelPoints(player: Player, points: number) {
        const character = player.character;
        if (!character) return;

        const { actual, points: savedPoints } = character.level;

        const newPoints = savedPoints - points;
        const newLevel = newPoints > 0 ? actual : actual - 1;

        character.level = {
            actual: newLevel,
            points: this.calculateLevelPoints(newLevel) - Math.abs(newPoints),
            totalPoints: this.calculateLevelPoints(newLevel)
        };

        await character.save();
        this.updateCache(player);

        player.setScore(newLevel);
    }
}



CustomPlayerEvent.onLogin(async ({ player, next }) => {
    const level = LevelService.getPlayerLevelData(player);

    player.setScore(level?.actual || 1);

    console.debug(`Nivel asignado para ${player.getName(true).name}`);
    return next();
});