import BaseVehicleModel from "@database/schemas/vehicle";
import { MongooseRepository } from "@utils/interfaces/repository";
import { VehicleFactory } from "./factory";
import type { IBaseVehicle, IBaseVehicleDocument } from "../interfaces";
import type { CustomBaseVehicle } from "../variants";


export class VehicleRepository extends MongooseRepository<CustomBaseVehicle<any>, IBaseVehicle> {
  constructor() {
    super(
      BaseVehicleModel,
      (doc) => VehicleFactory.create(doc as IBaseVehicleDocument),
      (entity: CustomBaseVehicle<any>) => entity.allProps,
      "vId"
    );
  }
}