import { WEAPON_MODELS, type IWeaponData, type WeaponAmmos, type WeaponTypes } from "./models";


const WEAPON_TYPES = new Map<WeaponTypes, IWeaponData[]>();
const WEAPON_BULLETS = new Map<WeaponAmmos, IWeaponData[]>();
const WEAPON_NAMES = new Map<string, IWeaponData>();


// Precompute to avoid redundancy & computational costs
Object.values(WEAPON_MODELS).forEach(category => {
    Object.entries(category).forEach(([weaponName, weapon]) => {
    
        // Group weapons by type.
        if (!WEAPON_TYPES.has(weapon.type)) WEAPON_TYPES.set(weapon.type, []);
        
        WEAPON_TYPES.get(weapon.type)?.push(weapon);

        // Group weapons by bullets.
        if (weapon.bullets && !WEAPON_BULLETS.has(weapon.bullets)) WEAPON_BULLETS.set(weapon.bullets, []);
        
        if (weapon.bullets) WEAPON_BULLETS.get(weapon.bullets)?.push(weapon);
        
        // Group weapons by name (key).
        WEAPON_NAMES.set(weaponName, weapon);
    });
});


export const getWeaponsByType = (type: WeaponTypes) => WEAPON_TYPES.get(type) || [];

export const findWeaponByName = (name: string) => WEAPON_NAMES.get(name) ?? null;

export const getWeaponsByBullets = (bulletType: WeaponAmmos) => WEAPON_BULLETS.get(bulletType) || [];

/*
export const getWeaponsByType = (type: WeaponTypes) => Object.values(WEAPON_MODELS).flatMap(category => Object.values(category)).filter(weapon => weapon.type === type);


export const findWeaponByName = (name: string) => Object.values(WEAPON_MODELS).flatMap(category => Object.entries(category)).find(([weaponName]) => weaponName === name)?.[1];


export const getWeaponsByBullets = (bulletType: WeaponAmmos) => Object.values(WEAPON_MODELS).flatMap(category => Object.values(category)).filter(weapon => weapon.bullets === bulletType);


export const getWeaponBullets = (weaponName: string) => {
    const weapon = findWeaponByName(weaponName);

    if (!weapon) {
        console.log(`No se encontró ningún arma con el nombre '${weaponName}'.`)
        return false;
    }

    return weapon.bullets;
}
*/


// TODO: Diseñar esto más en detalle luego.
const getWeaponSpecs = (weaponName: string) => {
    // Dimensiones, país de origen, diseñador/fabricante, alcance efectivo, etcétera.
    return true;
}