import type { Document, Model } from "mongoose";
import type { PlayerHands, PlayerPockets } from "./infrastructure";
import type { BaseObject } from "@modules/objects";

export type MaybeObject = BaseObject<any> | null;
export type HandOption = "left" | "right";


export type PlayerHandsDomain = {
    [K in HandOption]: MaybeObject;
};


export type TPlayerPockets = BaseObject<any>[];


export interface IPlayerInventory {
    hands: PlayerHands;
    pockets: PlayerPockets;
}


export type PlayerHandsDB = {
    [K in HandOption]: string | null;
};

export interface IPlayerInventoryDB {
    playerName: string;
    hands: PlayerHandsDB;
    pockets: string[];
}


export interface IPlayerInventoryDocument extends IPlayerInventoryDB, Document {};
export interface IPlayerInventoryModel extends Model<IPlayerInventoryDocument> {};