import { GameMode, Player, PlayerEvent } from "@infernus/core";
import {
  lastRetndata,
  rMemAddr,
  opcodes,
  MOBILE_CLIENT,
  type PR_JoinData,
  C_ERROR
} from "./constants";
import { Colors } from "@modules/server/colors";
import { autoSobCheck, kickPlayer, OnClientCheckResponse, rrAddress } from "./functions";
import { getPlayerData, updatePlayerData, defaultPlayerData } from "./playerStore";
import { BitStream, onIncomingRPC, PacketRpcValueType, RakNetNatives } from "@infernus/raknet";
import { logger } from "@logger";

PlayerEvent.onConnect(async ({ player, next }) => {
  try {
    lastRetndata.set(player.id, [0, 0]);

    updatePlayerData(player.id, defaultPlayerData);
    let playerData = getPlayerData(player.id);

    const playerVersion = player.getVersion();
    const playerAuth = player.gpci().val;

    if (playerAuth === MOBILE_CLIENT) {
      if (playerData.pCheckSum !== 0xBEEF) {
        updatePlayerData(player.id, { mobilePlayer: true, pResponded: true });
        playerData = getPlayerData(player.id);
      } else {
        player.sendClientMessage(
          Colors.WrongSintaxis,
          "[ERROR] There was a problem with the mobile version authentication, Your IP is temporarily blocked!"
        );
        setTimeout(() => kickPlayer(player, true), 1500);
      }
    }

    if (playerVersion.version === "0.3.7" && !playerData.mobilePlayer) {
      player.sendClientMessage(
        Colors.WrongSintaxis,
        "[ERROR] The server requires a client version newer than 0.3.7 R1!"
      );
      setTimeout(() => kickPlayer(player), 1500);
    }

    if (player.isUsingOmp()) {
      player.sendClientCheck(0x45, 0x3A9EB, 0, 0x4);
      player.sendClientCheck(0x45, 0x3AEB9, 0, 0x4);
    }

    player.sendClientCheck(0x47, 0, 0, 0x4);
    player.sendClientCheck(0x48, 0, 0, 0x4);

    for (let i = 0; i < 10; i++) {
      rMemAddr[i] = rrAddress(opcodes[i]);
      player.sendClientCheck(0x5, rMemAddr[i], 0, 0x4);
    }

    OnClientCheckResponse(player, 0x47, 0xCECECE, 256);
    OnClientCheckResponse(player, 0x48, 0xDEDEDE, 256);

    updatePlayerData(player.id, { pCheckSum: -1 });

    setTimeout(() => autoSobCheck(player), 2900);

    return next();

  } catch (error) {
    logger.error(error);
  }
});

PlayerEvent.onRequestClass(({ player, classId, next }) => {
  if (player.isUsingOmp()) {
    player.sendClientCheck(0x45, 0x3A9EB, 0, 0x4);
    player.sendClientCheck(0x45, 0x3AEB9, 0, 0x4);
  }
  return next();
});
// const data: PR_JoinData = {
//   PR_IVersionnumber,
//   PR_byteMod: bs.readUint8() as number,
//   PR_byteNicknameLen: bs.readUint8() as number,
//   PR_NickName: bs.readString(bs.readUint8() as number),
//   PR_uiClientChallengeResponse: bs.readUint32() as number,
//   PR_byteAuthKeyLen: bs.readUint8() as number,
//   PR_auth_key: bs.readString(bs.readUint8() as number),
//   PR_iClientVerLen: bs.readUint8() as number,
//   PR_ClientVersion: bs.readString(Math.min(bs.readUint8() as number, 30))
// };
onIncomingRPC(async ({ playerId, rpcId, bs, next }) => {
  try {
      if (rpcId === 25) {
      // creo que ya entendí XD

      const data: PR_JoinData = { 
        PR_IVersion: bs.readInt32() as number, 
        PR_byteMod: bs.readUint8() as number, 
        PR_byteNicknameLen: bs.readUint8() as number, 
        PR_NickName: bs.readString(bs.readUint8() as number), 
        PR_uiClientChallengeResponse: bs.readUint32() as number, 
        PR_byteAuthKeyLen: bs.readUint8() as number, 
        PR_auth_key: bs.readString(bs.readUint8() as number), 
        PR_iClientVerLen: bs.readUint8() as number, 
        PR_ClientVersion: bs.readString(Math.min(bs.readUint8() as number, 30)) 
      };
      const playerData = getPlayerData(playerId);
      // bs.readString(data.PR_ClientVersion, (data.PR_iClientVerLen >= 30 ? 30 : data.PR_iClientVerLen) as number);

      bs.readValue(PacketRpcValueType.UInt16, playerData?.pCheckSum || 0);
      // // después vemos qué es lo que almacena


      playerData.pCheckSum = bs.readUint16() as number;
      updatePlayerData(playerId, playerData);
    }

    return next();
    
  } catch (error) {
    logger.error(error);
  }
});