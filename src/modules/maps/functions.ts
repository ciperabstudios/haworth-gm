import { logger } from "@logger";
import { DynamicObject, Player } from "@infernus/core";
import { LoadChinatown, LoadContainers, LoadOffices, LoadPrison, LoadSignsTransit, RemovesChinatown, RemovesPrison, RemovesSignsTransit } from "./dataset";
import { LoadFD, RemovesFD } from "./dataset/fd";

interface Door {
    pos: [number, number, number];
    rot: [number, number, number];
    movRot: [number, number, number];
    faction: number;
    faction2: number;
    faction3: number;
    job: number;
    type: number;
    time: number;
    speed: number;
    object: any;
    timeClose: number;
};

let DoorCount = 0;
const DoorsMap = new Map<number, Door>();

export const CreateDoorMovable = (
    modelId: number,
    x: number,
    y: number,
    z: number,
    rx: number,
    ry: number,
    rz: number,
    worldId: number = -1,
    interiorId: number = -1,
    streamDistance: number,
    drawDistance: number,
    faction: number,
    faction2: number,
    faction3: number,
    job: number,
    type: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    time: number,
    speed: number
): any => {
    DoorCount++;
    const pid = DoorCount;

    const door: Door = {
        pos: [x, y, z],
        rot: [rx, ry, rz],
        movRot: [rotX, rotY, rotZ],
        faction,
        faction2,
        faction3,
        job,
        type,
        time,
        speed,
        object: new DynamicObject({ modelId, x, y, z, rx, ry, rz, worldId, interiorId, streamDistance, drawDistance }),
        timeClose: -1
    };

    DoorsMap.set(pid, door);

    return door.object;
};

export const rgba = (value: string | number): number => {
    if (typeof value === "number") return value;
    const numericValue = +value;
    if (!isNaN(numericValue)) return numericValue;
  
    if (value.startsWith("#")) {
      const hex = value.slice(1);
      if (hex.length === 3) {
        return parseInt(hex.split("").map((c) => c + c).join("") + "FF", 16);
      }
      if (hex.length === 6) return parseInt(hex + "FF", 16);
      if (hex.length === 8) return parseInt(hex, 16);
      return 255;
    }
  
    const matches = value.match(/\d+(\.\d+)?/g)?.map(Number) || [];
    if (matches.length === 3) matches.push(1);
    if (matches.length !== 4) return 255;
  
    const [r, g, b, a] = matches;
    const alpha = a <= 1 ? Math.round(a * 255) : Math.min(a, 255);
  
    return (alpha << 24) | (b << 16) | (g << 8) | r;
};


let ConteoPuertas = 0;
const PuertasMap: any = {};

export function CrearPuertaMovible(
    modelid: number,
    x: number, y: number, z: number,
    rx: number, ry: number, rz: number,
    worldid: number = -1,
    interiorid: number = -1,
    playerid: number = -1,
    streamdistance: number,
    drawdistance: number,
    faccion: number,
    faccion2: number,
    faccion3: number,
    trabajo: number,
    tipo: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    tiempo: number,
    veloc: number
): any {
    ConteoPuertas++;
    const pid = ConteoPuertas;

    PuertasMap[pid] = {};
    PuertasMap[pid]["pPos"] = [x, y, z];
    PuertasMap[pid]["pRot"] = [rx, ry, rz];
    PuertasMap[pid]["pMovRot"] = [rotX, rotY, rotZ];
    PuertasMap[pid]["pFaccion"] = faccion;
    PuertasMap[pid]["pFaccion2"] = faccion2;
    PuertasMap[pid]["pFaccion3"] = faccion3;
    PuertasMap[pid]["pTrabajo"] = trabajo;
    PuertasMap[pid]["pTipo"] = tipo;
    PuertasMap[pid]["pTiempo"] = tiempo;
    PuertasMap[pid]["pVelocidad"] = veloc;
	PuertasMap[pid]["pObjeto"] = new DynamicObject({
		modelId: modelid, x, y, z, rx, ry, rz,
	    worldId: worldid, interiorId: interiorid, playerId: playerid,
		streamDistance: streamdistance, drawDistance: drawdistance
	}).create();
    PuertasMap[pid]["pTimerCerrar"] = -1;

    return PuertasMap[pid]["pObjeto"];
}

export const PUERTAMAP_GARAGE = 1;
export const PUERTAMAP_BARRERA = 3;
export const PUERTAMAP_PUERTA = 2;
export const PUERTAMAP_CELDA = 5;
export const PUERTAMAP_PEAJE = 4;
export const TRABAJO_NULL = 0;
export const TRABAJO_CAMIONERO = 1;
export const TRABAJO_BASURERO = 2;
export const TRABAJO_TAXISTA = 3;
export const TRABAJO_PESCADOR = 4;
export const TRABAJO_DELINCUENTE = 5;
export const TRABAJO_MECANICO = 6;
export const TRABAJO_VALIJERO = 7;
export const TRABAJO_CERVECERO = 8;
export const TRABAJO_PIZZERO = 9;

export const FACCION_LSPD = 1;
export const FACCION_LSFD = 2;
export const FACCION_SD = 3;
export const FACCION_DOJ = 4;
export const FACCION_USMC = 5;
export const FACCION_LSCG = 6;

export const LoadMaps = () => {
	logger.info("[Maps] Objects and removes are loading...");

	LoadContainers();
	LoadOffices();
	LoadChinatown();
	LoadFD();
	LoadPrison();
	LoadSignsTransit();
};

export const RemovesMaps = (player: Player) => {
	RemovesChinatown(player);
	RemovesFD(player);
	RemovesPrison(player);
	RemovesSignsTransit(player);
};