import type { Player } from "@infernus/core";
import type { IBusinessVehicle } from "../interfaces";
import { CustomBaseVehicle } from "./BaseVehicle";


export class BusinessVehicle extends CustomBaseVehicle<IBusinessVehicle> {
  get businessId() { return this.props.businessId; }

  override canDrive(player: Player): boolean {
    // TODO: Lógica de negocio.
    return true;
  }
}
