import type { ICoordinates } from "@utils/interfaces/coordinates";
import type { DynamicPickup } from "@infernus/core";
import type { Document, Model } from "mongoose";

export interface IHouse {
    id: string;
    owner: string | null;

    /* Availability */
    available: boolean;
    price: number;

    coordinates: {
        interior: ICoordinates;
        exterior: ICoordinates;
    }
}


export interface IHouseDocument extends IHouse, Omit<Document, "id"> {};
export interface IHouseModel    extends Model<IHouseDocument> {};



export interface CreateHouseDTO {
    price: IHouse["price"];
    exterior: IHouse["coordinates"]["exterior"];
    interiorKey: string;
}


export interface IHousePickup {
    interior: DynamicPickup;
    exterior: DynamicPickup;
}

export type HousePickupRef = { houseId: string, type: "interior" | "exterior" };