import BaseVehicleModel from "@database/schemas/vehicle";
import type { Player } from "@infernus/core";
import { logger } from "@logger";
import type { CachedRepository } from "@utils/interfaces/repository";
import { isParkable, type CreateVehicleDTO } from "../interfaces";
import { VehicleFactory } from "./factory";
import { UserVehicle, type CustomBaseVehicle } from "../variants";




export class VehicleService {
  private _loadedVehicles: Set<number> = new Set();

  constructor(private readonly repository: CachedRepository<CustomBaseVehicle<any>>) {}

  // ---------------------------------------

  async resetAllInGameIds() {
    await BaseVehicleModel.updateMany({}, { $set: { igID: -1 } });
    logger.info("[VehicleService] IDs ingame reseteados a -1.");
  }

  // ---------------------------------------

  async modify<R>(vehicleId: string, operation: (vehicle: CustomBaseVehicle<any>) => R): Promise<R | null> {
    return this.repository.modify(vehicleId, operation);
  }

  // ---------------------------------------

  async loadPlayerVehicles(player: Player): Promise<void> {
    if (this._loadedVehicles.has(player.id)) return;

    const vehicles = await this.repository.loadMany({ kind: 'UserVehicle', owner: player.getName().name } as any) as UserVehicle[];
    if (!vehicles.length) return;

    for (const veh of vehicles) {
      if (veh.isValid()) continue;

      veh.create();

      await this.repository.save(veh.vId, veh);
    }

    this._loadedVehicles.add(player.id);

    logger.debug(`[VehicleService] Cargados ${vehicles.length} vehículos de ${player.getName().name}.`);
  }

  async unloadPlayerVehicles(player: Player) {
    if (!this._loadedVehicles.has(player.id)) return;

    const vehicles = this.repository.findInCache({ kind: 'UserVehicle', owner: player.getName().name } as any) as UserVehicle[];
    if (!vehicles.length) return;

    for (const veh of vehicles) {
      if (veh.isValid()) {
        veh.destroy();

        await this.repository.save(veh.vId, veh);
      }

      this.repository.evict(veh.vId);
    }

    this._loadedVehicles.delete(player.id);
    logger.debug(`[VehicleService] Descargados ${vehicles.length} vehículos de ${player.getName().name}.`);
  }

  // ---------------------------------------

  async loadStaticVehicles() {
    const vehicles = await this.repository.loadMany({ kind: { $ne: 'UserVehicle' }} as any);

    for (const veh of vehicles) {
      if (veh.isValid()) continue;

      veh.create();

      await this.repository.save(veh.vId, veh);
    }

    logger.info(`[VehicleService] Cargados ${vehicles.length} vehículos estáticos.`);
  }


  // ---------------------------------------

  findByGameId(vehicleGameId: number): CustomBaseVehicle<any> | undefined {
      const vehicles = this.repository.findInCache({});
      return vehicles.find(v => v.id === vehicleGameId);
  }


  // ---------------------------------------

  async createUserVehicle(player: Player, dto: CreateVehicleDTO) {
    const data = VehicleFactory.createUserData(player, dto);
    const vehicle = await this.repository.create(data as any);

    vehicle.create();

    await this.repository.save(vehicle.vId, vehicle);

    return vehicle;
  }

  async createFactionVehicle(factionId: string, dto: CreateVehicleDTO) {
    const data = VehicleFactory.createFactionData(factionId, dto);
    const vehicle = await this.repository.create(data as any);

    vehicle.create();

    await this.repository.save(vehicle.vId, vehicle);

    return vehicle;
  }

  async createBusinessVehicle(businessId: string, dto: CreateVehicleDTO) {
    const data = VehicleFactory.createBusinessData(businessId, dto);
    const vehicle = await this.repository.create(data as any);

    vehicle.create();

    await this.repository.save(vehicle.vId, vehicle);

    return vehicle;
  }


  async deleteVehicle(vehicleId: string) {
    const vehicle = await this.repository.findById(vehicleId);

    if (vehicle && vehicle.isValid()) vehicle.destroy();

    await this.repository.delete(vehicleId);
  }

  // ---------------------------------------

  async setLockedState(vehicleId: string, newLockedState: boolean): Promise<boolean> {
    const vehicle = await this.repository.findById(vehicleId);
    if (!vehicle) return false;

    if (vehicle instanceof UserVehicle) {
      vehicle.setLocked(newLockedState);

      await this.repository.save(vehicleId, vehicle);
      return true;
    }
    
    return false;
  }

  async changeOwner(vehicleId: string, newOwnerName: string): Promise<boolean> {
      const vehicle = await this.repository.findById(vehicleId);
      if (!vehicle) return false;

      if (vehicle instanceof UserVehicle) {
        vehicle.setOwner(newOwnerName);

        await this.repository.save(vehicleId, vehicle);
        return true;
      }

      return false;
  }

  async setSpawnedState(vehicleId: string, newSpawnedValue: boolean): Promise<boolean> {
      const vehicle = await this.repository.findById(vehicleId);
      if (!vehicle) return false;

      vehicle.setSpawned(newSpawnedValue);

      await this.repository.save(vehicleId, vehicle);

      return true;
  }

  async updateParkingLocation(vehicleId: string): Promise<void> {
      const vehicle = await this.repository.findById(vehicleId);
      if (!vehicle || !vehicle.isValid()) return;

      if (isParkable(vehicle)) {
        vehicle.park();

        await this.repository.save(vehicleId, vehicle);
        logger.debug(`Vehículo ${vehicleId} estacionado.`);
      }

  }

}