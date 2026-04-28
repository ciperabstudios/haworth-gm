import type { Player } from "@infernus/core";
import { v4 as uuidv4 } from "uuid";

export const SERVER_VERSION = 0.1;
export const DEBUG_MODE = true;

export const pendingAuth = new Map<Player, string>();

export const getUUID = () => {
    return uuidv4();
};