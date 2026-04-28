import { PlayerEvent, WeaponSkillsEnum } from "@infernus/core";
import { PlayerPositionTracker } from "@modules/player/tracking";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";

// TODO: Mover esto a cualquier otro lado más coherente.

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    PlayerPositionTracker.startTracking(player);

    // TODO: Modular en un onSpawn de las weapons.
    player.setSkillLevel(WeaponSkillsEnum.SAWNOFF_SHOTGUN, 1);
    player.setSkillLevel(WeaponSkillsEnum.PISTOL, 1);
    player.setSkillLevel(WeaponSkillsEnum.MICRO_UZI, 1);
    player.setSkillLevel(WeaponSkillsEnum.DESERT_EAGLE, 999);
    player.setSkillLevel(WeaponSkillsEnum.SHOTGUN, 1);
    player.setSkillLevel(WeaponSkillsEnum.SPAS12_SHOTGUN, 999);
    player.setSkillLevel(WeaponSkillsEnum.MP5, 999);
    player.setSkillLevel(WeaponSkillsEnum.AK47, 999);
    player.setSkillLevel(WeaponSkillsEnum.M4, 999);
    player.setSkillLevel(WeaponSkillsEnum.SNIPERRIFLE, 999);

    return next();
});