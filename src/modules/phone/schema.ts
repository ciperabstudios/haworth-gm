import { autoIncrementPlugin } from "@database/schemas/counter";
import type { StrictSchemaDefinition } from "@utils/interfaces/schemas";
import type { Document } from "mongoose";
import { model, Model, Schema } from "mongoose";
import { PHONE_MODEL_IDS, type IPhone, type IPhoneCall, type IPhoneContact } from "./interfaces";
import { appDataSchema, installedAppSchema } from "./apps/schema";
import { DEFAULT_APPS } from "./apps/defaultApps";

export interface IPhoneDocument extends IPhone, Omit<Document, "id"> {};
export interface IPhoneModel    extends Model<IPhoneDocument> {};

const phoneContactSchema = new Schema<IPhoneContact>({
    name: { type: String, required: true, default: "Sin agendar" },
    phoneNumber: { type: String, required: true }
}, { _id: false });

const phoneCallSchema = new Schema<IPhoneCall>({
    uid: { type: Number, required: true, immutable: true, min: 0 },
    type: { type: String, enum: ["receive", "make"], required: true },
    state: { type: String, enum: ["accepted", "rejected"], required: true },
    duration: { type: Number, required: true, min: 0 },
    members: { type: [String], required: true }
}, { _id: false })

const phoneSchemaDefinition: StrictSchemaDefinition<IPhone> = {
    id: { type: String },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    owner: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    operatingSystem: {
        name: { type: String, default: "Android" },
        version: { type: String, default: "Android 16" },
    },
    color: { type: String, required: true, immutable: true },
    modelId: { type: String, enum: Object.values(PHONE_MODEL_IDS), required: true },
    battery: { type: Number, default: 100, min: 0, max: 100 },
    state: { type: String, default: "off" },
    contacts: { type: [phoneContactSchema], default: [] },
    callHistory: { type: [phoneCallSchema], default: [] },

    // Aplicaciones
    installedApps: { type: [installedAppSchema], default: /* [] */DEFAULT_APPS },
    /* applications */applicationsData: { type: [appDataSchema], default: [] } 
};

const phoneSchema = new Schema<IPhoneDocument, IPhoneModel>(phoneSchemaDefinition, { timestamps: true });

phoneSchema.plugin(autoIncrementPlugin, {
    id: "phoneId",
    field: "id",
    string: true
});

const PhoneModel = model<IPhoneDocument, IPhoneModel>("phones", phoneSchema);

export default PhoneModel;