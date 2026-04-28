import { Colors } from "@modules/server/colors";
import { StaffService } from "@modules/staff/core";
import { PlayerEvent } from "@infernus/core";

PlayerEvent.onClickMap(async ({player, fX, fY, fZ, next }) => {
    
    if (!StaffService.hasPermissionFlag(player, "TELEPORTS")) return next();

    player.setPosFindZ(fX, fY, fZ);

    player.sendClientMessage(Colors.Orange, `Te has teletransportado a la posición marcada. (x: ${fX}, y: ${fY}, z: ${fZ})`);

    return next();
});