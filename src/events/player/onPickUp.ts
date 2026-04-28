import { DynamicPickupEvent } from "@infernus/core";

DynamicPickupEvent.onPlayerPickUp(({ player, pickup, next }) => {
    return next();
})