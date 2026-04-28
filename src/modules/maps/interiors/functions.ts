import type { IPropsInterior, TInteriorSizes, TInteriorTypes } from "./list";
import { INTERIOR_LIST } from "./list";


const TYPES_MAP = new Map<TInteriorTypes, IPropsInterior[]>();
const SIZES_MAP = new Map<TInteriorSizes, IPropsInterior[]>();
const INTERIOR_IDS_MAP = new Map<number, IPropsInterior[]>();


// Precompute to avoid code redundancy & computacional costs.
Object.values(INTERIOR_LIST).forEach(int => {

    if (!TYPES_MAP.has(int.type)) TYPES_MAP.set(int.type, []);
    if (!SIZES_MAP.has(int.size)) SIZES_MAP.set(int.size, []);

    TYPES_MAP.get(int.type)!.push(int);
    SIZES_MAP.get(int.size)!.push(int);

    INTERIOR_IDS_MAP.get(int.interiorId)?.push(int);

});


export const getInteriorsByType = (type: TInteriorTypes): IPropsInterior[] => TYPES_MAP.get(type) || [];

export const getInteriorsBySize = (size: TInteriorSizes): IPropsInterior[] => SIZES_MAP.get(size) || [];

export const getInteriorsByInteriorId = (intId: number): IPropsInterior[] => INTERIOR_IDS_MAP.get(intId) || [];

export const getInteriorData = (intId: string): IPropsInterior | null => INTERIOR_LIST[intId] ?? null;

export const findInteriorByName = (name: string): IPropsInterior | null => Object.values(INTERIOR_LIST).find(int => int.name.includes(name) || int.name.startsWith(name)) ?? null;