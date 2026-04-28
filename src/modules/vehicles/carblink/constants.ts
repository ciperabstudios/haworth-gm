import { Vehicle } from "@infernus/core";

export const CARBLINK_TIME = 115; // Milisegundos.
export const Carblink = new Map<Vehicle, number>();
export const CarblinkTimer = new Map<Vehicle, NodeJS.Timeout>();
export const LightsVehicle = new Map<Vehicle, boolean>();