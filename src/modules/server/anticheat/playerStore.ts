import { AC_Player, type AC_PlayerData } from "./constants";

export const defaultPlayerData: AC_PlayerData = {
  pCheat: -1,
  mobilePlayer: false,
  pSuspicious: false,
  pResponded: false,
  pCheckSum: -1,
};

export const getPlayerData = (playerId: number): AC_PlayerData => {
  return { ...defaultPlayerData, ...AC_Player.get(playerId) };
};

export const updatePlayerData = (
  playerId: number,
  newData: Partial<AC_PlayerData>
): void => {
  const currentData = getPlayerData(playerId);
  const updatedData = { ...currentData, ...newData };
  AC_Player.set(playerId, updatedData);
};
