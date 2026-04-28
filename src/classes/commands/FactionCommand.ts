import { Colors } from "@modules/server/colors";
import { PlayerEvent, type CmdBusCallback } from "@infernus/core";
import Command, { type CommandStructure } from "./Command";
import { factionService, type Faction, type FactionPermissionString, type IFactionRoleMember } from "@modules/factions";
import { commandPerms } from "@modules/server/auth";

interface FactionCmdBusCallback extends CmdBusCallback {
    faction: Faction;
    member: IFactionRoleMember;
}

type FactionRunFunction = (params: FactionCmdBusCallback) => Promise<boolean | number | void> | boolean | number | void;

interface FactionCommandStructure extends Omit<CommandStructure, 'run'> {
    run: FactionRunFunction;

    /* Permisos granulares. */
    requiredPermission: FactionPermissionString;
}



export default class FactionCommand extends Command {
    private factionRun: FactionRunFunction;
    private requiredPermission: FactionPermissionString;

    constructor(props: FactionCommandStructure) {
        super({
            ...props,
            run: () => {}
        });

        this.factionRun = props.run;
        this.requiredPermission = props.requiredPermission;
    }

    protected override registerHandler(): void {
        const commandNames = !this.aliases ? this.name : [this.name, ...this.aliases];

        PlayerEvent.onCommandText(commandNames, async (params: CmdBusCallback) => {
            if (!commandPerms.get(params.player)) return;

            const playerName = params.player.getName().name;

            const faction = factionService.getFactionByMemberName(playerName);
            if (!faction) return params.player.sendClientMessage(Colors.Red, "No perteneces a ninguna facción.");

            // ---------------------------

            if (this.requiredPermission) {
                if (!faction.hasPermission(this.requiredPermission)) return; // return params.player.sendClientMessage(Colors.Red, "Tu facción no tiene los permisos necesarios para usar este comando.");
            }

            // ---------------------------

            const member = faction.members.find(m => m.name === playerName);
            if (!member) return;

            await this.factionRun({
                ...params,
                faction,
                member
            });
        });
    }
}