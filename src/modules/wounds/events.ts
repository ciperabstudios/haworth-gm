import { BodyPartsEnum, PlayerEvent } from "@infernus/core";
import { getWeaponDamage } from "@modules/weapons/functions";
import { addPlayerWound, setPlayerWoundState } from "./functions";


PlayerEvent.onTakeDamage(async ({ player: victim, damage: issuer, amount:_, weapon, bodyPart, next }) => {
    const damage = getWeaponDamage(weapon, BodyPartsEnum[bodyPart] as keyof typeof BodyPartsEnum);

    setPlayerWoundState(victim, "injured");
    addPlayerWound(victim, { issuer, bodyPart, weapon, damage });
        
    return next();
});