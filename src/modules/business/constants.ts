import type { TInteriorTypes } from "@modules/maps";

/* export const BUSINESS_CONFIG = {
    PICKUP: {
        INTERIOR_ID: 19198,
        EXTERIOR_ID: 1272,
        STREAM_DISTANCE: 100
    },
    STARTING_VIRTUAL_WORLD: 100
} as const;  */


export type BusinessType = "SUPERMARKET" | "RESTAURANT" | "BAR" | "NIGHT_CLUB" | /*"REAL_ESTATE" | */ "WEAPON_STORE" | "CAR_DEALERSHIP" | "MECHANICAL_WORKSHOP" | "CLOTHES" | "TATTOO" | "BARBER" | "SEX_SHOP";

export const BUSINESS_TYPES: Record<BusinessType, string> = {
    "SUPERMARKET": "Supermercado",
    "RESTAURANT": "Restaurant",
    "BAR": "Bar",
    "NIGHT_CLUB": "Club nocturno",
    //"REAL_ESTATE": "Inmobiliaria",
    "WEAPON_STORE": "Tienda de armas",
    "CAR_DEALERSHIP": "Concesionario de vehículos",
    "MECHANICAL_WORKSHOP": "Taller mecánico",
    "CLOTHES": "Tienda de ropa",
    "TATTOO": "Estudio de tatuajes",
    "BARBER": "Barbería",
    "SEX_SHOP": "Tienda erótica"
} as const;


export const BUSINESS_INTERIOR_TYPES: Record<BusinessType, TInteriorTypes> = {
    "SUPERMARKET": "24/7",
    "RESTAURANT": "Restaurant",
    "BAR": "Bar",
    "NIGHT_CLUB": "Club",
    //"REAL_ESTATE": ""
    "WEAPON_STORE": "Ammunation",
    "CAR_DEALERSHIP": "Cutscene/Mission",
    "MECHANICAL_WORKSHOP": "Cutscene/Mission",
    "CLOTHES": "Clothing shop",
    "TATTOO": "Tattoo",
    "BARBER": "Barber",
    "SEX_SHOP": "Sexshop"
} as const;



/* ------------------------------------------- */


/*

interface IProduct {
    name: string;
    object: string;
    stock: number;
    price: { base: number, min: number, max: number };
    inWarehouse: boolean;
}

interface INPC {
    name: string;
    age: number;
    genre: string;
    role: string;
    //modelAI: string; 
}




export interface IBusiness {
    id: string;
    type: string;
    name: string;
    forSale: { 
        price: number | -1, 
        available: boolean 
    };
    inUse: boolean;
    owner: string | "Admin";
    manager?: string | "";
    employees?: number | 0;
    //dialog: number | 1;
    //status: number;
    //issuer: number | 0;
    cashRegister?: number;
    mapIconId?: number | -1;
    //products?: IProduct[];
    //npc?: INPC[];
    coordinates: {
        Exterior: Coordinates;
        Interior: Coordinates;
    }
};


interface IBusinessPickups {
    businessId: string;
    interior: DynamicPickup;
    exterior: DynamicPickup;
}


type BusinessInput = Omit<IBusiness, "id" | "coordinates"> & {
    coordinates: {
        Exterior: Coordinates;
        Interior: Omit<Coordinates, "vw">;
    };
};
*/