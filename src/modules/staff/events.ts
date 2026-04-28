import type { ObjectId } from "mongoose";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";
import { StaffService } from "./core";
import { staffRoleRepository } from "./repositories";

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    const account = player.account!;

    const role = await staffRoleRepository.findById(account.admin?.roleId as ObjectId);
    if (!role) return next();

    StaffService.setAdmin(player, { duty: account.admin!.duty, role });

    return next();
});