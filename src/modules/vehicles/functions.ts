import { Player, PlayerStateEnum, TextDraw, Vehicle, type TPos } from "@infernus/core";
import type { CustomBaseVehicle } from "./variants";
import { timerManager } from "@managers/TimerManager";
import { getStreetName } from "@modules/server/streets";
import { VehicleUtils } from "./utils";
import { GetDistanceBetweenPoints3D } from "@modules/server/functions";
import { vehicleService } from "./exportables";

export const speedoMeter = (player: Player, color: string = "#000000") => {
    const textDraws = [
        new TextDraw({ player, x: 589.999633, y: 387.851806, text: "KM/H" }),
        new TextDraw({ player, x: 622.999816, y: 397.807281, text: "G" }),
        new TextDraw({ player, x: 582.665954, y: 393.659637, text: "23" }),
        new TextDraw({ player, x: 619.998413, y: 393.659149, text: "60" }),
        new TextDraw({ player, x: 601.332763, y: 403.200103, text: "0000000" }),
        new TextDraw({ player, x: 623.332885, y: 400.296325, text: "." })
    ];

    const streetTextDraw = new TextDraw({ player, x: 625.5000, y: 429.5000, text: "" });

    streetTextDraw.create()
        .setFont(1)
        .setLetterSize(0.2500, 1.0000)
        .setAlignment(3)
        .setColor(/* -1378294017 */0xFF6359FF)
        .setShadow(0)
        .setOutline(1)
        .setBackgroundColors(255)
        .setProportional(true)
        .setTextSize(500.0000, 500.0000);

    textDraws[0].create()
        .setLetterSize(0.178332, 0.695703)
        .setTextSize(-225.333328, 5.807404)
        .setAlignment(2)
        .setColor(-1)
        .useBox(true)
        .setBoxColors(0)
        .setShadow(1)
        .setOutline(0)
        .setBackgroundColors(150)
        .setFont(3)
        .setProportional(true);

    textDraws[1].create()
        .setLetterSize(0.178332, 0.695703)
        .setTextSize(-225.333328, 5.807404)
        .setAlignment(2)
        .setColor(-1)
        .useBox(true)
        .setBoxColors(0)
        .setShadow(1)
        .setOutline(0)
        .setBackgroundColors(150)
        .setFont(3)
        .setProportional(true);

    textDraws[2].create()
        .setLetterSize(0.269998, 1.139551)
        .setAlignment(1)
        .setColor(-1)
        .setShadow(1)
        .setOutline(0)
        .setBackgroundColors(150)
        .setFont(3)
        .setProportional(true);

    textDraws[3].create()
        .setLetterSize(0.263998, 1.205924)
        .setAlignment(3)
        .setColor(-11513601)
        .useBox(true)
        .setBoxColors(0)
        .setShadow(1)
        .setOutline(0)
        .setBackgroundColors(150)
        .setFont(3)
        .setProportional(true);

    textDraws[4].create()
        .setLetterSize(0.269998, 1.139551)
        .setAlignment(2)
        .setColor(-1)
        .useBox(true)
        .setBoxColors(0)
        .setShadow(1)
        .setOutline(0)
        .setBackgroundColors(150)
        .setFont(3)
        .setProportional(true);

    textDraws[5].create()
        .setLetterSize(0.230665, 1.251554)
        .setTextSize(-225.333328, 5.807404)
        .setAlignment(2)
        .setColor(-1)
        .useBox(true)
        .setBoxColors(0)
        .setShadow(1)
        .setOutline(0)
        .setBackgroundColors(150)
        .setFont(3)
        .setProportional(true);

    return {
        show: () => {
            textDraws.forEach(td => td.show());
        },
        hide: () => {
            textDraws.forEach(td => td.hide());
        },
        has: (player: Player) => {
            return textDraws.some(td => td.isVisibleForPlayer(player));
        },
        update: (properties: Partial<{ text: string; letterSize: [number, number]; textSize: [number, number]; boxColors: string }>, index: number) => {
            const td = textDraws[index];
            if (properties.text !== undefined) {
                td.setString(properties.text);
            }
            if (properties.letterSize !== undefined) {
                td.setLetterSize(properties.letterSize[0], properties.letterSize[1]);
            }
            if (properties.textSize !== undefined) {
                td.setTextSize(properties.textSize[0], properties.textSize[1]);
            }
            if (properties.boxColors !== undefined) {
                td.setBoxColors(properties.boxColors);
            }
            return td;
        },
        destroy: () => {
            textDraws.forEach(td => td.isValid() && td.destroy());
        },
        showStreetMessage: (text: string) => {
            streetTextDraw.setString(text).show();
        },
        hideStreetMessage: () => {
            streetTextDraw.hide();
        },
        resetStreetText: () => {
            streetTextDraw.destroy();
        }
    };
};

const previousDriverPos: Map<number, TPos> = new Map();
const partialDistance: Map<number, number> = new Map();

const UNITS_PER_KM = 1_000;

export const updateSpeedometer = async (player: Player, speedoTextDraw: ReturnType<typeof speedoMeter>) => {
    const veh = player.getVehicle() as CustomBaseVehicle<any>;
    if (!veh) return;

    const vehModel = veh.getModel();
    if (VehicleUtils.isType(vehModel, "BIKE")) return;

    const speed = Math.round(veh.getSpeed());
    const fuel = veh.fuel;
    const mileage = veh.mileage.toString().padStart(7, "0");

    // Actualizar kilometraje.
    if (player.getState() === PlayerStateEnum.DRIVER) {
        const previousPos = previousDriverPos.get(player.id);

        if (!previousPos) previousDriverPos.set(player.id, player.getPos());

        const { x: pX, y: pY, z: pZ } = previousPos || player.getPos();
        const { x, y, z } = player.getPos();

        if (pX !== x || pY !== y || pZ !== z) {
            const distance = GetDistanceBetweenPoints3D(x, y, z, pX, pY, pZ);
            const currentDistance = partialDistance.get(player.id) ?? 0;
            const total = currentDistance + distance;

            const kms = Math.floor(total / UNITS_PER_KM);

            if (kms > 0) await vehicleService.modify(veh.vId, v => v.increaseMileage(kms));

            partialDistance.set(player.id, total % UNITS_PER_KM);
            previousDriverPos.set(player.id, player.getPos());
        }
    }

    speedoTextDraw.update({
        text: `${speed}`,
        boxColors: fuel > 200 ? "#00FF00" : fuel > 50 ? "#FFFF00" : "#FF0000"
    }, 2);
    
    speedoTextDraw.update({
        text: mileage
    }, 4);

    speedoTextDraw.show();
};

export const oneSecondDrivingTimer = async (player: Player, speedoTextDraw: ReturnType<typeof speedoMeter>) => {
    timerManager.createPlayerTimer(player, "driving", async () => {
        if (player.isInAnyVehicle()) {
            await updateSpeedometer(player, speedoTextDraw);
            speedoTextDraw.show();
            // Show street message
            const { x, y } = player.getPos();
            const streetName = getStreetName(x, y); 
            speedoTextDraw.showStreetMessage(streetName);
        } else {
            if (speedoTextDraw.has(player)) {
                speedoTextDraw.hide();
                speedoTextDraw.hideStreetMessage();
                speedoTextDraw.resetStreetText();
            } 
        }
    }, 1000, true);
};

/* export const isVehicleInRangeOfPoint = (radius: number, vehicle: Vehicle, x: number, y: number, z: number): boolean => {
    const { x: vehX, y: vehY, z: vehZ} = vehicle.getPos();
    const dx = vehX - x;
    const dy = vehY - y;
    const dz = vehZ - z;

    return (
        dx < radius && dx > -radius &&
        dy < radius && dy > -radius &&
        dz < radius && dz > -radius
    );
}; */