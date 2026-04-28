/*
    ShowInfoForPlayer include by Richie©.
    Rewritten in @infernus library by Frank.
*/

import { Player, TextDraw } from "@infernus/core";

const infoText = new Map<Player, TextDraw>();


export const hideInfoForPlayer = (player: Player): boolean => {
    if (infoText.has(player)) {
        infoText.get(player)?.hide();
        infoText.get(player)?.destroy();
        infoText.delete(player);
        return true;
    }
    return false;
}

export const showInfoForPlayer = (player: Player, text: string, time?: number) => {
    function FixAlphaAndDeepenShadows(colour: number): number {
        // Extraer el canal alfa
        const alpha = colour & 0xFF;
    
        // Convertir a una fracción
        const n = alpha / 255;
    
        // Oscurecer el canal alfa
        const m = n * (2 - n);
    
        // Convertir de vuelta a un valor y limitar
        let finalAlpha = Math.round(m * 255);
        if (finalAlpha > 255) {
            finalAlpha = 255;
        }
    
        // Extraer los componentes RGB
        let red = (colour >> 16) & 0xFF;
        let green = (colour >> 8) & 0xFF;
        let blue = colour & 0xFF;
    
        // Intensificar sombras con un ajuste más agresivo
        const shadowThreshold = 150; // Aumentar el rango para considerar más colores oscuros
        const intensityFactor = 0.7; // Reducir más los valores
        const exponentialFactor = 2; // Para aplicar un ajuste no lineal
    
        if (red < shadowThreshold) {
            red = Math.max(0, Math.round(red ** exponentialFactor * intensityFactor));
        }
        if (green < shadowThreshold) {
            green = Math.max(0, Math.round(green ** exponentialFactor * intensityFactor));
        }
        if (blue < shadowThreshold) {
            blue = Math.max(0, Math.round(blue ** exponentialFactor * intensityFactor));
        }

        return (finalAlpha & 0xFF) | (red << 16) | (green << 8) | blue;
    }
    
    
    
    //const td = new TextDraw({ player, x: 319.999938, y: 401.955749, text, charset: "win1252" })
    const td = new TextDraw({ player, x: 327.000000, y: 365.000000, text, charset: "iso-8859-1" })
        .create();

    td
        .setLetterSize(0.298333, 1.376000)
        .setAlignment(2)
        .setColor(-1) // FixAlphaAndDeepenShadows(-1)
        .setShadow(0)
        .setBackgroundColors(255) //FixAlphaAndDeepenShadows(51)
        .setOutline(1)
        .setFont(1)
        .setProportional(true);


    if (infoText.has(player)) {
        infoText.get(player)?.destroy();
        infoText.delete(player);
    }

    infoText.set(player, td);

    td.show(player);

    if (time) setTimeout(() => hideInfoForPlayer(player), time);

    return true;
}