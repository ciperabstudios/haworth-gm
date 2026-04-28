import type { Player } from "@infernus/core";
import type { CreateVehicleDTO, IBaseVehicle, IBaseVehicleDocument, IBusinessVehicle, IFactionVehicle, IUserVehicle } from "../interfaces";
import { BusinessVehicle, CombustionStrategy, ElectricStrategy, FactionVehicle, UserVehicle, type CustomBaseVehicle } from "../variants";


export class VehicleFactory {

    static create(doc: IBaseVehicleDocument | IBaseVehicle): CustomBaseVehicle<any> {
        // Verificamos si tiene el método toObject antes de llamarlo.
        // Si no lo tiene, asumimos que 'doc' ya es la data cruda (porque vino de .lean())

        // flattenMaps: true convierte Map a Object.
        // versionKey: false quita __v.
        const rawData = (typeof (doc as any).toObject === 'function')
            ? (doc as any).toObject({ getters: true, virtuals: false, versionKey: false, flattenMaps: true })
            : doc;

        let vehicle: CustomBaseVehicle<any>;

        switch (doc.kind) {
            case 'UserVehicle':     vehicle = new UserVehicle(rawData as IUserVehicle);         break;
            case 'FactionVehicle':  vehicle = new FactionVehicle(rawData as IFactionVehicle);   break;
            case 'BusinessVehicle': vehicle = new BusinessVehicle(rawData as IBusinessVehicle);  break;
            default:
                throw new Error(`Unknown vehicle kind: ${doc.kind}`);
        }

        vehicle.fuelSystem = rawData.fuelType === "Electric" ? new ElectricStrategy() : new CombustionStrategy();

        return vehicle;
    }

    static createUserData(player: Player, dto: CreateVehicleDTO): Partial<IUserVehicle> {
        const { color, modelId, pos: { x, y, z }, fuelType } = dto;

        return {
            kind: "UserVehicle",
            modelId,
            x, y, z,
            zAngle: 0,
            color,

            // ----------------------------

            owner: player.getName().name,
            spawned: true,
            locked: false,
            broken: false,

            // ----------------------------
            fuel: 100,
            fuelType
        };
    }

    static createFactionData(factionId: string, dto: CreateVehicleDTO): Partial<IFactionVehicle> {
        const { color, modelId, pos: { x, y, z }, fuelType } = dto;

        return {
            kind: "FactionVehicle",
            modelId,
            x, y, z,
            zAngle: 0,
            color,

            // ----------------------------

            factionId,
            spawned: true,
            broken: false,

            // ----------------------------
            fuel: 100,
            fuelType
        };
    }

    static createBusinessData(businessId: string, dto: CreateVehicleDTO): Partial<IBusinessVehicle> {
        const { color, modelId, pos: { x, y, z }, fuelType } = dto;

        return {
            kind: "BusinessVehicle",
            modelId,
            x, y, z,
            zAngle: 0,
            color,

            // ----------------------------

            businessId,
            spawned: true,
            broken: false,
            
            // ----------------------------
            fuel: 100,
            fuelType
        };
    }
}