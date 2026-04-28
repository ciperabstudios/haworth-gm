import { PlayerEvent, Player } from "@infernus/core";

PlayerEvent.onRequestClass(({ player, classId, next }) => {
    return next();
});
