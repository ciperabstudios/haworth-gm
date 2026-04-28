import { Player, Vehicle, VehicleParamsEnum } from "@infernus/core";
import type { IBaseVehicle, IFuelStrategy } from "../interfaces";
import { VEHICLES_LIST } from "../constants";
import { CombustionStrategy } from "./fuel/fuelVariants";

export abstract class CustomBaseVehicle<T extends IBaseVehicle> extends Vehicle {
    public fuelSystem: IFuelStrategy;

    constructor(protected props: T) { 
        super(props);
        this.fuelSystem = new CombustionStrategy();
    }

    get vId() { return this.props.vId; }
    get igId() { return this.props.igID; }
    get spawned() { return this.props.spawned; }
    get broken() { return this.props.broken; }
    get fuel() { return this.props.fuel; }
    get mileage() { return this.props.mileage; }

    get kind() { return this.props.kind; }

    get allProps() { return structuredClone(this.props); }

    // ---------------------------------------

    override create(): void {
        super.create();
        this.props.igID = this.id;
    }

    override destroy(): void {
        super.destroy();
        this.props.igID = -1;
    }

    // ---------------------------------------

    decreaseFuel(amount: number) {
        this.props.fuel = Math.max(0, this.props.fuel - amount);

        if (this.props.fuel <= 0) this.toggleEngine(false);
    }

    processFuelConsumption(distanceTraveled: number) {
        if (!this.isEngineOn()) return;
        this.fuelSystem.consume(this, distanceTraveled);
    }

    // ---------------------------------------

    increaseMileage(amount: number) {
        if (amount < 0) return;

        this.props.mileage += amount;
    }

    decreaseMileage(amount: number) {
        if (this.props.mileage <= 0) return;
        if ((this.props.mileage - amount) < 0) return;

        this.props.mileage -= amount;
    }

    // ---------------------------------------

    private _engineOn: boolean = false;
    isEngineOn() { return this._engineOn; }

    private _lightsOn: boolean = false;
    areLightsOn() { return this._lightsOn; }

    private _alarmOn: boolean = false;
    isAlarmOn() { return this._alarmOn; }

    private _bonnetOpen: boolean = false;
    isBonnetOpen() { return this._bonnetOpen; } 

    // ---------------------------------------

    get name(): string {
        return VEHICLES_LIST.find(({ id }) => this.getModel() === id)?.name ?? "Desconocido";
    }

    // ---------------------------------------

    override toggleEngine(value: boolean | VehicleParamsEnum): boolean | 0 {
        const res = super.toggleEngine(value);

        this._engineOn = typeof value === "boolean" ? value : value < 0;

        return res;
    }

    override toggleLights(value: boolean | VehicleParamsEnum): boolean | 0 {
        const res = super.toggleLights(value);

        this._lightsOn = typeof value === "boolean" ? value : value < 0;

        return res;
    }

    override toggleAlarm(value: boolean | VehicleParamsEnum): boolean | 0 {
        const res = super.toggleAlarm(value);

        this._alarmOn = typeof value === "boolean" ? value : value < 0;

        return res;
    }

    override toggleBonnet(value: boolean | VehicleParamsEnum): boolean | 0 {
        const res = super.toggleBonnet(value);

        this._bonnetOpen = typeof value === "boolean" ? value : value < 0;

        return res;
    }

    // ---------------------------------------

    setSpawned(newSpawnedValue: boolean) {
        this.props.spawned = newSpawnedValue;
    }

    // ---------------------------------------

    abstract canDrive(player: Player): boolean;

    // ---------------------------------------

    protected syncStateData() {
        if (!this.isValid()) return;

        const { x, y, z } = this.getPos();
        const { angle } = this.getZAngle();

        this.props.x = x;
        this.props.y = y;
        this.props.z = z;
        this.props.zAngle = angle;

        // Sincronizar vida
        // ...

        // Sincronizar color
        const { color1, color2 } = this.getColors();
        this.props.color = [color1, color2];

        // Sincronizar combustible.
        this.props.fuel = this.fuel;

        // Sincronizar estado del vehículo.
        this.props.broken = this.broken;
    }
}