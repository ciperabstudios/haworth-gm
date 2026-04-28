export const FACTION_PERMISSIONS = {
    POLICE: {
        CUFF:   'police.cuff',
        TAZER:  'police.tazer',
        ARREST: 'police.arrest',
        DOORS:  'police.doors',
        RADIO:  'police.radio',
    },

    MEDIC: {
        RADIO: 'medic.radio'
    },

    GOVERNMENT: {
        KICK: 'gov.kick'
    },

    GENERAL: {
        MANAGEMENT:    'faction.management', // invite/kick/rank, ...
        OOC_CHAT:      'faction.ooc_chat',
        STATS:         'faction.stats',
        PARK_VEHICLES: 'faction.park_vehicles'
    }
} as const;



export const FACTION_PERMISSIONS_DESCRIPTIONS: Record<FactionPermissionString, string> = {
    "police.cuff":   "Otorga permisos para utilizar el comando /esposar.",
    "police.tazer":  "Otorga permisos para utilizar el comando /taser.",
    "police.arrest": "Otorga permisos para utilizar el comando /arrestar",
    "police.doors":  "Otorga permisos para utilizar los comandos que gestionan puertas policiales.",
    "police.radio":  "Otorga permisos para utilizar el comando /r (radio policial).",

    // -------------------------------------------------------

    "medic.radio":   "Otorga permisos para utilizar el comando /r (radio médica).",

    // -------------------------------------------------------

    "gov.kick":      "Otorga permisos para utilizar el comando /kick en el gobierno.",

    // -------------------------------------------------------

    "faction.management":    "Otorga permisos para gestión faccionaria (invitar/expulsar).",
    "faction.ooc_chat":      "Otorga permisos para habilitar el chat faccionario OOC.",
    "faction.stats":         "Otorga permisos para ver estadísticas generales de la facción.",
    "faction.park_vehicles": "Otorga permisos para utilizar el comando /festacionar en vehículos faccionarios."
} as const;


export const ALL_FACTION_PERMISSIONS_LIST: string[] = (() => {
    const permissions: string[] = [];

    const extract = (obj: any) => {
        for (const key in obj) {
            typeof obj[key] === "string"
                ? permissions.push(obj[key])
                : extract(obj[key])
        }
    };

    extract(FACTION_PERMISSIONS);
    return permissions;
})();

type ExtractValues<T> = T extends object ? ExtractValues<T[keyof T]> : T;
export type FactionPermissionString = ExtractValues<typeof FACTION_PERMISSIONS>;