import type { IVehicle } from "@infernus/core";
import type { Document, Model } from "mongoose";
import type { CustomBaseVehicle } from "./variants/BaseVehicle";

export interface IBaseVehicle extends Omit<IVehicle, "respawnDelay" | "addSiren"> {
  vId: string;
  
  /* References */
  igID: number;

  /* Props */
  fuel: number;
  fuelType: VehicleFuelType;
  mileage: number;

  /* State */
  spawned: boolean;
  //locked: boolean;
  broken: boolean;
  
  /* Discriminator */
  kind: string;
}

export interface IBaseVehicleDocument extends IBaseVehicle, Document {};
export interface IBaseVehicleModel extends Model<IBaseVehicleDocument> {};

export interface CreateVehicleDTO {
  modelId: number;
  color: [number, number];
  pos: { x: number; y: number; z: number; }
  
  fuelType?: VehicleFuelType;
}


// ------------------------------------------------------------------------

export type VehicleFuelType = "Combustion" | "Electric";

export interface IFuelStrategy {
  type: "Combustion" | "Electric";
  unitName: string;

  consume(vehicle: CustomBaseVehicle<any>, distance: number): void;
  canRefuelAt(pumpType: "GasStation" | "Charger"): boolean;
  getRefuelMessage(): string;
}


// ------------------------------------------------------------------------

/* Vehículos de usuario */

export interface IUserVehicle extends IBaseVehicle {
  owner: string;
  locked: boolean;
}

export interface IUserVehicleDocument extends IUserVehicle, Document {};

// ------------------------------------------------------------------------

/* Vehículos de facción */

export interface IFactionVehicle extends IBaseVehicle {
  factionId: string;
}

export interface IFactionVehicleDocument extends IFactionVehicle, Document {};

// ------------------------------------------------------------------------

/* Vehículos de negocio */

export interface IBusinessVehicle extends IBaseVehicle {
  businessId: string;
}

export interface IBusinessVehicleDocument extends IBusinessVehicle, Document {};

// ------------------------------------------------------------------------

/* Vehículos de trabajo */

export interface IJobVehicle extends IBaseVehicle {
  jobId: string;
}

export interface IJobVehicleDocument extends IJobVehicle, Document {};


// ------------------------------------------------------------------------


export interface ParkableVehicle {
  park(): void;
}

export function isParkable(vehicle: any): vehicle is ParkableVehicle {
  return vehicle && typeof (vehicle as ParkableVehicle).park === 'function';
}