export const MOBILE_CLIENT = "ED40ED0E8089CC44C08EE9580F4C8C44EE8EE990";
export const VERS = "2.4";
export const C_GREEN = 0x20DD6AFF;
export const C_ERROR = 0xA01616FF;

export interface PR_JoinData {
    PR_IVersion: number;
    PR_byteMod: number;
    PR_byteNicknameLen: number;
    PR_NickName: string;
    PR_uiClientChallengeResponse: number;
    PR_byteAuthKeyLen: number;
    PR_auth_key: string;
    PR_iClientVerLen: number;
    PR_ClientVersion: string;
};

export interface AC_PlayerData {
    mobilePlayer?: boolean;
    pSuspicious?: boolean;
    pResponded?: boolean;
    pCheat?: number;
    pCheckSum?: number;
};

export const AC_Player = new Map<number, AC_PlayerData>();

export const lastRetndata = new Map<number, number[]>();

export const rMemAddr = new Uint32Array(10);

export const opcodes = new Uint32Array([
    0x06865E, 0xA88774, 0xDB6746, 0xFDB957, 0x52D558,
    0xE4FC58, 0x1BA246, 0xB0C56F, 0xF9855E, 0xF51D54
]);

export const MAX_ALLOWED_CLIENTS = 4; // //0.3.7-R3 , 0.3.7-R4 , 0.3.7-R5, 0.3.DL-R1

