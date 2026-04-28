import { getInteriorsByType, type IPropsInterior } from "@modules/maps";
import { BUSINESS_INTERIOR_TYPES, type BusinessType } from "./constants";

export const getBusinessInteriorsList = (businessType: BusinessType): IPropsInterior[] => getInteriorsByType(BUSINESS_INTERIOR_TYPES[businessType]);