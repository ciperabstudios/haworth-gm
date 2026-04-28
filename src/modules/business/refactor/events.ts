import { DynamicCheckPointEvent, DynamicPickupEvent } from "@infernus/core";
import { businessCacheRepo, businessPickupService, businessService } from "./core";
import { BusinessFormatter } from "./formatters";
import { showInfoForPlayer } from "@modules/filterscripts/showInfoForPlayer";

DynamicPickupEvent.onPlayerPickUp(async ({ player, pickup, next }) => {
    const ref = businessPickupService.getBusinessByPickupId(pickup.id);
    if (!ref) return next();

    const business = await businessCacheRepo.findById(ref.businessId);
    if (!business) return next();

    const text = ref.type === "interior"
                    ? BusinessFormatter.getInteriorText(business)
                    : BusinessFormatter.getExteriorText(business, business.owner === player.getName().name);

    showInfoForPlayer(player, text, 3000);

    return next();
});


DynamicCheckPointEvent.onPlayerEnter(async ({ player, cp, next, defaultValue }) => {
    return next();
});