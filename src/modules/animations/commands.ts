import Command from "@commands/Command";
import { ANIMATION_CATEGORIES, type AnimationCategory } from "@modules/animations/constants";
import { AnimationsService } from "@modules/animations/core";
import { AnimationsShowcase } from "./showcase";
import { SpecialActionsEnum } from "@infernus/core";
import { Colors } from "@modules/server/colors/constants";

new Command({
    name: "anim",
    description: "",
    aliases: ["emote"],
    run: async ({ player, subcommand, next }) => {
        
        if (!subcommand.at(0)) return next();

        const category = subcommand[0].toUpperCase() as AnimationCategory;

        if (!ANIMATION_CATEGORIES.includes(category)) return next();

        const anim = AnimationsService.getById(category, +subcommand[1] + 1);
        if (!anim) return next();

        const { library, name, vel, aLoop, lockX, lockY, freeze } = anim;

        player.applyAnimation(library, name, vel, !!aLoop, !!lockX, !!lockY, !!freeze);

        return next();
    }
});



new Command({
    name: "anims",
    description: "Muestra el listado de animaciones.",
    aliases: ["animaciones", "animslist"],
    run: async ({ player, subcommand, next }) => {

        await AnimationsShowcase.showAnimationList(player);
        
        return next();
    }
})



new Command({
    name: "stopanim",
    description: "Detiene todo tipo de animación.",
    aliases: ["pararanimacion", "pararanim"],
    
    run: async ({ player, subcommand, next }) => {

        if (player.isInAnyVehicle()) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes usar este comando en un vehículo.");
        
        if (AnimationsShowcase.isPlayerOn(player)) return next();

        // TODO: Adaptar esto:
        /*
        if (GetPVarInt(playerid, "EstaCrack") == 1) return ShowInfoForPlayer(playerid, "No puedes usar esto mientras estás herido.", SHOWINFO_TIME);
        if (GetPVarInt(playerid, "PlayerCuffed") != 0) return ShowInfoForPlayer(playerid, "No puedes usar esto en ese estado.", SHOWINFO_TIME);
        if (InfoPersonaje[playerid][pModoTalar] != -1) return ShowInfoForPlayer(playerid, "No puedes usar esto mientras trabajas de aserrador.", SHOWINFO_TIME);
        if (IsPlayerInAnyVehicle(playerid)) return ShowInfoForPlayer(playerid, "No puedes usar esto en un vehículo.", SHOWINFO_TIME);
        */

        player.setSpecialAction(SpecialActionsEnum.NONE);
        player.clearAnimations();

        return next();
    }
})