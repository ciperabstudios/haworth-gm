import Command from "@commands/Command";
import StaffCommand from "@commands/StaffCommand";
import Character from "@database/schemas/character";
import User from "@database/schemas/user";
import { Dialog, DialogStylesEnum, Player } from "@infernus/core";
import { setPlayerWaze, WazeEvent } from "@infernus/gps";
import { logger } from "@logger";
import { PaginatedDialog } from "@managers/PaginatedDialog";
import { showInfoForPlayer } from "@modules/filterscripts";
import { Colors } from "@modules/server/colors";
import { getMapZoneName3D, getStreetByID, getStreetName, StreetsData } from "@modules/server/streets";
import { setPlayerWoundState } from "@modules/wounds";


new StaffCommand({
    name: "testp",
    requiredFlag: "DEVELOPER",
    description: "",
    loggable: false,
    run: async ({ player, subcommand, next }) => {

        const data = Array.from({ length: 12 }, (_, i) => i.toString());

        const pDialog = new PaginatedDialog({
            style: "TABLIST",
            caption: "Prueba",
            info: data,
            button1: "X",
            button2: "O"
        }, { itemsPerPage: 10 });

        const { listItem, inputText } = await pDialog.show(player);

        return next();
    }
});


new StaffCommand({
  name: "givegun",
  requiredFlag: "DEVELOPER",
  loggable: true,
  description: "En desarrollo.",
  run: async ({ player, subcommand, next }) => {
    player.giveWeapon(+subcommand[0], 9999);

    return next();
  },
});

new StaffCommand({
  name: "asd",
  requiredFlag: "DEVELOPER",
  loggable: true,
  description: "En desarrollo.",
  run: async ({ player, next }) => {
    player.setHealth(100);
    player.setArmour(100);

    setPlayerWoundState(player, "healthy");

    return next();
  },
});




// GPS SYSTEM NEED TO BE IMPROVED; CURRENTLY WORK BUT NEEDS MORE TESTS AND FUNCTIONALITY.

new StaffCommand({
  name: "gps",
  requiredFlag: "DEVELOPER",
  loggable: true,
  description: "En desarrollo.",
  run: async ({ player, subcommand, next }) => {
    setPlayerWaze(
      player,
      1185.8658447265625,
      -1705.0086669921875,
      13.701447486877441,
      Colors.HotOrange,//"0x8a44e4ff",
      500
    );
    showInfoForPlayer(player, "GPS activado. Sigue las instrucciones en pantalla.", 60 * 1000); 
    return next();
  },
});

WazeEvent.onPlayerRouteFinish(
  ({ player, finishedRoute, next, defaultValue }) => {
    player.playSound(1054, 0.0, 0.0, 0.0);
    showInfoForPlayer(player, "~y~Has llegado a tu destino.", 3000);	
    return next();
  }
);

let lastUpdateTime = 0;
let currentStreet = "";
let nextStreet = "";

const evaluateTraffic = (player: Player, currentRoute: any): boolean => {
  const { fMaxX, fMaxY, fMinX, fMinY } = currentRoute.routes[0].getPos();
  const nearbyPlayers = Player.getInstances().filter(p => p !== player && p.isInRangeOfPoint(200, fMaxX, fMaxY, player.getPos().z));
  return nearbyPlayers.length > 5; // Assuming traffic if more than 5 players are nearby
};



interface IStreetData {
  name: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

type Zone = {
  name: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
};


// Calculate street length based on its coordinates
export const calculateStreetLength = ({ minX, minY, maxX, maxY }: IStreetData): number =>
  Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);

// Check if a point is inside a zone
export const isPointInZone = (x: number, y: number, z: number, zone: Zone): boolean =>
  x >= zone.minX && x <= zone.maxX && y >= zone.minY && y <= zone.maxY && z >= zone.minZ && z <= zone.maxZ;

// Get zone name based on player coordinates
export const getPlayerZone = (x: number, y: number, z: number): string | null => {
  return getMapZoneName3D(x, y, z);
};

// Assign speed limit based on street length and zone
export const assignSpeedLimit = (length: number, zone: string | null): number => {
  const limits: Record<string, (length: number) => number> = {
    "Los Santos": (len) => (len < 100 ? 50 : len < 500 ? 80 : 100),
    "Las Venturas": (len) => (len < 200 ? 60 : len < 800 ? 90 : 120),
    "Countryside": (len) => (len < 300 ? 70 : 110),
  };

  return limits[zone || "default"]?.(length) || 50;
};

// Process street: calculates length, determines zone, and assigns speed limit
export const processStreet = (streetId: number, playerX: number, playerY: number, playerZ: number) => {
  const street = getStreetByID(streetId);
  if (!street) return { error: "Street not found" };

  const length = calculateStreetLength(street);
  const zone = getPlayerZone(playerX, playerY, playerZ);
  const speedLimit = assignSpeedLimit(length, zone);

  return {
    streetName: street.name,
    zone: zone || "Unknown zone",
    length: length.toFixed(2),
    speedLimit,
  };
};



// TODO: Cambiar el showInfoForPlayer por algún pop-up
// o diseñar algún TextDraw para mostrar la información. (@infernus/cef - maybe).

WazeEvent.onPlayerRouteUpdate(
  async ({ player, currentRoute, next }) => {
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime < 5000) { // Update every 5 seconds
      return next();
    }
    lastUpdateTime = currentTime;

    const { fMaxX, fMaxY, fMinX, fMinY } = currentRoute.routes[0].getPos();
    const streetName = getStreetName(fMinX, fMaxY/*, player.getPos().z*/);
    const veh = player?.getVehicle();
    const vehSpeed = veh?.getSpeed() || 50;

    if (streetName !== currentStreet) {
      currentStreet = streetName;

     // const distance = Math.sqrt((fMaxX - fMinX) ** 2 + (fMaxY - fMinY) ** 2);
      const GetPlayerDistanceFromPoint = (
      playerId: number,
      X: number,
      Y: number,
      Z: number,
    ): number => {
      return samp.callNativeFloat(
        "GetPlayerDistanceFromPoint",
        "ifff",
        playerId,
        X,
        Y,
        Z,
      );
    };
      const distanceToDestination = GetPlayerDistanceFromPoint(player.id, 1185.8658447265625, -1705.0086669921875, 13.701447486877441);
      const estimatedTimeToDestination = (distanceToDestination / vehSpeed).toFixed(2);
      player.sendClientMessage(-1, `Distancia al destino: ${distanceToDestination.toFixed(2)} metros. Tiempo estimado: ${estimatedTimeToDestination} minutos.`);

      const instructions = [
        `Dirígete por ~y~${streetName}~w~. Distancia: ~y~${distanceToDestination.toFixed(2)} ~w~metros. Tiempo estimado: ~y~${estimatedTimeToDestination} ~w~minutos.`,
        `Continúa por ~y~${streetName} ~w~y gira a la siguiente intersección.`,
        `Sigue recto por ~y~${streetName}~w~ y mantente a la derecha.`,
        `Gira a la izquierda en la próxima intersección para continuar por ~y~${streetName}~w~.`
      ];

      const randomInstruction = instructions[Math.floor(Math.random() * instructions.length)];
      showInfoForPlayer(player, randomInstruction, 60 * 1000);

      // Notify the user of the speed limit on the current street
      const streetData = StreetsData.find(street => street.name === streetName);
      if (streetData) {
        const { x, y, z } = player.getPos();

        const streetLength = calculateStreetLength(streetData);
        const zone = getPlayerZone(x, y, z);
        const speedLimit = assignSpeedLimit(streetLength, zone);
        player.sendClientMessage(Colors.Red2, `Límite de velocidad en ${streetName}: ${speedLimit} km/h`);
      }
    }

    // Check if the player is near the next street
    const nextStreetName = getStreetName(fMaxX, fMaxY/*, player.getPos().z*/);
    if (nextStreetName !== nextStreet && nextStreetName !== currentStreet) {
      nextStreet = nextStreetName;
      showInfoForPlayer(player, `Próxima calle: ~y~${nextStreet}`, 60 * 1000);
    }

    // Evaluate traffic
    if (evaluateTraffic(player, currentRoute)) {
      showInfoForPlayer(player, "Hay tráfico en tu ruta. Considera tomar una ruta alternativa.", 60 * 1000);
    }

    return next();
  }
);


/* 
new StaffCommand({
  name: "createhome",
  requiredFlag: "DEVELOPER",
  loggable: true,
  description: "En desarrollo.",
  run: async ({ player, subcommand, next }) => {
    if (!player.isSpawned()) return next();

    const { x, y, z } = player.getPos();
    const [int, vw] = [player.getInterior(), player.getVirtualWorld()];

    new HouseManager().create({
      isClosed: true,
      forSale: {
        available: true,
        price: 300,
      },
      coordinates: {
        exterior: { x, y, z, int, vw },
        interior: { int: 10 },
      },
    });

    return next();
  },
}) */


new StaffCommand({
  name: "changename",
  requiredFlag: "DEVELOPER",
  loggable: true,
  description: "",
  run: async ({ player, subcommand, next, success }) => {

    if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /changename Nombre_Apellido");

    // /^[A-Z][a-z]+_[A-Z][a-z]+$/g

    const newName = subcommand[0];

    if (!(/^[A-Z][a-z]+_[A-Z][a-z]+$/g.test(newName))) return player.sendClientMessage(Colors.WrongSintaxis, "Formato inválido. Tiene que ser Nombre_Apellido.");

    try {
      await Character.findOneAndUpdate({ ID: player.dbId }, { name: newName });

      player.setName(newName);
      player.sendClientMessage(Colors.Green, "Nombre cambiado con éxito.");
      success();

    } catch (error) {
      logger.error(error);
    }

    return next();
  }
});





new StaffCommand({
  name: "changeaccountname",
  requiredFlag: "DEVELOPER",
  loggable: true,
  description: "",
  run: async ({ player, subcommand, next }) => {

    if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /changename [NombreCuenta]");

    const newAccountName = subcommand[0];

    if (newAccountName.length < 3) return player.sendClientMessage(Colors.WrongSintaxis, "El nombre de la cuenta no puede ser de menos de 3 caracteres.");
    if (newAccountName.length > 20) return player.sendClientMessage(Colors.WrongSintaxis, "El nombre de la cuenta no puede ser de más de 20 caracteres.");


    try {
      await User.findOneAndUpdate({ id: player.accountId }, { name: newAccountName });
      player.accountName = newAccountName;

      player.sendClientMessage(Colors.Green, "Nombre de cuenta cambiado con éxito.");

    } catch (error) {
      logger.error(error);
    }

    return next();
  }
});