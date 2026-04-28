import { Player } from "@infernus/core";
import { onIncomingPacket, onIncomingRPC, PacketRpcValueType } from "@infernus/raknet";
import { StaffChatService } from "@modules/staff";

// const MESSAGES_QUERY = new Set<string>();
const QUERY = new Set<string>();

const CheckQuery = (query: Set<string>, msg: string): void => {

    if (query.has(msg)) return;

    StaffChatService.sendAdminMessage(-1, msg);

    query.add(msg);

    setTimeout(() => { query.delete(msg) }, 4500);
}


/*
interface PR_JoinData {
    iVersion: number;
    byteMod: number;
    byteNickNameLen: number;
    nickName: string;
    uiClientChallengeResponse: number;
    byteAuthKeyLen: number;
    authKey: string;
    iClientVerLen: number;
    clientVersion: number;
}

const playerCheckSum = new Map<Player, number>();

onIncomingRPC(({ playerId, rpcId, bs, next }) => {

    const data: PR_JoinData = {
        iVersion:                  bs.readInt32() as number,
        byteMod:                   bs.readUint8() as number,
        byteNickNameLen:           bs.readUint8() as number,
        nickName:                  bs.readString(bs.readUint8() as number),
        uiClientChallengeResponse: bs.readUint32() as number,
        byteAuthKeyLen:            bs.readUint8() as number,
        authKey:                   bs.readString(bs.readUint8() as number),
        iClientVerLen:             bs.readUint8() as number,
        clientVersion:             Math.min(bs.readUint8() as number, 30)
    };


    if (rpcId === 25) {
        bs.readValue([PacketRpcValueType.String, data.clientVersion]);
        playerCheckSum.set(Player.getInstance(playerId)!, bs.readUint16() as number);
    }

    return next();
});
*/

onIncomingPacket(({ playerId, packetId, bs, next }) => {

    return next();

    /*
    const PlayerEmitter = Player.getInstance(playerId) as Player;


    // TODO: Mejorar esta validación. Un nombre común podría llegar a tener una longitud de 8 también.
    if (!PlayerEmitter.getScore() && PlayerEmitter.getName().length === 8) return next(); // Entrando al servidor con el nombre hasheado.

    if (packetId !== 212) return next(); // Preventivo.

    bs.ignoreBits(8);

    const SMART_INVIS_MESSAGE = `${PlayerEmitter.getName()} (${PlayerEmitter.id}) enviando paquetes ${packetId}, posible SmartInvis.`;

    CheckQuery(QUERY, SMART_INVIS_MESSAGE);
    */
});