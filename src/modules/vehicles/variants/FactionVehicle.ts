import type { Player } from "@infernus/core";
import { CustomBaseVehicle } from "./BaseVehicle";
import type { IFactionVehicle, ParkableVehicle } from "../interfaces";

export class FactionVehicle extends CustomBaseVehicle<IFactionVehicle> implements ParkableVehicle {
  get factionId() { return this.props.factionId; }

  override canDrive(player: Player): boolean {
    // TODO: Lógica de facción.
    return true;
  }
  
  park(): void {
    this.syncStateData();
  }
}
