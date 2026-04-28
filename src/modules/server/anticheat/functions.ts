import { GameMode, Player, PlayerEvent } from "@infernus/core";
import { AC_Player, lastRetndata, rMemAddr } from "./constants";
import { getPlayerData, updatePlayerData } from "./playerStore";
import { set } from "mongoose";
import { Colors } from "@modules/server/colors";
import { logger } from "@logger";

export const kickPlayer = (player: Player, temp?: boolean) => {
    if (!temp) return player.kick();
    return GameMode.blockIpAddress(player.getIp().ip, 60 * 3000);
};

export const rrAddress = (input: number): number => {
    let result: number = 0;

    result = ((input & 0xFF) << 16) >>> 0;
    result += (input & 0xFF00) >>> 0;
    result += ((input & 0xFF0000) >> 16) >>> 0;

    return result >>> 0;
};

export const cheatDetected = (player: Player, cheatName: string) => {
  player.sendClientMessage(Colors.WrongSintaxis, `[HW-AC] El sistema ha detectado que estás utilizando ${cheatName}. Remuévelo y vuelve a ingresar al servidor.`);
  setTimeout(() => kickPlayer(player), 1500);
}


PlayerEvent.onCheckResponse(async ({ player, actionId, memAddr, data, next }) => {
  try {
    const playerData = getPlayerData(player.id);
    if (!playerData) return;

    if (!lastRetndata.has(player.id)) {
      lastRetndata.set(player.id, [0, 0]);
    }

    switch (actionId) {
      case 0x5: {
        if (!playerData.mobilePlayer) {
          updatePlayerData(player.id, { pResponded: true });
        }

        const standardChecks = [
          { addr: rMemAddr[0], expected: 192, cheat: 1 },
          { addr: rMemAddr[1], expected: 72,  cheat: 2 },
          { addr: rMemAddr[2], expected: 192, cheat: 3 },
          { addr: rMemAddr[3], expected: 68,  cheat: 4 },
          { addr: rMemAddr[4], expected: 196, cheat: 5 },
          { addr: rMemAddr[5], expected: 64,  cheat: 6 },
          { addr: rMemAddr[6], expected: 8,   cheat: 7 },
          { addr: rMemAddr[7], expected: 200, cheat: 8 },
          { addr: rMemAddr[8], expected: 200, cheat: 9 },
          { addr: rMemAddr[9], expected: 128, cheat: 10 },
        ];

        standardChecks.forEach((check) => {
          if (memAddr === check.addr && data !== check.expected) {
            updatePlayerData(player.id, { pCheat: check.cheat });
          }
        });

        if (player.isUsingOmp()) {
          const ompChecks: { [addr: number]: { index: number } } = {
            0x3A9EB: { index: 0 },
            0x3AEB9: { index: 1 },
          };

          const ompEntry = ompChecks[memAddr];
          if (ompEntry) {
            const lastData = lastRetndata.get(player.id);
            if (lastData) {
              const idx = ompEntry.index;
              if (lastData[idx] === 0) {
                lastData[idx] = data;
              } else if (lastData[idx] !== data) {
                updatePlayerData(player.id, { pCheat: 11 });
              }
            }
          }
        }
        break;
      }

      case 0x47: {
        const checks = [
          {
            condition: !playerData.mobilePlayer && memAddr === 0x0 && data !== 256,
            update: { pSuspicious: false },
          },
          {
            condition: !playerData.mobilePlayer && memAddr === 0xCECECE && data === 256,
            update: { pSuspicious: true },
            sendCheck: { action: 0x47, params: [0, 0, 0x4] as [number, number, number] },
          },
        ];

        checks.forEach((chk) => {
          if (chk.condition) {
            updatePlayerData(player.id, chk.update);
            if (chk.sendCheck) {
              player.sendClientCheck(chk.sendCheck.action, ...chk.sendCheck.params);
            }
          }
        });
        break;
      }

      case 0x48: {
        const checks = [
          {
            condition: !playerData.mobilePlayer && memAddr !== 0xDEDEDE && data === 0,
            update: { pSuspicious: false },
          },
          {
            condition: !playerData.mobilePlayer && memAddr === 0xDEDEDE && data === 256,
            update: { pSuspicious: true },
            sendCheck: { action: 0x48, params: [0, 0, 0x4] as [number, number, number] },
          },
        ];

        checks.forEach((chk) => {
          if (chk.condition) {
            updatePlayerData(player.id, chk.update);
            if (chk.sendCheck) {
              player.sendClientCheck(chk.sendCheck.action, ...chk.sendCheck.params);
            }
          }
        });
        break;
      }

      default:
        break;
    }

    return next();

  } catch (error) {
    logger.error(error);
  }


});


export const OnClientCheckResponse = (
  player: Player,
  actionId: number,
  memAddr: number,
  retndata: number
) => {
  const playerData = getPlayerData(player.id);
  if (!playerData) return;

  if (!lastRetndata.has(player.id)) {
    lastRetndata.set(player.id, [0, 0]);
  }

  switch (actionId) {
    case 0x5: {
      if (!playerData.mobilePlayer) {
        updatePlayerData(player.id, { pResponded: true });
      }

      const standardChecks = [
        { addr: rMemAddr[0], expected: 192, cheat: 1 },
        { addr: rMemAddr[1], expected: 72,  cheat: 2 },
        { addr: rMemAddr[2], expected: 192, cheat: 3 },
        { addr: rMemAddr[3], expected: 68,  cheat: 4 },
        { addr: rMemAddr[4], expected: 196, cheat: 5 },
        { addr: rMemAddr[5], expected: 64,  cheat: 6 },
        { addr: rMemAddr[6], expected: 8,   cheat: 7 },
        { addr: rMemAddr[7], expected: 200, cheat: 8 },
        { addr: rMemAddr[8], expected: 200, cheat: 9 },
        { addr: rMemAddr[9], expected: 128, cheat: 10 },
      ];

      standardChecks.forEach((check) => {
        if (memAddr === check.addr && retndata !== check.expected) {
          updatePlayerData(player.id, { pCheat: check.cheat });
        }
      });
      break;
    }

    case 0x45: {
      if (player.isUsingOmp()) {
        const ompChecks: { [addr: number]: { index: number } } = {
          0x3A9EB: { index: 0 },
          0x3AEB9: { index: 1 },
        };

        const ompEntry = ompChecks[memAddr];
        if (ompEntry) {
          const lastData = lastRetndata.get(player.id);
          if (lastData) {
            const idx = ompEntry.index;
            if (lastData[idx] === 0) {
              lastData[idx] = retndata;
            } else if (lastData[idx] !== retndata) {
              updatePlayerData(player.id, { pCheat: 11 });
            }
          }
        }
      }
      break;
    }

    case 0x47: {
      if (!playerData.mobilePlayer && memAddr === 0x0 && retndata !== 256) {
        updatePlayerData(player.id, { pSuspicious: false });
      }

      if (!playerData.mobilePlayer && memAddr === 0xCECECE && retndata === 256) {
        updatePlayerData(player.id, { pSuspicious: true });
        player.sendClientCheck(0x47, 0, 0, 0x4);
      }
      break;
    }

    case 0x48: {
      if (!playerData.mobilePlayer && memAddr !== 0xDEDEDE && retndata === 0) {
        updatePlayerData(player.id, { pSuspicious: false });
      }

      if (!playerData.mobilePlayer && memAddr === 0xDEDEDE && retndata === 256) {
        updatePlayerData(player.id, { pSuspicious: true });
        player.sendClientCheck(0x48, 0, 0, 0x4);
      }
      break;
    }

    default:
      break;
  }
};


export const autoSobCheck = async (player: Player) => {
  const playerData = getPlayerData(player.id);
  if (!playerData) return;

  if (playerData.mobilePlayer) {
    player.sendClientMessage(Colors.Green4, "You’re currently playing the mobile version of SA-MP.");
  }

  if (playerData.pSuspicious) {
    player.sendClientMessage(Colors.WrongSintaxis, "[ERROR] System has detected that you are probably using some mods. If you think this is a mistake, please contact the Admin.");
    setTimeout(() => kickPlayer(player), 1500);
  }

  if (!playerData.pResponded) {
    player.sendClientMessage(Colors.WrongSintaxis, "[ERROR] System has detected that you are probably using some mods. If you think this is a mistake, please contact the Admin.");
    setTimeout(() => kickPlayer(player), 1500);
  }

  const cheatNames: Record<number, string> = {
    1: "S0beit",
    2: "CLEO",
    3: "CLEO",
    4: "CLEO",
    5: "CLEO",
    6: "CLEO",
    7: "CLEO",
    8: "SilentPatch",
    9: "SampFuncs",
    10: "S0beit",
    11: "S0beit",
  };

  const cheatCode = playerData.pCheat;
  if (cheatCode !== undefined && cheatNames[cheatCode]) {
    cheatDetected(player, cheatNames[cheatCode]);
  }
};