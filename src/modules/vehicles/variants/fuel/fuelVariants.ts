import type { CustomBaseVehicle } from "../BaseVehicle";
import type { IFuelStrategy } from "../../interfaces";

export class CombustionStrategy implements IFuelStrategy {
    type: "Combustion" = "Combustion" as const;
    unitName = "Litros";

    consume(vehicle: CustomBaseVehicle<any>, distance: number): void {
        const consumption = distance * 0.05;
        vehicle.decreaseFuel(consumption);
    }

    canRefuelAt(pumpType: "GasStation" | "Charger"): boolean {
        return pumpType === "GasStation";
    }

    getRefuelMessage(): string {
        return "~y~Llenando tanque de gasolina...";
    }
}


export class ElectricStrategy implements IFuelStrategy {
    type: 'Electric' = 'Electric' as const;
    unitName = '%';

    consume(vehicle: CustomBaseVehicle<any>, distance: number) {
        // Los eléctricos suelen ser más eficientes o gastar diferente
        const consumption = distance * 0.03; 
        vehicle.decreaseFuel(consumption);
    }

    canRefuelAt(pumpType: 'GasStation' | 'Charger'): boolean {
        return pumpType === 'Charger';
    }

    getRefuelMessage(): string {
        return "~b~Cargando baterías...";
    }
}