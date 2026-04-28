import type { SchemaDefinitionProperty } from "mongoose";

export type StrictSchemaDefinition<T> = {
    [K in keyof T]-?: SchemaDefinitionProperty<T[K]>
};