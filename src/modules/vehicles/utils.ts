import { Player, Vehicle, VehicleModelInfoEnum } from "@infernus/core";
import { VEHICLES_TYPE_CATEGORIES } from "./constants";
import { vehicleService } from "./exportables";
import type { CustomBaseVehicle } from "./variants";

export class VehicleUtils {
    static isType(vehicleModel: number, type: keyof typeof VEHICLES_TYPE_CATEGORIES) {
        return (VEHICLES_TYPE_CATEGORIES[type] as readonly number[]).includes(vehicleModel);
    }

    static hasCapoOrDoors(vehicleModel: number) {
        return !this.isType(vehicleModel, "BIKE") && !this.isType(vehicleModel, "MOTOR_BIKE") && !this.isType(vehicleModel, "BOAT") && !this.isType(vehicleModel, "PLANE");
    }

    static createPlate(): string {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
    
        const firstNumber = numbers[Math.floor(Math.random() * 9) + 1];
    
        const threeLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
        const threeNumbers = Array.from({ length: 3 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join("");
    
        // Example: "1ABC234".
        return `${firstNumber}${threeLetters}${threeNumbers}`;
    }

    static getXYBehind(inGameVehicleId: number, distance: number) {
        const vehicle = Vehicle.getInstance(inGameVehicleId)!;
        
        let { x, y } = vehicle.getPos();

        const zAngle = vehicle.getZAngle();

        const zAngleSin = Math.sin(-zAngle * (Math.PI / 180));
        const zAngleCos = Math.cos(-zAngle * (Math.PI / 180));

        x += (distance * -zAngleSin);
        y += (distance * -zAngleCos);

        return { x, y };
    }


    static getXYInFront(inGameVehicleId: number, distance: number) {
        const vehicle = Vehicle.getInstance(inGameVehicleId)!;

        let { x, y } = vehicle.getPos();

        const zAngle = vehicle.getZAngle().angle;

        const zAngleSin = Math.sin(-zAngle * (Math.PI / 180));
        const zAngleCos = Math.cos(-zAngle * (Math.PI / 180));

        x += (distance * zAngleSin);
        y += (distance * zAngleCos);

        return { x, y };
    }

    static getPosInFront(inGameVehicleId: number, offset: number = 0.5) {
        const vehicle = Vehicle.getInstance(inGameVehicleId)!;

        const { z }            = vehicle.getPos();
        const { y: vSizeY }    = vehicle.getModelInfo(VehicleModelInfoEnum.SIZE);
        const { x: fX, y: fY } = VehicleUtils.getXYInFront(vehicle.id, (vSizeY/2) + offset);

        return { fX, fY, z };
    }

    static getPlayerClosestVehicle(player: Player): CustomBaseVehicle<any> | null {
        const vehicles = Vehicle.getInstances();
        
        const closestVehicle = vehicles.find(veh => {
            const { x, y, z } = veh.getPos();

            return player.isInRangeOfPoint(5, x, y, z);
        });

        if (!closestVehicle) return null;

        const customVeh = vehicleService.findByGameId(closestVehicle.id);
        if (!customVeh) return null;

        return customVeh;
    }

}