import { SchemaTypes } from "mongoose";

export const CoordinatesSchema = { 
    type: SchemaTypes.Decimal128,
    required: false,
    default: 0
};