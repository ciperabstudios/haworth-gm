import { GameMode } from "@infernus/core";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";

/* const loadHaworthLogo = () => {
    const logoTd = new TextDraw({ x: 569, y: 368, text: "mdl-2001:haworth_logo" });

    logoTd.create();

    logoTd
        .setFont(4)
        .setLetterSize(0.6, 2)
        .setTextSize(64, 73.5)
        .setOutline(0)
        .setShadow(0)
        .setAlignment(1)
        .setColor(-1)
        .setBackgroundColors(255)
        .setBoxColors(50)
        .useBox(false)
        .setProportional(true)
        .setSelectable(false);

    return logoTd;
}
 */
GameMode.onInit(async ({ next }) => {

    // Logo (bottom-right corner).
    //GameMode.addSimpleModel(-1, 19379, -2001, "haworth/wallzzz.dff", "haworth/haworth_logo.txd");

    return next();
});

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    /* 

    const logoTd = loadHaworthLogo();
    logoTd.show(player); */


    return next();
});