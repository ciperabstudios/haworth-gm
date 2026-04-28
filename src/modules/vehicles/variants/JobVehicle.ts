import type { Player } from "@infernus/core";
import type { IJobVehicle } from "../interfaces";
import { CustomBaseVehicle } from "./BaseVehicle";


export class JobVehicle extends CustomBaseVehicle<IJobVehicle> {
    get jobId() { return this.props.jobId; }

    override canDrive(player: Player): boolean {
        // TODO: Lógica de trabajo.
        return true;
    }
}