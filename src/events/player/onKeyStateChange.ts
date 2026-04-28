import Command from "@commands/Command";
import { PlayerEvent, PlayerStateEnum } from "@infernus/core";
/* import type { KeyBits, KeyStates } from "@modules/keys/constants";
import { KeyUtils } from "@modules/keys/functions";
 */
const cmdActions = {
    onFoot: {
        "openInv": "pockets",
        // ...
    },

    inVehicle: {
        "engineVehicle": "motor",
        "lightsVehicle": "luces",
        // ...
    }
};

PlayerEvent.onKeyStateChange(async ({ player, newKeys, oldKeys, next }) => {

/*     const state: KeyStates = player.getState() === PlayerStateEnum.ONFOOT ? "onFoot" : "inVehicle";
    const action = KeyUtils.getPlayerActionFromKeyBits(player, state, newKeys as KeyBits);

    if (!action) return next();

    Command.callCommand(player, cmdActions[state][action as keyof typeof cmdActions[typeof state]]);
 */
    return next();
});
