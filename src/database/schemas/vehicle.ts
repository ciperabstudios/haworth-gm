import type { StrictSchemaDefinition } from "@utils/interfaces/schemas";
import { model, Schema } from "mongoose";
import { autoIncrementPlugin } from "./counter";
import type { IBaseVehicle, IBaseVehicleDocument, IBaseVehicleModel, IBusinessVehicleDocument, IFactionVehicleDocument, IJobVehicleDocument, IUserVehicleDocument } from "@modules/vehicles/interfaces";


const baseVehicleSchemaDefinition: StrictSchemaDefinition<IBaseVehicle> = {
  vId: { type: String, unique: true, immutable: true },
  igID: { type: Number, default: -1 },
  spawned: { type: Boolean, default: true },
  //locked: { type: Boolean, default: false },
  broken: { type: Boolean, default: false },
  fuel: { type: Number, default: 100 },
  fuelType: { type: String, default: "Combustion" },
  mileage: { type: Number, min: 0, default: 0 },
  modelId: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
  zAngle: { type: Number, default: 0 },
  color: { type: [Number], default: [0, 0] },

  /* Discriminator */
  kind: { type: String, required: true }
};

const baseVehicleSchema = new Schema<IBaseVehicleDocument, IBaseVehicleModel>(baseVehicleSchemaDefinition, { discriminatorKey: "kind", collection: "vehicles" })

baseVehicleSchema.plugin(autoIncrementPlugin, {
  id: "vehicleId",
  field: "vId",
  string: true
});

const BaseVehicleModel = model<IBaseVehicleDocument, IBaseVehicleModel>("Vehicle", baseVehicleSchema);


BaseVehicleModel.discriminator<IUserVehicleDocument>("UserVehicle", new Schema<IUserVehicleDocument>({
  owner: { type: String, required: true },
  locked: { type: Boolean, default: false }
}));


BaseVehicleModel.discriminator<IFactionVehicleDocument>("FactionVehicle", new Schema<IFactionVehicleDocument>({
  factionId: { type: String, required: true }
}));


BaseVehicleModel.discriminator<IBusinessVehicleDocument>("BusinessVehicle", new Schema<IBusinessVehicleDocument>({
  businessId: { type: String, required: true }
}));


BaseVehicleModel.discriminator<IJobVehicleDocument>("JobVehicle", new Schema<IJobVehicleDocument>({
  jobId: { type: String, required: true }
}));


// -----------------------

export default BaseVehicleModel;