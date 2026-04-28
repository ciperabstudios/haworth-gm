import Command from "@commands/Command";
import { accountSessionService, characterSelectionService, characterSessionService, dialogAuthService, setCameraRandomLogin } from "@modules/server/auth";
import { ClearChat } from "@modules/server/chat";
import { Colors } from "@modules/server/colors";
import { DEBUG_MODE } from "@modules/server/config";
import { CustomPlayerEventTrigger, triggerLogin, triggerLogout } from "src/classes/events/CustomEvent";

new Command({
    name: "logout",
    description: "Cierra la sesión del personaje actual.",
    run: async ({ player, subcommand, next }) => {
        
        const sessionActive = 
            characterSessionService.isSessionActive(player) 
            && accountSessionService.isSessionActive(player)
            && player.account;

        if (!sessionActive) return player.sendClientMessage(Colors.LightRed, "No has iniciado sesión con un personaje aún.");

        ClearChat(player);
        player.sendClientMessage(Colors.Yellow, "Cerrando sesión, por favor espera...");

        player.toggleSpectating(true);
        setCameraRandomLogin(player);

        const user = player.account!;
        
        await triggerLogout(player);

        characterSessionService.closeSession(player);
        accountSessionService.closeSession(player);

        const character = await dialogAuthService.getCharacter(player, user);

        if (character === "RETURN_TO_PANEL") {
            await dialogAuthService.showPanel(player);
            return next();
        }

        const { interior, virtualWorld } = character.coordinates;
        const isPlayerOnInterior = interior !== 0 && virtualWorld !== 0;

        const selection = await characterSelectionService.selectCharacter(character);

        isPlayerOnInterior || DEBUG_MODE
            ? await selection.spawn(player)
            : await selection.playCinematic(player);

        player.toggleSpectating(false);

        await accountSessionService.setSession(player, user);
        await characterSessionService.setSession(player, character);

        await triggerLogin(player);

        return next();
    }
});