import { Schema } from "mongoose";
import type { IBasePhoneApplication } from "./interfaces";


export const installedAppSchema = new Schema<IBasePhoneApplication>({
    appId: { type: String, required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    version: { type: String, /* required: true */ default: "1.0.0" },

    size: { type: Number, required: true, min: 1 }
}, { _id: false });


export const appDataSchema = new Schema({
    appId: { type: String, required: true },
    data: { type: Schema.Types.Mixed }
}, { _id: false });