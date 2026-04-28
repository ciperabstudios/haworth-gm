import { TextDrawEvent } from "@infernus/core";


TextDrawEvent.onPlayerClickGlobal(async ({ player, textDraw, next, defaultValue }) => {
    return next();
});


TextDrawEvent.onPlayerClickPlayer(async ({ player, textDraw, next, defaultValue }) => {
    return next();
});
