import { defineEvent, Player } from "@infernus/core";

type PreHook = (player: Player) => Promise<void>;

const [onDialogOpened, onDialogOpenedTrigger] = defineEvent({
    isNative: false,
    name: "OnPlayerDialogOpened",

    beforeEach(player: Player, dialogOpened: boolean) {
        return { player, dialogOpened };
    },
});


const [onLogin, onLoginTrigger] = defineEvent({
    isNative: false,
    name: "OnPlayerLogin",

    beforeEach(player: Player) {
        return { player };
    }
});



const loginPreHooks: PreHook[] = [];
export const registerLoginPreHook = (hook: PreHook) => loginPreHooks.push(hook);
export const triggerLogin = async (player: Player) => {
    for (const hook of loginPreHooks) {
        await hook(player);
    }

    onLoginTrigger(player);
}


const [onLogout, onLogoutTrigger] = defineEvent({
    isNative: false,
    name: "OnPlayerLogout",

    beforeEach(player: Player) {
        return { player };
    }
});



const logoutPreHooks: PreHook[] = [];
export const registerLogoutPreHook = (hook: PreHook) => logoutPreHooks.push(hook);
export const triggerLogout = async (player: Player) => {
    for (const hook of logoutPreHooks) {
        await hook(player);
    }

    onLogoutTrigger(player);
}


export const CustomPlayerEventTrigger = Object.freeze({
    onDialogOpened: onDialogOpenedTrigger,
    //onLogin: onLoginTrigger,
    //onLogout: onLogoutTrigger
});


export const CustomPlayerEvent = Object.freeze({
    onDialogOpened,
    onLogin,
    onLogout
});