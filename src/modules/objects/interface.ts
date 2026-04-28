import type { Player } from "@infernus/core";
import type { WEAPON_MODELS, WeaponAmmos } from "@modules/weapons";
import { OBJECT_CATALOG, type WeaponName } from "./catalog";
import type { DrinkObject, FoodObject, GenericObject, WeaponObject } from "./core";

export type ObjectSize = "small" | "medium" | "big";

export type ItemKind = "GENERIC" | "WEAPON" | "FOOD" | "DRINK" | "PHONE" | "FURNITURE";



export interface IObject {
    id: string;
    name: string;
    kind: ItemKind;

    metadata?: {};
}

export type CreateGenericObjectDTO = Omit<IObject, "id">;


// ----------------------------------------------------


export type FoodObjectState = "podrida" | "fresca";
export type FoodDrinkTemperature = "fria" | "tibia" | "caliente";


export interface IFoodObject extends IObject {
    state: FoodObjectState;
    temperature: FoodDrinkTemperature;
    calories: number;
}

export interface CreateFoodObjectDTO {
    kind?: "FOOD";
    name: keyof typeof OBJECT_CATALOG.FOOD;
}

// ----------------------------------------------------


export interface IDrinkObject extends IObject {
    volume: number;
    temperature: FoodDrinkTemperature;
}

export interface CreateDrinkObjectDTO {
    kind?: "DRINK";
    name: keyof typeof OBJECT_CATALOG.DRINK;
}

// ----------------------------------------------------

export type WeaponCategory = keyof typeof WEAPON_MODELS;

// Comportamientos
export interface IReloadable {
    reload(amount: number): boolean;
    getAmmoCount(): number;
}

export function isReloadable(object: any): object is IReloadable {
    return object
        && typeof (object as IReloadable).reload === "function"
        && (object as WeaponObject).hasMagazine;
}

// Todas las armas.
export interface IEquippable {
    equip(player: Player): void;
}

export function isEquipabble(object: any): object is IEquippable {
    return object 
        && typeof (object as IEquippable).equip === "function";
}


export interface IWeaponMagazine {
    ammoType: WeaponAmmos;
    size: number;
}

export interface IWeaponObject extends IObject {
    magazine: IWeaponMagazine | null;
}

export interface CreateWeaponObjectDTO {
    kind?: "WEAPON";
    name: WeaponName;
}

// ----------------------------------------------------


export type CreateObjectDTO<T extends ItemKind> =
    T extends "FOOD"   ? CreateFoodObjectDTO   :
    T extends "DRINK"  ? CreateDrinkObjectDTO  :
    T extends "WEAPON" ? CreateWeaponObjectDTO :
    CreateGenericObjectDTO;


export type ResultObject<T extends ItemKind> =
    T extends "FOOD"   ? FoodObject   :
    T extends "DRINK"  ? DrinkObject  :
    T extends "WEAPON" ? WeaponObject :
    GenericObject;