import { WeaponEnum } from "@infernus/core";

// Main source: https://www.imfdb.org/wiki/Grand_Theft_Auto:_San_Andreas

type PistolAmmo = ".45 ACP" | ".357 Magnum" | ".44 Magnum" | ".45 Magnum" | ".45-70 Government" | "FN 5.7x28mm" | "7.62x25mm Tokarev" | ".32 ACP" | ".380 ACP" | ".40 S&W" | "10mm Auto" | "6.5x25mm CBJ" | ".50 AE";
type ShotgunGauges = "Cartucho de calibre 12" | "Cartucho de calibre 16";
type SubmachinesAmmo = "9x19mm Parabellum" | "9x19mm Makarov";
type AssaultRiflesAmmo = "7.62x39mm" | "5.56x45mm" | "5.45x39mm" | "7.62x39mm" | "5.56x45mm NATO" | "6.8mm Remington SPC" | ".300 AAC Blackout" | "6.5 Grendel";
type SniperRiflesAmmo = ".30-30 WCF" | ".30-06 Springfield" | ".308 Winchester" | "7.62x51mm NATO" | ".50 BMG" | ".408 CheyTac" | ".338 Lapua Magnum" | "7.62x54mmR" | ".300 Win Mag" | ".338 Norma Magnum" | "6.5 Creedmoor";
type HeavyWeaponsAmmo = "7.62x51mm" | "PG-7VM" | "Strela-2M" | "7.62x51mm NATO";

export type WeaponAmmos = PistolAmmo | ShotgunGauges | SubmachinesAmmo | AssaultRiflesAmmo | SniperRiflesAmmo | HeavyWeaponsAmmo;

export type WeaponTypes = "Pistola" | "Escopeta" | "Metralleta" | "Fusil de asalto" | "Fusil ametrallador"  | "Carabina" | "Rifle" | "Francotirador" | "Lanzable" | "Arma pesada";

export interface IWeaponData {
    weapon: WeaponEnum;
    type: WeaponTypes;
    bullets?: WeaponAmmos; // TODO: Cambiar a { type: WeaponAmmos; amount: number; };
}

const PISTOLS = {

    // WEAPON_COLT45 - Clásicas (época GTA SA)
    "Colt M1911A1": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: ".45 ACP" },
    "Glock 17": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Colt 19": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Beretta M9": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "CZ 75": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Browning Hi-Power": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "FN Herstal FNP-45": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: ".45 ACP" },
    "Walther P99": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "SIG Sauer P228": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Springfield XD-45": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: ".45 ACP" },
    "Taurus PT92": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "S&W Model 469": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Kimber Custom II": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: ".45 ACP" },
    "Para-Ordnance P14-45": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: ".45 ACP" },
    "H&K P30": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    
    // WEAPON_COLT45 - Modernas (2010-2025)
    "SIG Sauer P320": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Glock 19 Gen 5": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "CZ P-10 C": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Walther PDP": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Springfield Hellcat": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Smith & Wesson M&P 2.0": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Canik TP9SF": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "HK VP9": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Glock 43X": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "SIG P365": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Wilson Combat EDC X9": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Staccato P": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Shadow Systems MR920": { weapon: WeaponEnum.COLT45, type: "Pistola", bullets: "9x19mm Parabellum" },

    // WEAPON_SILENCED - Clásicas (época GTA SA)
    "Colt M1911A1 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: ".45 ACP" },
    "SIG P226 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "SW1991 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: ".45 ACP" },
    "H&K USP silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: ".45 ACP" },
    "Ruger P95 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Beretta 92FS silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Glock 19 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Walther PPK silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: ".32 ACP" },
    "SIG Sauer P239 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "CZ 75 SP-01 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "FN Five-seveN silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "FN 5.7x28mm" },
    "Steyr M9-A1 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    
    // WEAPON_SILENCED - Modernas (2010-2025)
    "SIG Sauer P320 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Glock 19 Gen 5 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "H&K VP9 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Walther PDP silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "CZ P-10 S silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "SIG P365 silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "B&T Station SIX silenciada": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: "9x19mm Parabellum" },
    "Q Honey Badger Pistol": { weapon: WeaponEnum.SILENCED, type: "Pistola", bullets: ".300 AAC Blackout" },

    // WEAPON_DEAGLE - Clásicas (época GTA SA)
    "Desert Eagle Mark VII": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".357 Magnum" },
    "Colt Anaconda": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    "Ruger Blackhawk": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".45 Magnum" },
    "S&W Model 29": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    "S&W Model 625": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".45 ACP" },
    "Magnum Research BFR": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".45-70 Government" },
    "Taurus Raging Bull": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    "Ruger Super Redhawk": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    "S&W Model 500": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    "Colt Python": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".357 Magnum" },
    "Ruger GP100": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".357 Magnum" },
    "Dan Wesson 715": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".357 Magnum" },
    "Taurus Judge": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".45 ACP" },
    "Freedom Arms Model 83": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    
    // WEAPON_DEAGLE - Modernas (2010-2025)
    "Desert Eagle Mark XIX": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".50 AE" },
    "S&W Performance Center 629": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    "Ruger Super Redhawk Alaskan": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".44 Magnum" },
    "Kimber K6s": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".357 Magnum" },
    "Colt King Cobra": { weapon: WeaponEnum.DEAGLE, type: "Pistola", bullets: ".357 Magnum" },

} as const;


const SHOTGUNS = {

    // WEAPON_SHOTGUN - Clásicas (época GTA SA)
    "Ithaca 37": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 16" },
    "Remington 870": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Mossberg 500": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Winchester Model 1300": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Benelli M4": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Winchester Model 1897": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Browning Auto-5": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Beretta A400": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Franchi Affinity": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Stoeger M3000": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    
    // WEAPON_SHOTGUN - Modernas (2010-2025)
    "Benelli Super Black Eagle 3": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Remington V3": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Winchester SX4": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Beretta A400 Xtreme Plus": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "CZ 1012": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Weatherby Element": { weapon: WeaponEnum.SHOTGUN, type: "Escopeta", bullets: "Cartucho de calibre 12" },

    // WEAPON_SAWEDOFF - Clásicas (época GTA SA)
    "Lupara": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Remington 870 Tac-14": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Mossberg Shockwave": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Stoeger Coach Gun": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Serbu Super Shorty": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Winchester Model 1887 recortada": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Stevens 320 recortada": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "CZ Bobwhite G2 recortada": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Baikal MP-43 recortada": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    
    // WEAPON_SAWEDOFF - Modernas (2010-2025)
    "Black Aces Tactical DT": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Charles Daly Honcho": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Remington TAC-14 DM": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Mossberg 590 Shockwave": { weapon: WeaponEnum.SAWEDOFF, type: "Escopeta", bullets: "Cartucho de calibre 12" },

    // WEAPON_SHOTGSPA - Clásicas (época GTA SA)
    "Franchi SPAS-12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Benelli M3": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Saiga-12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Kel-Tec KSG": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "UTAS UTS-15": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Benelli M1014": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "AA-12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "USAS-12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Fostech Origin-12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "SRM Arms M1216": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    
    // WEAPON_SHOTGSPA - Modernas (2010-2025)
    "IWI Tavor TS12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Standard Manufacturing DP-12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Kalashnikov USA Komrad": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Black Aces Tactical Pro Series X": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },
    "Panzer Arms BP-12": { weapon: WeaponEnum.SHOTGSPA, type: "Escopeta", bullets: "Cartucho de calibre 12" },

} as const;


const SUBMACHINES_GUNS = {

    // WEAPON_TEC9 - Clásicas (época GTA SA)
    "Tec-9": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "MAC-10": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: ".45 ACP" },
    "MAC-11": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: ".380 ACP" },
    "Sten Gun": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Beretta 93R": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Steyr TMP": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Skorpion vz. 61": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: ".32 ACP" },
    "PPSh-41": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "7.62x25mm Tokarev" },
    "Sterling L2A3": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Carl Gustaf m/45": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    
    // WEAPON_TEC9 - Modernas (2010-2025)
    "Kel-Tec SUB CXB": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Hi-Point 1095": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "10mm Auto" },
    "CMMG Banshee": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "PSA AK-V": { weapon: WeaponEnum.TEC9, type: "Metralleta", bullets: "9x19mm Parabellum" },

    // WEAPON_UZI - Clásicas (época GTA SA)
    "Uzi": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Mini Uzi": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Thompson M1A1": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: ".45 ACP" },
    "Heckler & Koch MP5": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "FN P90": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "FN 5.7x28mm" },
    "Heckler & Koch UMP": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: ".45 ACP" },
    "Calico M960": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Beretta M12": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Walther MPL": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Star Z-84": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    
    // WEAPON_UZI - Modernas (2010-2025)
    "IWI Uzi Pro": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "SIG MPX": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "CZ Scorpion EVO 3 S1": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "B&T GHM9": { weapon: WeaponEnum.UZI, type: "Metralleta", bullets: "9x19mm Parabellum" },

    // WEAPON_MP5 - Clásicas (época GTA SA)
    "Heckler & Koch MP5A2": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Heckler & Koch MP5A3": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Heckler & Koch MP5SD": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Heckler & Koch MP5K": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Colt 9mm SMG": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Spectre M4": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Steyr MPi 69": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Madsen M50": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Socimi Type 821": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "FAMAE SAF": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    
    // WEAPON_MP5 - Modernas (2010-2025)
    "H&K MP5A5": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "FN P90 TR": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "FN 5.7x28mm" },
    "Kriss Vector Gen II": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: ".45 ACP" },
    "B&T APC9": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "Angstadt Arms UDP-9": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },
    "LWRC SMG-45": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: ".45 ACP" },
    "SIG MPX-K": { weapon: WeaponEnum.MP5, type: "Metralleta", bullets: "9x19mm Parabellum" },

} as const;


const ASSAULT_RIFLES = {
    
    // WEAPON_AK47 - Clásicas (época GTA SA)
    "AK-47": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "AKM": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "AK-74": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "5.45x39mm" },
    "AK-103": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "AK-104": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "AK-105": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "5.45x39mm" },
    "RPK": { weapon: WeaponEnum.AK47, type: "Fusil ametrallador", bullets: "7.62x39mm" },
    "RPK-74": { weapon: WeaponEnum.AK47, type: "Fusil ametrallador", bullets: "5.45x39mm" },
    "Zastava M70": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "Type 56": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "Vepr": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "Saiga MK": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "AN-94": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "5.45x39mm" },
    "AEK-971": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "5.45x39mm" },
    "AMD-65": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    
    // WEAPON_AK47 - Modernas (2010-2025)
    "AK-12": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "5.45x39mm" },
    "AK-15": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "AK-19": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Kalashnikov KR-103": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "Palmetto State AK-E": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },
    "KUSA KP-9": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "9x19mm Parabellum" },
    "Zastava ZPAP M70": { weapon: WeaponEnum.AK47, type: "Fusil de asalto", bullets: "7.62x39mm" },

    // WEAPON_M4 - Clásicas (época GTA SA)
    "M16A1": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "M16A2": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "M16A4": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "M4 Carbine": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "M4A1": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Colt AR-15": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Colt Model 733": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Bushmaster XM-15": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Colt LE6920": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "FN M4A1": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Olympic Arms PCR": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "DPMS Panther": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Smith & Wesson M&P15": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Armalite AR-15A4": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Rock River LAR-15": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    
    // WEAPON_M4 - Modernas (2010-2025)
    "Daniel Defense DDM4 V7": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "SIG MCX Virtus": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "BCM RECCE-14": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Geissele Super Duty": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "KAC SR-15": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "LMT MARS-L": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "LWRC IC-DI": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Aero Precision M4E1": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Radian Model 1": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "5.56x45mm NATO" },
    "Q Honey Badger": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: ".300 AAC Blackout" },
    "Sig Sauer MCX SPEAR": { weapon: WeaponEnum.M4, type: "Fusil de asalto", bullets: "6.8mm Remington SPC" },

} as const;


const SNIPER_RIFLES = {

    // WEAPON_RIFLE - Clásicas (época GTA SA)
    "Winchester Model 70": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".30-06 Springfield" },
    "Remington Model 700": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Winchester Model 94": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".30-30 WCF" },
    "Marlin Model 336": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".30-30 WCF" },
    "Ruger Mini-14": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: "5.56x45mm NATO" },
    "Savage Model 110": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Browning X-Bolt": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".30-06 Springfield" },
    "Tikka T3": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Weatherby Vanguard": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".30-06 Springfield" },
    "Mossberg 464": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".30-30 WCF" },
    "Howa 1500": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "CZ 550": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Sako 85": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Steyr Scout": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Thompson Center Encore": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    
    // WEAPON_RIFLE - Modernas (2010-2025)
    "Ruger American": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Savage 110 Tactical": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: "6.5 Creedmoor" },
    "Tikka T3x": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },
    "Howa 1500 Carbon": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: "6.5 Creedmoor" },
    "CVA Cascade": { weapon: WeaponEnum.RIFLE, type: "Rifle", bullets: ".308 Winchester" },

    // WEAPON_SNIPER - Clásicas (época GTA SA)
    "Remington M24": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x51mm NATO" },
    "Barrett M82": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".50 BMG" },
    "Dragunov SVD": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x54mmR" },
    "Accuracy International AWM": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".338 Lapua Magnum" },
    "H&K PSG1": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x51mm NATO" },
    "Knight's Armament SR-25": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x51mm NATO" },
    "Barrett M95": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".50 BMG" },
    "McMillan TAC-50": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".50 BMG" },
    "AI AWP": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".338 Lapua Magnum" },
    "Sako TRG-22": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".308 Winchester" },
    "Steyr SSG 69": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x51mm NATO" },
    "CheyTac M200": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".408 CheyTac" },
    "FR F2": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x51mm NATO" },
    "M110 SASS": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x51mm NATO" },
    "Blaser R93": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".338 Lapua Magnum" },
    
    // WEAPON_SNIPER - Modernas (2010-2025)
    "Barrett MRAD": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".338 Norma Magnum" },
    "Accuracy International AXMC": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".338 Lapua Magnum" },
    "CheyTac M300": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".408 CheyTac" },
    "FN SCAR 20S": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "7.62x51mm NATO" },
    "Desert Tech HTI": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".50 BMG" },
    "Savage 110 BA Stealth": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "6.5 Creedmoor" },
    "Bergara B-14 HMR": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "6.5 Creedmoor" },
    "Tikka T3x TAC A1": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "6.5 Creedmoor" },
    "Barrett M107A1": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: ".50 BMG" },
    "SIG Cross": { weapon: WeaponEnum.SNIPER, type: "Francotirador", bullets: "6.5 Creedmoor" },

} as const;


const THROWN_WEAPONS = {
    
    // Clásicas (época GTA SA)
    "Granada M67": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada de gas lacrimógeno": { weapon: WeaponEnum.TEARGAS, type: "Lanzable" },
    "Cóctel Molotov": { weapon: WeaponEnum.MOLTOV, type: "Lanzable" },
    "Bomba casera": { weapon: WeaponEnum.SATCHEL, type: "Lanzable" },
    "Granada MK2": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada F1": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada RGD-5": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada de humo M18": { weapon: WeaponEnum.TEARGAS, type: "Lanzable" },
    "Granada cegadora M84": { weapon: WeaponEnum.TEARGAS, type: "Lanzable" },
    "C4": { weapon: WeaponEnum.SATCHEL, type: "Lanzable" },
    "TNT": { weapon: WeaponEnum.SATCHEL, type: "Lanzable" },
    "Granada M26": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada de fósforo blanco": { weapon: WeaponEnum.TEARGAS, type: "Lanzable" },
    "Plastique": { weapon: WeaponEnum.SATCHEL, type: "Lanzable" },
    "Bomba de tubo": { weapon: WeaponEnum.SATCHEL, type: "Lanzable" },
    
    // Modernas (2010-2025)
    "M320 Granada": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada M433": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada de humo M713": { weapon: WeaponEnum.TEARGAS, type: "Lanzable" },
    "IED improvisado": { weapon: WeaponEnum.SATCHEL, type: "Lanzable" },
    "Granada 40mm HE": { weapon: WeaponEnum.GRENADE, type: "Lanzable" },
    "Granada Flashbang M7290": { weapon: WeaponEnum.TEARGAS, type: "Lanzable" }
} as const;


// EXTRAS

const HEAVY_WEAPONS = {
    
    // Clásicas (época GTA SA)
    "M134 Minigun": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: "7.62x51mm NATO" },
    "RPG-7": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" },
    "FIM-43 Redeye": { weapon: WeaponEnum.HEATSEEKER, type: "Arma pesada", bullets: "Strela-2M"},
    "Lanzallamas M2": { weapon: WeaponEnum.FLAMETHROWER, type: "Arma pesada" },
    "M60 Machine Gun": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: "7.62x51mm NATO" },
    "RPG-2": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" },
    "AT4": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" },
    "FIM-92 Stinger": { weapon: WeaponEnum.HEATSEEKER, type: "Arma pesada", bullets: "Strela-2M" },
    "M2 Browning": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: ".50 BMG" },
    "M79 Grenade Launcher": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" },
    "M249 SAW": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: "5.56x45mm NATO" },
    "LAW M72": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" },
    "SA-7 Grail": { weapon: WeaponEnum.HEATSEEKER, type: "Arma pesada", bullets: "Strela-2M" },
    "Lanzallamas XM42": { weapon: WeaponEnum.FLAMETHROWER, type: "Arma pesada" },
    "M240 Machine Gun": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: "7.62x51mm NATO" },
    
    // Modernas (2010-2025)
    "M134D-H": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: "7.62x51mm NATO" },
    "Carl Gustaf M4": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" },
    "FGM-148 Javelin": { weapon: WeaponEnum.HEATSEEKER, type: "Arma pesada", bullets: "Strela-2M" },
    "M240B": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: "7.62x51mm NATO" },
    "XM25 CDTE": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" },
    "FN M249 SAW": { weapon: WeaponEnum.MINIGUN, type: "Arma pesada", bullets: "5.56x45mm NATO" },
    "Barrett XM109": { weapon: WeaponEnum.ROCKETLAUNCHER, type: "Arma pesada", bullets: "PG-7VM" }
} as const;


export const WEAPON_MODELS = { PISTOLS, SHOTGUNS, SUBMACHINES_GUNS, ASSAULT_RIFLES, SNIPER_RIFLES, THROWN_WEAPONS, HEAVY_WEAPONS } as const;