import { Player } from "@infernus/core";

interface Position {
    x: number;
    y: number;
    z: number;
    int: number;
    vw: number;
    cameraX: number;
    cameraY: number;
    cameraZ: number;
}


export class PlayerPositionTracker {
    private static intervals = new Map<Player, NodeJS.Timeout>();
    private static positions = new Map<Player, Position>();
    private static INTERVAL_TRACKING_TIME = 5000;

    static startTracking(player: Player): void {
        const interval = setInterval(() => {
            if (!player.isSpawned()) return;

            const { x, y, z } = player.getPos();
            const [int, vw] = [player.getInterior(), player.getVirtualWorld()];
            const { x: cameraX, y: cameraY, z: cameraZ } = player.getCameraPos();

            this.positions.set(player, { x, y, z, int, vw, cameraX, cameraY, cameraZ });
        }, this.INTERVAL_TRACKING_TIME);

        this.intervals.set(player, interval);
    }


    static stopTracking(player: Player): void {
        const interval = this.intervals.get(player);
        if (!interval) return;

        clearInterval(interval);
        this.intervals.delete(player);
    }


    static getLastKnownPosition(player: Player): Position | undefined {
        return this.positions.get(player);
    }


    static clear(player: Player) {
        this.stopTracking(player);
        this.positions.delete(player);
    }
}