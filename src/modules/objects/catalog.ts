import { WEAPON_MODELS, type WeaponAmmos } from "@modules/weapons";
import type { WeaponEnum } from "@infernus/core";
import type { OBJECT_ATTACHMENT_CONFIG } from "./attachments";
import type { FoodDrinkTemperature, FoodObjectState, ObjectSize } from "./interface";
import type { PhoneColor, PhoneModelId } from "@modules/phone/interfaces";

interface ICommonArchetype {
   modelId: number;
   size: ObjectSize;
   attachTag: keyof typeof OBJECT_ATTACHMENT_CONFIG;
}

//type FoodArchetype   = ICommonArchetype & { calories: number; }
//type DrinkArchetype  = ICommonArchetype & { volume: number; }

export type WeaponArchetype = ICommonArchetype & { weaponId: number; }
export type ReloadableWeaponArchetype = WeaponArchetype & { defaultAmmo: number; }


type PhoneAttachTag = "PHONE" | "OLD_PHONE";

export interface IPhoneArchetype {
  modelId: PhoneModelId;
  size?: "small";
  attachTag: PhoneAttachTag;
}


export function isReloadableArchetype(arch: any): arch is ReloadableWeaponArchetype {
    return arch && typeof arch.defaultAmmo === 'number';
}


export type ArchetypeDef = ICommonArchetype | WeaponArchetype | ReloadableWeaponArchetype;


type WeaponType<T extends (keyof typeof WeaponEnum)[]> = keyof Pick<typeof WeaponEnum, T[number]>;
type PistolTypes       = WeaponType<["COLT45" | "SILENCED" | "DEAGLE"]>;
type ShotgunTypes      = WeaponType<["SHOTGUN" | "SAWEDOFF" | "SHOTGSPA"]>;
type SubmachineTypes   = WeaponType<["TEC9", "UZI", "MP5"]>;
type AssaultRifleTypes = WeaponType<["AK47", "M4"]>;
type SniperRifleTypes  = WeaponType<["RIFLE", "SNIPER"]>;
type ThrownTypes       = WeaponType<["GRENADE", "MOLTOV", "TEARGAS", "SATCHEL"]>;
type HeavyTypes        = WeaponType<[/* "MINIGUN", "ROCKETLAUNCHER", "HEATSEEKER",  "FLAMETHROWER"*/]>; // TODO: Agregar attach tags de las armas comentadas.

type WeaponCategories = keyof typeof WEAPON_MODELS;

export const ALL_WEAPONS = {
  ...WEAPON_MODELS.PISTOLS,
  ...WEAPON_MODELS.SHOTGUNS,
  ...WEAPON_MODELS.SUBMACHINES_GUNS,
  ...WEAPON_MODELS.ASSAULT_RIFLES,
  ...WEAPON_MODELS.SNIPER_RIFLES,
  ...WEAPON_MODELS.THROWN_WEAPONS,
  ...WEAPON_MODELS.HEAVY_WEAPONS
} as const;


export type WeaponName = keyof typeof ALL_WEAPONS;



export interface IFoodItem {
   archetype: keyof typeof ARCHETYPES_CATALOG["FOOD"];
   calories: number;
   state?: FoodObjectState;
   temperature?: FoodDrinkTemperature;
}

export interface IDrinkItem {
   archetype: keyof typeof ARCHETYPES_CATALOG["DRINK"];
   volume: number;
   temperature?: FoodDrinkTemperature;
}

type ArchetypesFromCategories<T> = {
   [C in keyof T]: keyof T[C]
}[keyof T];

type WeaponsCatalog = typeof ARCHETYPES_CATALOG["WEAPON"];
type WeaponArchetypeKey = ArchetypesFromCategories<WeaponsCatalog>;


export interface IWeaponItem {
   archetype: WeaponArchetypeKey;
}

export interface IReloadableWeaponItem extends IWeaponItem {
   magazine: WeaponAmmos; // IWeaponMagazine;
}





export type ItemDef = 
    | ICommonArchetype 
    | IFoodItem 
    | IDrinkItem 
    | IWeaponItem 
    | IReloadableWeaponItem;



export const ARCHETYPES_CATALOG = {
   FOOD: {
      "RED_APPLE":   { modelId: 19575, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
      "GREEN_APPLE": { modelId: 19576, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
      "BANANA":      { modelId: 19578, size: "small", attachTag: "BANANA" },
      "TOMATO":      { modelId: 19577, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
      "ORANGE":      { modelId: 19574, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
   } as const satisfies Record<string, ICommonArchetype>,

   DRINK: {
      "SODA_CAN":            { modelId: 2601,  size: "small",  attachTag: "SODA_COFFEE" },
      "COFFEE_CUP":          { modelId: 19835, size: "medium", attachTag: "SODA_COFFEE" },
      "MILK_CARTON":         { modelId: 19569, size: "medium", attachTag: "CARTON_MILK_APPLE_ORANGE_JUICE" },
      "MILK_BOTTLE":         { modelId: 19570, size: "medium", attachTag: "MILK_BOTTLE" },
      "ORANGE_JUICE_CARTON": { modelId: 19563, size: "medium", attachTag: "CARTON_MILK_APPLE_ORANGE_JUICE" },
      "APPLE_JUICE_CARTON":  { modelId: 19564, size: "medium", attachTag: "CARTON_MILK_APPLE_ORANGE_JUICE" },
   } as const satisfies Record<string, ICommonArchetype>,

   WEAPON: {
      PISTOLS: {
         "COLT45":   { modelId: 346, weaponId: 22, defaultAmmo: 17, size: "small",  attachTag: "WEAPON_COLT45" },
         "SILENCED": { modelId: 347, weaponId: 23, defaultAmmo: 17, size: "small",  attachTag: "WEAPON_SILENCED" },
         "DEAGLE":   { modelId: 348, weaponId: 24, defaultAmmo: 7,  size: "medium", attachTag: "WEAPON_DEAGLE"  }
      } as const satisfies Record<PistolTypes, ReloadableWeaponArchetype>,

      SHOTGUNS: {
         "SHOTGUN":  { modelId: 349, weaponId: 25, defaultAmmo: 1, size: "big", attachTag: "WEAPON_SHOTGUN" },
         "SAWEDOFF": { modelId: 350, weaponId: 26, defaultAmmo: 2, size: "big", attachTag: "WEAPON_SAWEDOFF" },
         "SHOTGSPA": { modelId: 351, weaponId: 27, defaultAmmo: 7, size: "big", attachTag: "WEAPON_SHOTGSPA" }
      } as const satisfies Record<ShotgunTypes, ReloadableWeaponArchetype>,

      SUBMACHINE_GUNS: {
         "TEC9": { modelId: 372, weaponId: 32, defaultAmmo: 50, size: "medium", attachTag: "WEAPON_TEC9" },
         "UZI":  { modelId: 352, weaponId: 28, defaultAmmo: 50, size: "medium", attachTag: "WEAPON_UZI" },
         "MP5":  { modelId: 353, weaponId: 29, defaultAmmo: 30, size: "medium", attachTag: "WEAPON_MP5" }
      } as const satisfies Record<SubmachineTypes, ReloadableWeaponArchetype>,

      ASSAULT_RIFLES: {
         "AK47": { modelId: 355, weaponId: 30, defaultAmmo: 30, size: "big", attachTag: "WEAPON_AK47" },
         "M4":   { modelId: 356, weaponId: 31, defaultAmmo: 50, size: "big", attachTag: "WEAPON_M4" }
      } as const satisfies Record<AssaultRifleTypes, ReloadableWeaponArchetype>,

      SNIPER_RIFLES: {
         "RIFLE":  { modelId: 357, weaponId: 33, defaultAmmo: 1, size: "big", attachTag: "WEAPON_RIFLE" },
         "SNIPER": { modelId: 358, weaponId: 34, defaultAmmo: 1, size: "big", attachTag: "WEAPON_SNIPER" }
      } as const satisfies Record<SniperRifleTypes, ReloadableWeaponArchetype>,

      THROWN_WEAPONS: {
         "GRENADE": { modelId: 342, weaponId: 16, size: "small", attachTag: "WEAPON_GRENADE" },
         "MOLTOV":  { modelId: 344, weaponId: 18, size: "small", attachTag: "WEAPON_MOLTOV" },
         "TEARGAS": { modelId: 343, weaponId: 17, size: "small", attachTag: "WEAPON_TEARGAS" },
         "SATCHEL": { modelId: 363, weaponId: 39, size: "small", attachTag: "WEAPON_SATCHEL" }
      } as const satisfies Record<ThrownTypes, WeaponArchetype>
   },

   ELECTRONICS: {
      PHONE: {
         "OLD_GRAY":   { modelId: "330",   attachTag: "OLD_PHONE" },
         "GRAY":       { modelId: "18868", attachTag: "PHONE" },
         "ORANGE":     { modelId: "18865", attachTag: "PHONE" },
         "BLUE":       { modelId: "18872", attachTag: "PHONE" },
         "LIGHT-BLUE": { modelId: "18866", attachTag: "PHONE" },
         "RED-ORANGE": { modelId: "18867", attachTag: "PHONE" },
         "PINK":       { modelId: "18869", attachTag: "PHONE" },
         "RED":        { modelId: "18870", attachTag: "PHONE" },
         "GREEN":      { modelId: "18871", attachTag: "PHONE" },
         "YELLOW":     { modelId: "18873", attachTag: "PHONE" },
         "SILVER":     { modelId: "18874", attachTag: "PHONE" },
         "WHITE":      { modelId: "19513", attachTag: "PHONE" }
      } as const satisfies Record<PhoneColor, IPhoneArchetype>
   } 
} as const;


/* 
export const ARCHETYPES_CATALOG = {
    FOOD: {
        "RED_APPLE":   { modelId: 19575, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
        "GREEN_APPLE": { modelId: 19576, calories: 52, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
        "BANANA":      { modelId: 19578, calories: 89, size: "small", attachTag: "BANANA" },
        "TOMATO":      { modelId: 19577, calories: 22, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
        "ORANGE":      { modelId: 19574, calories: 47, size: "small", attachTag: "TOMATO_ORANGE_APPLE" },
    } as const satisfies Record<string, FoodArchetype>,

    DRINK: {
        "SODA_CAN":            { modelId: 2601,  volume: 350,  size: "small",  attachTag: "SODA_COFFEE" },
        "COFFEE_CUP":          { modelId: 19835, volume: 400,  size: "medium", attachTag: "SODA_COFFEE" },
        "MILK_CARTON":         { modelId: 19569, volume: 1000, size: "medium", attachTag: "CARTON_MILK_APPLE_ORANGE_JUICE" },
        "MILK_BOTTLE":         { modelId: 19570, volume: 1000, size: "medium", attachTag: "MILK_BOTTLE" },
        "ORANGE_JUICE_CARTON": { modelId: 19563, volume: 1000, size: "medium", attachTag: "CARTON_MILK_APPLE_ORANGE_JUICE" },
        "APPLE_JUICE_CARTON":  { modelId: 19564, volume: 1000, size: "medium", attachTag: "CARTON_MILK_APPLE_ORANGE_JUICE" },
    } as const satisfies Record<string, DrinkArchetype>,

    WEAPON: {
        PISTOLS: {
            "COLT45":   { modelId: 346, weaponId: 22, defaultAmmo: 17, size: "small",  attachTag: "WEAPON_COLT45" },
            "SILENCED": { modelId: 347, weaponId: 23, defaultAmmo: 17, size: "small",  attachTag: "WEAPON_SILENCED" },
            "DEAGLE":   { modelId: 348, weaponId: 24, defaultAmmo: 7,  size: "medium", attachTag: "WEAPON_DEAGLE"  }
        } as const satisfies Record<PistolTypes, ReloadableWeaponArchetype>,

        SHOTGUNS: {
            "SHOTGUN":  { modelId: 349, weaponId: 25, defaultAmmo: 1, size: "big", attachTag: "WEAPON_SHOTGUN" },
            "SAWEDOFF": { modelId: 350, weaponId: 26, defaultAmmo: 2, size: "big", attachTag: "WEAPON_SAWEDOFF" },
            "SHOTGSPA": { modelId: 351, weaponId: 27, defaultAmmo: 7, size: "big", attachTag: "WEAPON_SHOTGSPA" }
        } as const satisfies Record<ShotgunTypes, ReloadableWeaponArchetype>,

        SUBMACHINE_GUNS: {
            "TEC9": { modelId: 372, weaponId: 32, defaultAmmo: 50, size: "medium", attachTag: "WEAPON_TEC9" },
            "UZI":  { modelId: 352, weaponId: 28, defaultAmmo: 50, size: "medium", attachTag: "WEAPON_UZI" },
            "MP5":  { modelId: 353, weaponId: 29, defaultAmmo: 30, size: "medium", attachTag: "WEAPON_MP5" }
        } as const satisfies Record<SubmachineTypes, ReloadableWeaponArchetype>,

        ASSAULT_RIFLES: {
            "AK47": { modelId: 355, weaponId: 30, defaultAmmo: 30, size: "big", attachTag: "WEAPON_AK47" },
            "M4":   { modelId: 356, weaponId: 31, defaultAmmo: 50, size: "big", attachTag: "WEAPON_M4" }
        } as const satisfies Record<AssaultRifleTypes, ReloadableWeaponArchetype>,

        SNIPER_RIFLES: {
            "RIFLE":  { modelId: 357, weaponId: 33, defaultAmmo: 1, size: "big", attachTag: "WEAPON_RIFLE" },
            "SNIPER": { modelId: 358, weaponId: 34, defaultAmmo: 1, size: "big", attachTag: "WEAPON_SNIPER" }
        } as const satisfies Record<SniperRifleTypes, ReloadableWeaponArchetype>,

        THROWN_WEAPONS: {
            "GRENADE": { modelId: 342, weaponId: 16, size: "small", attachTag: "WEAPON_GRENADE" },
            "MOLTOV":  { modelId: 344, weaponId: 18, size: "small", attachTag: "WEAPON_MOLTOV" },
            "TEARGAS": { modelId: 343, weaponId: 17, size: "small", attachTag: "WEAPON_TEARGAS" },
            "SATCHEL": { modelId: 363, weaponId: 39, size: "small", attachTag: "WEAPON_SATCHEL" }
        } as const satisfies Record<ThrownTypes, WeaponArchetype>
    }
} as const;
*/



export const OBJECT_CATALOG = {
   FOOD: {
      "Tomate": {
         archetype: "TOMATO",
         calories: 22,
         //state: "fresca",
         //temperature: "tibia"
      },

      "Manzana roja": {
         archetype: "RED_APPLE",
         calories: 95,
         //state: "fresca",
         //temperature: "tibia"
      },

      "Manzana verde": {
         archetype: "GREEN_APPLE",
         calories: 52,
         //state: "fresca",
         //temperature: "tibia"
      },

      "Banana": {
         archetype: "BANANA",
         calories: 89,
         //state: "fresca",
         //temperature: "tibia"
      },

      "Naranja": {
         archetype: "ORANGE",
         calories: 47
      }
   } as const satisfies Record<string, IFoodItem>,

   DRINK: {
      "Lata de Sprunk": {
         archetype: "SODA_CAN",
         volume: 350
      },

      "Vaso de café": {
         archetype: "COFFEE_CUP",
         volume: 400
      },

      "Cartón de leche": {
         archetype: "MILK_CARTON",
         volume: 1000
      },

      "Botella de leche": {
         archetype: "MILK_BOTTLE",
         volume: 1000
      },

      "Cartón de jugo de manzana": {
         archetype: "APPLE_JUICE_CARTON",
         volume: 1000
      },

      "Cartón de jugo de naranja": {
         archetype: "ORANGE_JUICE_CARTON",
         volume: 1000
      }
   } as const satisfies Record<string, IDrinkItem>,

   WEAPON: {
      PISTOLS: {
         "Colt M1911A1": {
            archetype: "COLT45",
            magazine: ".45 ACP"
         },
         "Glock 17": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Colt 19": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Beretta M9": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "CZ 75": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Browning Hi-Power": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "FN Herstal FNP-45": {
            archetype: "COLT45",
            magazine: ".45 ACP"
         },
         "Walther P99": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "SIG Sauer P228": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Springfield XD-45": {
            archetype: "COLT45",
            magazine: ".45 ACP"
         },
         "Taurus PT92": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "S&W Model 469": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Kimber Custom II": {
            archetype: "COLT45",
            magazine: ".45 ACP"
         },
         "Para-Ordnance P14-45": {
            archetype: "COLT45",
            magazine: ".45 ACP"
         },
         "H&K P30": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "SIG Sauer P320": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Glock 19 Gen 5": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "CZ P-10 C": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Walther PDP": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Springfield Hellcat": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Smith & Wesson M&P 2.0": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Canik TP9SF": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "HK VP9": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Glock 43X": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "SIG P365": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Wilson Combat EDC X9": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Staccato P": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Shadow Systems MR920": {
            archetype: "COLT45",
            magazine: "9x19mm Parabellum"
         },
         "Colt M1911A1 silenciada": {
            archetype: "SILENCED",
            magazine: ".45 ACP"
         },
         "SIG P226 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "SW1991 silenciada": {
            archetype: "SILENCED",
            magazine: ".45 ACP"
         },
         "H&K USP silenciada": {
            archetype: "SILENCED",
            magazine: ".45 ACP"
         },
         "Ruger P95 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "Beretta 92FS silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "Glock 19 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "Walther PPK silenciada": {
            archetype: "SILENCED",
            magazine: ".32 ACP"
         },
         "SIG Sauer P239 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "CZ 75 SP-01 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "FN Five-seveN silenciada": {
            archetype: "SILENCED",
            magazine: "FN 5.7x28mm"
         },
         "Steyr M9-A1 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "SIG Sauer P320 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "Glock 19 Gen 5 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "H&K VP9 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "Walther PDP silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "CZ P-10 S silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "SIG P365 silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "B&T Station SIX silenciada": {
            archetype: "SILENCED",
            magazine: "9x19mm Parabellum"
         },
         "Q Honey Badger Pistol": {
            archetype: "SILENCED",
            magazine: ".300 AAC Blackout"
         },
         "Desert Eagle Mark VII": {
            archetype: "DEAGLE",
            magazine: ".357 Magnum"
         },
         "Colt Anaconda": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "Ruger Blackhawk": {
            archetype: "DEAGLE",
            magazine: ".45 Magnum"
         },
         "S&W Model 29": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "S&W Model 625": {
            archetype: "DEAGLE",
            magazine: ".45 ACP"
         },
         "Magnum Research BFR": {
            archetype: "DEAGLE",
            magazine: ".45-70 Government"
         },
         "Taurus Raging Bull": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "Ruger Super Redhawk": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "S&W Model 500": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "Colt Python": {
            archetype: "DEAGLE",
            magazine: ".357 Magnum"
         },
         "Ruger GP100": {
            archetype: "DEAGLE",
            magazine: ".357 Magnum"
         },
         "Dan Wesson 715": {
            archetype: "DEAGLE",
            magazine: ".357 Magnum"
         },
         "Taurus Judge": {
            archetype: "DEAGLE",
            magazine: ".45 ACP"
         },
         "Freedom Arms Model 83": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "Desert Eagle Mark XIX": {
            archetype: "DEAGLE",
            magazine: ".50 AE"
         },
         "S&W Performance Center 629": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "Ruger Super Redhawk Alaskan": {
            archetype: "DEAGLE",
            magazine: ".44 Magnum"
         },
         "Kimber K6s": {
            archetype: "DEAGLE",
            magazine: ".357 Magnum"
         },
         "Colt King Cobra": {
            archetype: "DEAGLE",
            magazine: ".357 Magnum"
         }
      },
      SHOTGUNS: {
         "Ithaca 37": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 16"
         },
         "Remington 870": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Mossberg 500": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Winchester Model 1300": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Benelli M4": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Winchester Model 1897": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Browning Auto-5": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Beretta A400": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Franchi Affinity": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Stoeger M3000": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Benelli Super Black Eagle 3": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Remington V3": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Winchester SX4": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Beretta A400 Xtreme Plus": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "CZ 1012": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Weatherby Element": {
            archetype: "SHOTGUN",
            magazine: "Cartucho de calibre 12"
         },
         "Lupara": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Remington 870 Tac-14": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Mossberg Shockwave": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Stoeger Coach Gun": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Serbu Super Shorty": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Winchester Model 1887 recortada": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Stevens 320 recortada": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "CZ Bobwhite G2 recortada": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Baikal MP-43 recortada": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Black Aces Tactical DT": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Charles Daly Honcho": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Remington TAC-14 DM": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Mossberg 590 Shockwave": {
            archetype: "SAWEDOFF",
            magazine: "Cartucho de calibre 12"
         },
         "Franchi SPAS-12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Benelli M3": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Saiga-12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Kel-Tec KSG": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "UTAS UTS-15": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Benelli M1014": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "AA-12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "USAS-12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Fostech Origin-12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "SRM Arms M1216": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "IWI Tavor TS12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Standard Manufacturing DP-12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Kalashnikov USA Komrad": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Black Aces Tactical Pro Series X": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         },
         "Panzer Arms BP-12": {
            archetype: "SHOTGSPA",
            magazine: "Cartucho de calibre 12"
         }
      },

      SUBMACHINES_GUNS: {
         "Tec-9": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "MAC-10": {
            archetype: "TEC9",
            magazine: ".45 ACP"
         },
         "MAC-11": {
            archetype: "TEC9",
            magazine: ".380 ACP"
         },
         "Sten Gun": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "Beretta 93R": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "Steyr TMP": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "Skorpion vz. 61": {
            archetype: "TEC9",
            magazine: ".32 ACP"
         },
         "PPSh-41": {
            archetype: "TEC9",
            magazine: "7.62x25mm Tokarev"
         },
         "Sterling L2A3": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "Carl Gustaf m/45": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "Kel-Tec SUB CXB": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "Hi-Point 1095": {
            archetype: "TEC9",
            magazine: "10mm Auto"
         },
         "CMMG Banshee": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "PSA AK-V": {
            archetype: "TEC9",
            magazine: "9x19mm Parabellum"
         },
         "Uzi": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "Mini Uzi": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "Thompson M1A1": {
            archetype: "UZI",
            magazine: ".45 ACP"
         },
         "Heckler & Koch MP5": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "FN P90": {
            archetype: "UZI",
            magazine: "FN 5.7x28mm"
         },
         "Heckler & Koch UMP": {
            archetype: "UZI",
            magazine: ".45 ACP"
         },
         "Calico M960": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "Beretta M12": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "Walther MPL": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "Star Z-84": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "IWI Uzi Pro": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "SIG MPX": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "CZ Scorpion EVO 3 S1": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "B&T GHM9": {
            archetype: "UZI",
            magazine: "9x19mm Parabellum"
         },
         "Heckler & Koch MP5A2": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Heckler & Koch MP5A3": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Heckler & Koch MP5SD": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Heckler & Koch MP5K": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Colt 9mm SMG": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Spectre M4": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Steyr MPi 69": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Madsen M50": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Socimi Type 821": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "FAMAE SAF": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "H&K MP5A5": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "FN P90 TR": {
            archetype: "MP5",
            magazine: "FN 5.7x28mm"
         },
         "Kriss Vector Gen II": {
            archetype: "MP5",
            magazine: ".45 ACP"
         },
         "B&T APC9": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "Angstadt Arms UDP-9": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         },
         "LWRC SMG-45": {
            archetype: "MP5",
            magazine: ".45 ACP"
         },
         "SIG MPX-K": {
            archetype: "MP5",
            magazine: "9x19mm Parabellum"
         }
      },

      ASSAULT_RIFLES: {
         "AK-47": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "AKM": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "AK-74": {
            archetype: "AK47",
            magazine: "5.45x39mm"
         },
         "AK-103": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "AK-104": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "AK-105": {
            archetype: "AK47",
            magazine: "5.45x39mm"
         },
         "RPK": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "RPK-74": {
            archetype: "AK47",
            magazine: "5.45x39mm"
         },
         "Zastava M70": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "Type 56": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "Vepr": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "Saiga MK": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "AN-94": {
            archetype: "AK47",
            magazine: "5.45x39mm"
         },
         "AEK-971": {
            archetype: "AK47",
            magazine: "5.45x39mm"
         },
         "AMD-65": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "AK-12": {
            archetype: "AK47",
            magazine: "5.45x39mm"
         },
         "AK-15": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "AK-19": {
            archetype: "AK47",
            magazine: "5.56x45mm NATO"
         },
         "Kalashnikov KR-103": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "Palmetto State AK-E": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "KUSA KP-9": {
            archetype: "AK47",
            magazine: "9x19mm Parabellum"
         },
         "Zastava ZPAP M70": {
            archetype: "AK47",
            magazine: "7.62x39mm"
         },
         "M16A1": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "M16A2": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "M16A4": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "M4 Carbine": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "M4A1": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Colt AR-15": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Colt Model 733": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Bushmaster XM-15": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Colt LE6920": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "FN M4A1": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Olympic Arms PCR": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "DPMS Panther": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Smith & Wesson M&P15": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Armalite AR-15A4": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Rock River LAR-15": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Daniel Defense DDM4 V7": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "SIG MCX Virtus": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "BCM RECCE-14": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Geissele Super Duty": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "KAC SR-15": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "LMT MARS-L": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "LWRC IC-DI": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Aero Precision M4E1": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Radian Model 1": {
            archetype: "M4",
            magazine: "5.56x45mm NATO"
         },
         "Q Honey Badger": {
            archetype: "M4",
            magazine: ".300 AAC Blackout"
         },
         "Sig Sauer MCX SPEAR": {
            archetype: "M4",
            magazine: "6.8mm Remington SPC"
         }
      },

      SNIPER_RIFLES: {
         "Winchester Model 70": {
            archetype: "RIFLE",
            magazine: ".30-06 Springfield"
         },
         "Remington Model 700": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Winchester Model 94": {
            archetype: "RIFLE",
            magazine: ".30-30 WCF"
         },
         "Marlin Model 336": {
            archetype: "RIFLE",
            magazine: ".30-30 WCF"
         },
         "Ruger Mini-14": {
            archetype: "RIFLE",
            magazine: "5.56x45mm NATO"
         },
         "Savage Model 110": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Browning X-Bolt": {
            archetype: "RIFLE",
            magazine: ".30-06 Springfield"
         },
         "Tikka T3": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Weatherby Vanguard": {
            archetype: "RIFLE",
            magazine: ".30-06 Springfield"
         },
         "Mossberg 464": {
            archetype: "RIFLE",
            magazine: ".30-30 WCF"
         },
         "Howa 1500": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "CZ 550": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Sako 85": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Steyr Scout": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Thompson Center Encore": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Ruger American": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Savage 110 Tactical": {
            archetype: "RIFLE",
            magazine: "6.5 Creedmoor"
         },
         "Tikka T3x": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Howa 1500 Carbon": {
            archetype: "RIFLE",
            magazine: "6.5 Creedmoor"
         },
         "CVA Cascade": {
            archetype: "RIFLE",
            magazine: ".308 Winchester"
         },
         "Remington M24": {
            archetype: "SNIPER",
            magazine: "7.62x51mm NATO"
         },
         "Barrett M82": {
            archetype: "SNIPER",
            magazine: ".50 BMG"
         },
         "Dragunov SVD": {
            archetype: "SNIPER",
            magazine: "7.62x54mmR"
         },
         "Accuracy International AWM": {
            archetype: "SNIPER",
            magazine: ".338 Lapua Magnum"
         },
         "H&K PSG1": {
            archetype: "SNIPER",
            magazine: "7.62x51mm NATO"
         },
         "Knight's Armament SR-25": {
            archetype: "SNIPER",
            magazine: "7.62x51mm NATO"
         },
         "Barrett M95": {
            archetype: "SNIPER",
            magazine: ".50 BMG"
         },
         "McMillan TAC-50": {
            archetype: "SNIPER",
            magazine: ".50 BMG"
         },
         "AI AWP": {
            archetype: "SNIPER",
            magazine: ".338 Lapua Magnum"
         },
         "Sako TRG-22": {
            archetype: "SNIPER",
            magazine: ".308 Winchester"
         },
         "Steyr SSG 69": {
            archetype: "SNIPER",
            magazine: "7.62x51mm NATO"
         },
         "CheyTac M200": {
            archetype: "SNIPER",
            magazine: ".408 CheyTac"
         },
         "FR F2": {
            archetype: "SNIPER",
            magazine: "7.62x51mm NATO"
         },
         "M110 SASS": {
            archetype: "SNIPER",
            magazine: "7.62x51mm NATO"
         },
         "Blaser R93": {
            archetype: "SNIPER",
            magazine: ".338 Lapua Magnum"
         },
         "Barrett MRAD": {
            archetype: "SNIPER",
            magazine: ".338 Norma Magnum"
         },
         "Accuracy International AXMC": {
            archetype: "SNIPER",
            magazine: ".338 Lapua Magnum"
         },
         "CheyTac M300": {
            archetype: "SNIPER",
            magazine: ".408 CheyTac"
         },
         "FN SCAR 20S": {
            archetype: "SNIPER",
            magazine: "7.62x51mm NATO"
         },
         "Desert Tech HTI": {
            archetype: "SNIPER",
            magazine: ".50 BMG"
         },
         "Savage 110 BA Stealth": {
            archetype: "SNIPER",
            magazine: "6.5 Creedmoor"
         },
         "Bergara B-14 HMR": {
            archetype: "SNIPER",
            magazine: "6.5 Creedmoor"
         },
         "Tikka T3x TAC A1": {
            archetype: "SNIPER",
            magazine: "6.5 Creedmoor"
         },
         "Barrett M107A1": {
            archetype: "SNIPER",
            magazine: ".50 BMG"
         },
         "SIG Cross": {
            archetype: "SNIPER",
            magazine: "6.5 Creedmoor"
         }
      },

      THROWN_WEAPONS: {
         "Granada M67": {
            archetype: "GRENADE"
         },
         "Granada de gas lacrimógeno": {
            archetype: "TEARGAS"
         },
         "Cóctel Molotov": {
            archetype: "MOLTOV"
         },
         "Bomba casera": {
            archetype: "SATCHEL"
         },
         "Granada MK2": {
            archetype: "GRENADE"
         },
         "Granada F1": {
            archetype: "GRENADE"
         },
         "Granada RGD-5": {
            archetype: "GRENADE"
         },
         "Granada de humo M18": {
            archetype: "TEARGAS"
         },
         "Granada cegadora M84": {
            archetype: "TEARGAS"
         },
         "C4": {
            archetype: "SATCHEL"
         },
         "TNT": {
            archetype: "SATCHEL"
         },
         "Granada M26": {
            archetype: "GRENADE"
         },
         "Granada de fósforo blanco": {
            archetype: "TEARGAS"
         },
         "Plastique": {
            archetype: "SATCHEL"
         },
         "Bomba de tubo": {
            archetype: "SATCHEL"
         },
         "M320 Granada": {
            archetype: "GRENADE"
         },
         "Granada M433": {
            archetype: "GRENADE"
         },
         "Granada de humo M713": {
            archetype: "TEARGAS"
         },
         "IED improvisado": {
            archetype: "SATCHEL"
         },
         "Granada 40mm HE": {
            archetype: "GRENADE"
         },
         "Granada Flashbang M7290": {
            archetype: "TEARGAS"
         }
      },

      HEAVY_WEAPONS: {
/*             "M134 Minigun": {
            archetype: "MINIGUN",
            magazine: "7.62x51mm NATO"
         },
         "RPG-7": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         },
         "FIM-43 Redeye": {
            archetype: "HEATSEEKER",
            magazine: "Strela-2M"
         },
         "Lanzallamas M2": {
            archetype: "FLAMETHROWER"
         },
         "M60 Machine Gun": {
            archetype: "MINIGUN",
            magazine: "7.62x51mm NATO"
         },
         "RPG-2": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         },
         "AT4": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         },
         "FIM-92 Stinger": {
            archetype: "HEATSEEKER",
            magazine: "Strela-2M"
         },
         "M2 Browning": {
            archetype: "MINIGUN",
            magazine: ".50 BMG"
         },
         "M79 Grenade Launcher": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         },
         "M249 SAW": {
            archetype: "MINIGUN",
            magazine: "5.56x45mm NATO"
         },
         "LAW M72": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         },
         "SA-7 Grail": {
            archetype: "HEATSEEKER",
            magazine: "Strela-2M"
         },
         "Lanzallamas XM42": {
            archetype: "FLAMETHROWER"
         },
         "M240 Machine Gun": {
            archetype: "MINIGUN",
            magazine: "7.62x51mm NATO"
         },
         "M134D-H": {
            archetype: "MINIGUN",
            magazine: "7.62x51mm NATO"
         },
         "Carl Gustaf M4": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         },
         "FGM-148 Javelin": {
            archetype: "HEATSEEKER",
            magazine: "Strela-2M"
         },
         "M240B": {
            archetype: "MINIGUN",
            magazine: "7.62x51mm NATO"
         },
         "XM25 CDTE": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         },
         "FN M249 SAW": {
            archetype: "MINIGUN",
            magazine: "5.56x45mm NATO"
         },
         "Barrett XM109": {
            archetype: "ROCKETLAUNCHER",
            magazine: "PG-7VM"
         } */
      }
   } as const satisfies Record<WeaponCategories, Partial<Record<WeaponName, IWeaponItem | IReloadableWeaponItem>>>
} as const;





export const FLATTENED_WEAPON_CATALOG = new Map<WeaponName, IWeaponItem | IReloadableWeaponItem>();

export const FLATTENED_WEAPON_ARCHETYPES = new Map<string, WeaponArchetype | ReloadableWeaponArchetype>();
export const FLATTENED_FOOD_ARCHETYPES = new Map<string, ICommonArchetype>();
export const FLATTENED_DRINK_ARCHETYPES = new Map<string, ICommonArchetype>();


Object.values(OBJECT_CATALOG.WEAPON).forEach(category => {
    Object.entries(category).forEach(([weaponName, def]) => {
        FLATTENED_WEAPON_CATALOG.set(weaponName as WeaponName, def as IWeaponItem | IReloadableWeaponItem);
    });
});


Object.values(ARCHETYPES_CATALOG.WEAPON).forEach(category => {
    Object.entries(category).forEach(([key, arch]) => {
        FLATTENED_WEAPON_ARCHETYPES.set(key, arch);
    });
});


Object.entries(ARCHETYPES_CATALOG.FOOD).forEach(([key, arch]) => {
    FLATTENED_FOOD_ARCHETYPES.set(key, arch);
});


Object.entries(ARCHETYPES_CATALOG.DRINK).forEach(([key, arch]) => {
    FLATTENED_DRINK_ARCHETYPES.set(key, arch);
});