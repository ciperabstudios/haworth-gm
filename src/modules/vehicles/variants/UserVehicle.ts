import type { Player } from "@infernus/core";
import type { IUserVehicle, ParkableVehicle } from "../interfaces";
import { CustomBaseVehicle } from "./BaseVehicle";


export class UserVehicle extends CustomBaseVehicle<IUserVehicle> implements ParkableVehicle {
  get owner() { return this.props.owner; }
  get locked() { return this.props.locked; }

  override canDrive(player: Player): boolean {
    return this.props.owner === player.getName().name;
  }

  setOwner(newOwnerName: string) {
    this.props.owner = newOwnerName;
  }

  setLocked(newLockedState: boolean) {
    const { engine, lights, alarm, doors:_, bonnet, boot, objective } = this.getParamsEx();
    this.setParamsEx(engine, lights, alarm, newLockedState, bonnet, boot, objective);

    this.props.locked = newLockedState;
  }

  park(): void {
    this.syncStateData();
  }
}