import { BodyPartsEnum, WeaponEnum } from "@infernus/core";

interface IWeaponDamage {
    bodyPart: keyof typeof BodyPartsEnum;
    damage: number;
};

export const weaponDamageCache = new Map<WeaponEnum, IWeaponDamage[]>();