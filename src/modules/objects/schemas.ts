import { autoIncrementPlugin } from "@database/schemas/counter";
import { WEAPON_MODELS } from "@modules/weapons";
import type { Document } from "mongoose";
import { Model, model, Schema } from "mongoose";
import type { IDrinkObject, IFoodObject, IObject, IWeaponMagazine, IWeaponObject } from "./interface";


export interface IObjectDocument extends IObject, Omit<Document, "id"> {};
export interface IObjectModel extends Model<IObjectDocument> {};


const baseObjectSchema = new Schema<IObjectDocument, IObjectModel>({
    id: { type: String, unique: true, immutable: true },
    name: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} }
}, { discriminatorKey: "kind", collection: "objects" });

baseObjectSchema.plugin(autoIncrementPlugin, {
    id: "objectId",
    field: "id",
    string: true
});


export const BaseObjectModel = model<IObjectDocument, IObjectModel>("object", baseObjectSchema);



// ----------------------------------------------------


interface IFoodObjectDocument extends IFoodObject, Omit<Document, "id"> {};

BaseObjectModel.discriminator("FOOD", new Schema<IFoodObjectDocument>({
    state: { type: String, default: "fresca" },
    calories: { type: Number, required: true, min: 0 }
}));


// ----------------------------------------------------


interface IDrinkObjectDocument extends IDrinkObject, Omit<Document, "id"> {};

BaseObjectModel.discriminator("DRINK", new Schema<IDrinkObjectDocument>({
    volume: { type: Number, required: true, min: 0 },
    temperature: { type: String, default: "tibia" }
}));


// ----------------------------------------------------


interface IWeaponObjectDocument extends IWeaponObject, Omit<Document, "id"> {};

const VALID_WEAPON_NAMES = Object.values(WEAPON_MODELS).flatMap(c => Object.keys(c));

const magazineSchema = new Schema<IWeaponMagazine>({
    ammoType: { type: String, required: true },
    size: { type: Number, required: true }
}, { _id: false });

BaseObjectModel.discriminator("WEAPON", new Schema<IWeaponObjectDocument>({
    name: { type: String, required: true, enum: VALID_WEAPON_NAMES },
    magazine: { type: magazineSchema, default: null }
}));


// ----------------------------------------------------


const GenericBridgeSchema = new Schema({});

BaseObjectModel.discriminator("GENERIC", GenericBridgeSchema);
BaseObjectModel.discriminator("PHONE", GenericBridgeSchema);