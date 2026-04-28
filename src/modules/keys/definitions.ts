import { Schema } from "mongoose";

export const KEY_MAPPING = {
    ON_FOOT: {
        1: "Tabulador",
        2: "C",
        4: "Control (Ctrl)",
        8: "Espacio",
        16: "F/Enter",
        32: "Shift",
        128: "Mayúscula",
        512: "1 (teclado numérico)",
        1_024: "Alt",
        8_192: "4 (teclado numérico)",
        16_384: "6 (teclado numérico)",
        65_536: "Y",
        131072: "N",
        262144: "H"
   },
   
   IN_VEHICLE: {
        1:      "Control (Ctrl)",
        2:      "H/Mayúscula",
        4:      "Alt",
        8:      "W",
        32:     "S",
        64:     "E",
        128:    "Espacio",
        256:    "Q",
        512:    "+ (teclado numérico)",
        2048:   "8 (teclado numérico)",
        4096:   "2 (teclado numérico)",
        8192:   "4 (teclado numérico)",
        16384:  "6 (teclado numérico)",
        65536:  "Y",
        131072: "N",
        262144: "R"
   }
} as const;



export const AVAILABLE_OPTIONS = {
    ON_FOOT: [
        ["joinInterior",  "Entrar a un interior"],
        ["exitInterior",  "Salir de un interior"],
        ["openInventory", "Abrir el inventario" ],
        ["openDoors",     "Abrir las puertas"   ],
        ["closeDoors",    "Cerrar las puertas"  ],

        // Nuevos ----------------
        ["buyProducts",   "Comprar productos"],
        ["openPhone",     "Abrir teléfono"   ],
        ["checkTrunk",    "Ver maletero"     ],
        ["checkVehicle",  "Ver vehículo"     ]
    ],

    IN_VEHICLE: [
        ["toggleEngine",   "Encender/apagar el motor" ],
        ["toggleLights",   "Encender/apagar las luces"],
        // "Pagar el peaje",

        // Nuevos ----------------
        ["toggleSeatbelt", "Colocarse/quitarse el cinturón"],
        ["toggleWindow",   "Subir/bajar la ventanilla"     ]
    ],

    // Tanto a pie como en vehículo.
    HYBRID: [
        ["toggleLock", "Colocar/quitar el seguro del vehículo"]
    ]
} as const;



// --------------------------------------------------------------------------


export type KeyMappingGroup = keyof typeof KEY_MAPPING;
export type KeyOptionGroup = keyof typeof AVAILABLE_OPTIONS;

export type KeyMappingBits<G extends KeyMappingGroup = KeyMappingGroup> = keyof typeof KEY_MAPPING[G];
//type KeyBitLabel<G extends keyof typeof KEY_MAPPING, B extends KeyBits<G>> = typeof KEY_MAPPING[G][B];
export type KeyMappingLabel<G extends KeyMappingGroup> = typeof KEY_MAPPING[G][keyof typeof KEY_MAPPING[G]];

export type KeyOption<G extends KeyOptionGroup> = typeof AVAILABLE_OPTIONS[G][number][0];
export type KeyOptionAction<G extends KeyOptionGroup> = typeof AVAILABLE_OPTIONS[G][number][1];
export type KeyOptionData<G extends KeyOptionGroup> = typeof AVAILABLE_OPTIONS[G][number];


export type HybridKeysBits = [KeyMappingBits<"ON_FOOT">, KeyMappingBits<"IN_VEHICLE">];

export type KeyBitsByGroup<G extends KeyOptionGroup = KeyOptionGroup> = 
    G extends "HYBRID" 
    ? HybridKeysBits : G extends Exclude<KeyOptionGroup, "HYBRID"> 
    ? KeyMappingBits<G> : never;

export type IKeys = {
    [G in KeyOptionGroup]: {
        [K in KeyOption<G>]: KeyBitsByGroup<G> | null;
    }
}

export type ICommandKeys = {
    [G in KeyOptionGroup]: {
        [K in KeyOption<G>]: string;
    }
}

export interface IPlayerKeys extends IKeys {};

export interface IKeyUpdate<G extends KeyOptionGroup = KeyOptionGroup> {
    state: G,
    key: KeyOption<G>,
    action: KeyOptionAction<G> | null
}


// --------------------------------------------------------------------------

export interface IKeyStateDialog {
    updates: IKeyUpdate[];
    currentGroup?: /* KeyOptionGroup */KeyMappingGroup;
    currentActionKey?: string;
}

// --------------------------------------------------------------------------

// Helper para construir el objeto de un grupo específico
const buildGroupDefaults = (options: readonly (readonly [string, string])[]) => {
    const group: Record<string, null> = {};

    for (const [key] of options) {
        group[key] = null;
    }

    return group;
};

// Función principal exportable
export const setDefaultShortcutKeysProps = (): IKeys => {
    return {
        ON_FOOT: buildGroupDefaults(AVAILABLE_OPTIONS.ON_FOOT) as any,
        IN_VEHICLE: buildGroupDefaults(AVAILABLE_OPTIONS.IN_VEHICLE) as any,
        HYBRID: buildGroupDefaults(AVAILABLE_OPTIONS.HYBRID) as any
    };
};

// --------------------------------------------------------------------------

const createSchemaDefinition = (options: readonly (readonly [string, string])[], isArray = false) => {
    const definition: Record<string, any> = {};

    for (const [key] of options) {
        definition[key] = {
            type: isArray ? [Number] : Number,
            default: null
        };
    }

    return definition;
};

export const keySchema = new Schema<IKeys>({
    ON_FOOT: new Schema(createSchemaDefinition(AVAILABLE_OPTIONS.ON_FOOT), { _id: false }),
    IN_VEHICLE: new Schema(createSchemaDefinition(AVAILABLE_OPTIONS.IN_VEHICLE), { _id: false }),
    HYBRID: new Schema(createSchemaDefinition(AVAILABLE_OPTIONS.HYBRID, true), { _id: false })
}, { _id: false });

