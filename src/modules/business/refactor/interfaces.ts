import type { ICoordinates } from "@utils/interfaces/coordinates";
import type { DynamicPickup } from "@infernus/core";
import type { Document } from "mongoose";
import type { Model } from "mongoose";
import type { IBusinessProduct } from "../products";


export interface IBusiness {
    id: string;
    name: string;
    owner: string | null;

    /* Availability */
    available: boolean;
    price: number;

    coordinates: {
        interior: ICoordinates;
        exterior: ICoordinates;
    };

    /* Products */
    products: IBusinessProduct[];
}


export type BusinessDTO = Pick<IBusiness, "name" | "price"> & {
    coordinates: {
        interior: Omit<ICoordinates, "vw">;
        exterior: ICoordinates;
    }
}


export interface IBusinessDocument extends IBusiness, Omit<Document, "id"> {};
export interface IBusinessModel    extends Model<IBusinessDocument> {};


// ------------------------------------------



export interface IBusinessPickup {
    interior: DynamicPickup;
    exterior: DynamicPickup;
}

export type PickupRef = { businessId: string, type: "interior" | "exterior" };