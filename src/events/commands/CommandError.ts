import { PlayerEvent } from "@infernus/core";
import { showInfoForPlayer } from "@modules/filterscripts";
import { correctCommand } from "@modules/server/chat";


PlayerEvent.onCommandError(({ player, command, cmdText, buffer, strictMainCmd, noStrictMainCmd, hasStrict, hasNoStrict, subcommand, next, defaultValue }) => {
    
    const cmdName = command.split(" ")[0];

    correctCommand(cmdName).then(suggest => player.sendClientMessage(-1, suggest));
    showInfoForPlayer(player, "~w~El comando introducido no existe, usa ~g~/ayuda~w~.", 3000);

    next();
    return true;
});