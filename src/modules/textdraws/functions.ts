import { Player, TextDraw } from "@infernus/core";
import { pFocusTextDrawMap, pSolidChatTextDrawMap } from "./globals";
import { rgbaToHex } from "@modules/server/colors";
import { Sleep } from "@modules/server/assets";


export const createSolidChatTextDraw = (player: Player, color: string = "#000000") => {
    const solidChatTextDraw = new TextDraw({ player, x: 759.599975, y: -99.299995, text: "_" });
    solidChatTextDraw.create();

    solidChatTextDraw
    .setLetterSize(0, 79.7)
    .setTextSize(-266, 0)
    .useBox(true)
    .setBoxColors(color)
    .show();

    return solidChatTextDraw;
};


export const destroyTextDrawIfExists = (player: Player) => {
    if (!pSolidChatTextDrawMap.has(player)) return;

    pSolidChatTextDrawMap.get(player)?.destroy();
    pSolidChatTextDrawMap.delete(player);
};


export const CreateFocusTextDraw = (player: Player) => {

    const blankTextdraw = new TextDraw({ player, x: 759.599975, y: -99.299995, text: "_" });
    blankTextdraw.create();

    blankTextdraw
        .setLetterSize(0, 79.7)
        .setTextSize(-266, 0)
        .useBox(true)
        .setBoxColors("#0000007f")
        .show();

    return blankTextdraw;
};

export const SetPlayerDialogFocus = (player: Player) => {
    if (pFocusTextDrawMap.has(player)) return;

    pFocusTextDrawMap.set(player, CreateFocusTextDraw(player));
};

export const RemovePlayerDialogFocus = (player: Player) => {
    if (!pFocusTextDrawMap.has(player)) return;

    pFocusTextDrawMap.get(player)?.destroy();
    pFocusTextDrawMap.delete(player);
};


export const FadeInDialog = async (player: Player) => {
    
    const blankTextdraw = new TextDraw({ player, x: 759.599975, y: -99.299995, text: "_" });
    blankTextdraw.create();

    const FADE_TIME = 50;
    const MAX_FADE = 65;

    // Cubic easing function
    function easeOutCubic(t: number) {
        return 1 - Math.pow(1 - t, 3);
    }

    for (let t = 0; t <= FADE_TIME; t++) {
        const OPACITY = Math.max(0, MAX_FADE * easeOutCubic(t / FADE_TIME));
        const COLOR = rgbaToHex(0, 0, 0, OPACITY);
        
        blankTextdraw
        .setLetterSize(0, 79.7)
        .setTextSize(-266, 0)
        .useBox(true)
        .setBoxColors(COLOR)
        .show();

        await Sleep(8);
    };

    return blankTextdraw;
};