import { setPlayerWoundState } from "@modules/wounds/functions";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onDeath(async ({ player, killer, reason, next, defaultValue }) => {
    const [x, y, z] = samp.callNative("GetPlayerPos", "iFFF", player.id);

    player.toggleControllable(false);
    player.toggleSpectating(false);

    player.spawn();

    player.setPos(x, y, z);

    player.setHealth(999);
    player.applyAnimation("ped", "FLOOR_hit_f", 4.1, false, false, false, true, 0, true);

    setPlayerWoundState(player, "dead");

    return next();
});