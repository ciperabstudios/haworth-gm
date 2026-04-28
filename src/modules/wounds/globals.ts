import { BodyPartsEnum, Player, WeaponEnum } from "@infernus/core";


/*
[*] https://www.open.mp/docs/scripting/resources/bodyparts

3	Torso
4	Groin
5	Left arm
6	Right arm
7	Left leg
8	Right leg
9	Head
*/


export interface IWoundsData {
    issuer:   Player | number;
    bodyPart: BodyPartsEnum;
    weapon:   WeaponEnum; // TODO: Añadir modelos custom.
    damage:   number;
};


type TPlayerVitals = {
    health: number;
    kevlar: number;
}


interface IDamageInfo {
    issuer: Player;
    receivedDamage: number;
    before: TPlayerVitals;
    after: TPlayerVitals;
};



// Información general (vitales y daño recibido).
export const playerHealthArmor = new Map<Player, TPlayerVitals>();
export const playerDamageReceived = new Map<Player, IDamageInfo[]>();


// Heridas.
export const injuredUsers = new Set<Player>();
export const userWounds = new Map<Player, IWoundsData[]>();
export const userInjuriesLog = new Map<Player, Omit<IWoundsData, "damage">[]>();


// Muertes.
export const deadUsers = new Set<Player>();
export const userDeathLog = new Map<Player, Player[]>();


// Posibles casos de cheats.
export const suspiciousUsers = new Set<Player>();


// TODO: Mover
export const playerMessagesQuery = new Map<Player, string>();
export const checkMessagesQueryForPlayer = ({ player, message }: { player: Player, message: string }) => {

    if (playerMessagesQuery.has(player)) return;

    player.sendClientMessage(-1, message);
    playerMessagesQuery.set(player, message);

    setTimeout(() => playerMessagesQuery.delete(player), 5000);
}
