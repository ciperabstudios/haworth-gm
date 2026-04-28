import { logger } from "@logger";
import { GameMode, Player, TextDraw } from "@infernus/core";
import { Colors } from "@modules/server/colors";

const MAX_FADES = 5;

interface Fade {
  interval: NodeJS.Timeout | null;
  flash: boolean;
  flashTimes: number;
  color: number;
  textDraw: TextDraw | null;
}

const fades = new Map<Player, Fade[]>();

const initializePlayerFades = (player: Player) => {
  if (!fades.has(player)) {
    fades.set(
      player,
      Array.from({ length: MAX_FADES }, () => ({
        interval: null,
        flash: false,
        flashTimes: 0,
        color: 0,
        textDraw: null,
      }))
    );
  }
};

const findFadeID = (player: Player): number => {
  const playerFades = fades.get(player) || [];
  for (let i = 0; i < MAX_FADES; i++) {
    if (!playerFades[i]?.interval) return i;
  }
  return -1;
};

const getAlpha = (color: number) => color & 0xFF;

export const fadePlayerScreen = (
  player: Player,
  color: number,
  speed: number,
  wipeOtherFades = true
): number => {
  initializePlayerFades(player);

  if (wipeOtherFades) removePlayerFades(player);

  const fadeID = findFadeID(player);
  if (fadeID === -1) return -1;

  const playerFades = fades.get(player)!;
  const maxAlpha = getAlpha(color);
  let currentAlpha = maxAlpha;
  let td: TextDraw | null = null;

  const updateTextDraw = (alpha: number) => {
    const newColor = (color & 0xFFFFFF00) | Math.max(0, Math.round(alpha));
    td?.destroy();
    td = new TextDraw({ player, x: 0.0, y: 0.0, text: "_" })
      .create()
      .setFont(1)
      .setLetterSize(0.0, 50.0)
      .useBox(true)
      .setColor(Colors.Black)
      .setBoxColors(newColor)
      .show(player);
  };

  // Ensure the initial color is black with full opacity
  updateTextDraw(currentAlpha);

  playerFades[fadeID].interval = setInterval(() => {
    currentAlpha = Math.max(0, currentAlpha - speed);
    updateTextDraw(currentAlpha);

    if (currentAlpha <= 0) {
      td?.destroy();
      clearInterval(playerFades[fadeID].interval!);
      playerFades[fadeID].interval = null;
      // Callback when fade finishes
      onPlayerScreenFade(player, color, speed);
    }
  }, 50);

  return fadeID;
};

export const fadePlayerScreenToColor = (
  player: Player,
  color: number,
  speed: number
): number => {
  initializePlayerFades(player);

  const fadeID = findFadeID(player);
  if (fadeID === -1) return -1;

  const playerFades = fades.get(player)!;
  const maxAlpha = getAlpha(color);
  let currentAlpha = 0;
  let td: TextDraw | null = null;

  const updateTextDraw = (alpha: number) => {
    const newColor = (color & 0xFFFFFF00) | Math.min(255, Math.round(alpha));
    td?.destroy();
    td = new TextDraw({ player, x: 0.0, y: 0.0, text: "_" })
      .create()
      .setFont(1)
      .setLetterSize(0.0, 50.0)
      .useBox(true)
      .setColor(Colors.Black)
      .setBoxColors(newColor)
      .show(player);
  };

  // Ensure the initial color is black with no opacity
  updateTextDraw(currentAlpha);

  playerFades[fadeID].interval = setInterval(() => {
    currentAlpha = Math.min(255, currentAlpha + speed);
    updateTextDraw(currentAlpha);

    if (currentAlpha >= 255) {
      td?.destroy();
      clearInterval(playerFades[fadeID].interval!);
      playerFades[fadeID].interval = null;
      // Callback when fade finishes
      onPlayerScreenColorFade(player, color, speed);
    }
  }, 50);

  return fadeID;
};

export const flashPlayerScreen = (
  player: Player,
  color: number,
  speed: number,
  times: number
): number => {
  initializePlayerFades(player);

  const fadeID = findFadeID(player);
  if (fadeID === -1) return -1;

  const playerFades = fades.get(player)!;
  playerFades[fadeID].flash = true;
  playerFades[fadeID].flashTimes = times;
  playerFades[fadeID].color = color;

  const updateTextDraw = (alpha: number) => {
    const newColor = (color & 0xFFFFFF00) | Math.min(255, Math.round(alpha));
    playerFades[fadeID].textDraw?.destroy();
    playerFades[fadeID].textDraw = new TextDraw({ player, x: 0.0, y: 0.0, text: "_" })
      .create()
      .setFont(1)
      .setLetterSize(0.0, 50.0)
      .useBox(true)
      .setColor(Colors.Black)
      .setBoxColors(newColor)
      .show(player);
  };

  const flashInterval = () => {
    let currentAlpha = 0;
    playerFades[fadeID].interval = setInterval(() => {
      currentAlpha = Math.min(255, currentAlpha + speed);
      updateTextDraw(currentAlpha);

      if (currentAlpha >= 255) {
        clearInterval(playerFades[fadeID].interval!);
        playerFades[fadeID].interval = setInterval(() => {
          currentAlpha = Math.max(0, currentAlpha - speed);
          updateTextDraw(currentAlpha);

          if (currentAlpha <= 0) {
            playerFades[fadeID].flashTimes--;
            if (playerFades[fadeID].flashTimes <= 0) {
              playerFades[fadeID].textDraw?.destroy();
              clearInterval(playerFades[fadeID].interval!);
              playerFades[fadeID].interval = null;
              // Callback when flash finishes
              onPlayerFadeFlashed(player, color, speed);
            } else {
              clearInterval(playerFades[fadeID].interval!);
              flashInterval();
            }
          }
        }, 50);
      }
    }, 50);
  };

  flashInterval();

  return fadeID;
};

export const removePlayerFades = (player: Player) => {
  const playerFades = fades.get(player) || [];
  for (const fade of playerFades) {
    if (fade.interval) clearInterval(fade.interval);
    fade.interval = null;
    fade.textDraw?.destroy();
  }
};

// Callbacks
const onPlayerScreenFade = (player: Player, color: number, speed: number) => {
  // Implement callback logic here
};

const onPlayerScreenColorFade = (player: Player, color: number, speed: number) => {
  // Implement callback logic here
};

const onPlayerFadeFlashed = (player: Player, color: number, speed: number) => {
  // Implement callback logic here
};

GameMode.onInit(({ next }) => {
  logger.info("[INCLUDE] Seifader loaded.");
  return next();
});
