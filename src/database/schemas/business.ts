import type { IBusinessProduct } from "@modules/business/products/interfaces";
import type { IBusinessDocument, IBusinessModel } from "@modules/business/refactor/interfaces";
import type { ICoordinates } from "@utils/interfaces/coordinates";
import { model, Schema } from "mongoose";
import { autoIncrementPlugin } from "./counter";


const coordinatesObjectSchema = new Schema<ICoordinates>({ 
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    vw: { type: Number, default: 1 }
}, { _id: false });


const productSchema = new Schema<IBusinessProduct>({
    uid: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    stock: { type: Number, required: true, default: -1 }
}, { _id: false });


const businessSchema = new Schema<IBusinessDocument, IBusinessModel>({
    id: { type: String, unique: true, immutable: true },
    name: { type: String, required: true },
    owner: { type: String, default: null },
    available: { type: Boolean, default: false },
    price: { type: Number, required: true, min: 1 },
    coordinates: { interior: coordinatesObjectSchema, exterior: coordinatesObjectSchema },
    products: { type: [productSchema], default: [] }
}, { timestamps: true });


businessSchema.plugin(autoIncrementPlugin, {
    id: "businessId",
    field: "id",
    string: true
});




const BusinessModel = model<IBusinessDocument, IBusinessModel>("business", businessSchema);


export default BusinessModel;



/*
const CoordinatesObject = {
    x: CoordinatesSchema,
    y: CoordinatesSchema,
    z: CoordinatesSchema,
    int: {
        type: Number,
        required: false,
        default: 0,
    },
    vw: {
        type: Number,
        required: true,
        default: 1
    }
};


interface IBusiness extends BaseBusiness, Document {};

const BusinessSchema = new Schema<IBusiness>({
    businessId: { type: String, required: true, unique: true, immutable: true },
    type: { type: String, required: true, enum: ["SUPERMARKET", "RESTAURANT", "BAR", "NIGHT_CLUB", "WEAPON_STORE", "CAR_DEALERSHIP", "MECHANICAL_WORKSHOP", "CLOTHES", "TATTOO", "BARBER", "SEX_SHOP"] },
    name: { type: String, required: true, default: "Ninguno" },
    owner: { type: String, ref: "Character", default: null },
    forSale: { price: { type: Number, required: true, default: -1 }, available: { type: Boolean, required: true, default: true } },
    inUse: { type: Boolean, required: true, default: false },
    coordinates: { Exterior: CoordinatesObject, Interior: CoordinatesObject } 
}, { timestamps: true });

const Business = model<IBusiness>("Business", BusinessSchema);

export default Business;

*/