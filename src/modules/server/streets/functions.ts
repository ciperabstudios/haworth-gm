import { Player } from "@infernus/core";
import { EXCLUDED_MAP_ZONE_AREA_COUNT, INVALID_MAP_ZONE_ID, MapZoneAreaData, MapZoneData, SAMainZones, SAZoneAreas, StreetsData } from "./data";
//import { BaseVehicle } from "@modules/vehicles";

// ADDRESS (STREETS)
export const getStreetName = (x: number, y: number): string => {
    const addressZone = StreetsData.find(({ minX, maxX, minY, maxY }) => (x >= minX && x <= maxX) && (y >= minY && y <= maxY));

    return addressZone?.name ?? "Calle desconocida";
}

export const getPlayerStreetName = (player: Player) => {
    if (!player.isSpawned()) return false;

    const { x, y } = player.getPos();

    return getStreetName(x, y);
}

export const getPlayerStreetID = (player: Player) => {

    if (!player.isSpawned()) return false;

    const { x, y } = player.getPos();

    return StreetsData.findIndex(({ minX, maxX, minY, maxY }) => (x >= minX && x <= maxX) && (y >= minY && y <= maxY));
}

export const getStreetNameFromIndex = (index: number) => index > -1 ? StreetsData[index].name : "Calle desconocida";
export const getStreetID = (x: number, y: number) => StreetsData.findIndex(({ minX, maxX, minY, maxY }) => (x >= minX && x <= maxX) && (y >= minY && y <= maxY));
export const getStreetByID = (id: number) => StreetsData[id] ?? null;

// AREA ZONE
export const getPlayerAreaZone = (x: number, y: number): string => {
    const areaZone = SAZoneAreas.find(({ minX, maxX, minY, maxY }) => (x >= minX && x <= maxX) && (y >= minY && y <= maxY));

    return areaZone ? areaZone.name : "000";
}


// MAP ZONE
export const _getMapZoneLoopStartIndex = (x: number) => {
    const size = MapZoneAreaData.length;
    let index = 0;

    let left = EXCLUDED_MAP_ZONE_AREA_COUNT;
    let right = size - 1;

    let found: boolean = false;

    while (left <= right) {

        index = Math.floor((left + right) / 2);

        const zoneAreaMinX = MapZoneAreaData[index].minX;

        if (zoneAreaMinX === x) { found = true; break; }
        if (x > zoneAreaMinX) { left = index + 1; }
        if (zoneAreaMinX > x) { right = index - 1; }
    }

    if (right < EXCLUDED_MAP_ZONE_AREA_COUNT || left >= size) index = EXCLUDED_MAP_ZONE_AREA_COUNT - 1;

    if (!found) index = right;

    while (index < size - 1 && MapZoneAreaData[index + 1].minX == MapZoneAreaData[index].minX) {
        index++;
    }

    return index;
}


export const getMapZoneAtPoint3D = (x: number, y: number, z: number) => {

    for (let index = _getMapZoneLoopStartIndex(x); index >= 0; index--) {
        const { areaId, maxX, minY, maxY, minZ, maxZ } = MapZoneAreaData[index];

        if ((x < maxX) && (minY <= y && maxY > y) && (minZ <= z && maxZ > z)) return areaId;
    }

    return null;
}


export const getPlayerMapZone3D = (player: Player) => {
    if (!player.isSpawned()) return INVALID_MAP_ZONE_ID;

    const { x, y, z } = player.getPos();

    return getMapZoneAtPoint3D(x, y, z);
}


/*
export const getVehicleMapZone3D = (vehicleId: number) => {
    const vehicle = BaseVehicle.getInstance(vehicleId) as BaseVehicle;

    if (!vehicle) return INVALID_MAP_ZONE_ID;

    const { x, y, z } = vehicle.getPos();

    return getMapZoneAtPoint3D(x, y, z);
}
*/


export const getMapZoneAtPoint2D = (x: number, y: number) => {

    for (let index = _getMapZoneLoopStartIndex(x); index >= 0; index--) {
        const { areaId, maxX, minY, maxY } = MapZoneAreaData[index];

        if ((x < maxX) && (minY <= y && maxY > y)) return areaId;
    }
    
    return INVALID_MAP_ZONE_ID;
}


export const getPlayerMapZone2D = (player: Player) => {
    if (!player.isSpawned()) return INVALID_MAP_ZONE_ID;

    const { x, y } = player.getPos();

    return getMapZoneAtPoint2D(x, y);
}


/*
export const getVehicleMapZone2D = (vehicleId: number) => {
    const vehicle = BaseVehicle.getInstance(vehicleId);

    if (!vehicle) return INVALID_MAP_ZONE_ID;

    const { x, y } = vehicle.getPos();

    return getMapZoneAtPoint2D(x, y);
}
*/


export const getMapZoneCount = () => MapZoneData.length;

export const isValidMapZone = (id: number) => 0 <= id && getMapZoneCount() > id;

export const getMapZoneNameByID = (id: number) => isValidMapZone(id) ? MapZoneData[id].name : "San Andreas";
export const getMapZoneSoundIDByID = (id: number) => isValidMapZone(id) ? MapZoneData[id].soundId : null;
export const getMapZoneAreaCountByID = (id: number) => isValidMapZone(id) ? MapZoneData[id].areaCount : null;

export const getMapZoneName2D = (x: number, y: number) => {
    const mapZoneId = getMapZoneAtPoint2D(x, y);

    return getMapZoneNameByID(mapZoneId!);
}

export const getMapZoneName3D = (x: number, y: number, z: number) => {
    const mapZoneId = getMapZoneAtPoint3D(x, y, z);

    return getMapZoneNameByID(mapZoneId!);
}

// MAP ZONE AREA
export const getMapZoneAreaPos = (id: number, start: number = 0) => {
    if (!isValidMapZone(id) || start < 0) return null;

    for (let size = MapZoneAreaData.length; start < size; start++) {
        if (MapZoneAreaData[start].areaId !== id) continue;

        const { areaId, ...coords } = MapZoneAreaData[start];
        return coords;
    }

    return null;
}


// MAIN ZONE (CITIES)
export const getCityName = (x: number, y: number) => SAMainZones.find(({ minX, maxX, minY, maxY }) => (x >= minX && x <= maxX) && (y >= minY && y <= maxY))?.name;
export const getCityID = (x: number, y: number) =>SAMainZones.findIndex(({ minX, maxX, minY, maxY }) => (x >= minX && x <= maxX) && (y >= minY && y <= maxY));