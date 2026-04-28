import type { ICoordinates } from "@utils/interfaces/coordinates";
import type { StrictSchemaDefinition } from "@utils/interfaces/schemas";
import { model, Schema } from "mongoose";
import { autoIncrementPlugin } from "./counter";
import type { IHouse, IHouseDocument, IHouseModel } from "@modules/house/interfaces";


const coordinatesObjectSchema = new Schema<ICoordinates>({ 
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    vw: { type: Number, default: 1 }
}, { _id: false });


const houseSchemaDefinition: StrictSchemaDefinition<IHouse> = {
    id: { type: String, unique: true, immutable: true },
    owner: { type: String, default: null },
    available: { type: Boolean, default: false },
    price: { type: Number, required: true, min: 1 },
    coordinates: { interior: coordinatesObjectSchema, exterior: coordinatesObjectSchema }
};

const houseSchema = new Schema<IHouseDocument, IHouseModel>(houseSchemaDefinition);


houseSchema.plugin(autoIncrementPlugin, {
    id: "houseId",
    field: "id",
    string: true
});

const HouseModel = model<IHouseDocument, IHouseModel>("house", houseSchema);

export default HouseModel;