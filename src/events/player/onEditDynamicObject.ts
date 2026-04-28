import { DynamicObjectEvent } from "@infernus/core";

DynamicObjectEvent.onPlayerEdit(({ player, object, response, x, y, z, rX, rY, rZ, next }) => {
    return next();
});