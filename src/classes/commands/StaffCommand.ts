import type { TStaffPermissionFlag } from "@database/schemas/staff";
import { type CmdBusCallback, PlayerEvent } from "@infernus/core";
import { commandPerms } from "@modules/server/auth";
import { Colors } from "@modules/server/colors";
import { StaffChatService, StaffService } from "@modules/staff";
import Command, { type CommandStructure, type MaybePromiseCallbackRet } from "./Command";


interface StaffCmdBusCallback extends CmdBusCallback {
  success: () => void;
}


interface StaffCommandStructure extends Omit<CommandStructure, "run"> {
  requiredFlag: TStaffPermissionFlag;
  loggable: boolean;
  run: (params: StaffCmdBusCallback) => MaybePromiseCallbackRet;
}


const createWrappedRun = (props: StaffCommandStructure) => {
  return (params: CmdBusCallback) => {
    const success = () => {
      if (!props.loggable) return;

      const argsLog = params.subcommand.at(0) ? ` (params: ${params.subcommand.join(" ")})` : "";

      StaffChatService.sendLog(Colors.OceanBlue, `${params.player.accountName} (${params.player.id}) utilizó el comando {FF6359}/${props.name}{0D85A7}${argsLog}.`);
    }

    return props.run({ ...params, success });
  };
}


export default class StaffCommand extends Command implements StaffCommandStructure {
  requiredFlag: TStaffPermissionFlag;
  loggable: boolean;

  constructor(props: StaffCommandStructure) {
    super({ ...props, run: createWrappedRun(props) });

    this.requiredFlag = props.requiredFlag;
    this.loggable = props.loggable;
  }

  protected override registerHandler(): void {
    const commandNames = !this.aliases ? this.name : [this.name, ...this.aliases];

    PlayerEvent.onCommandText(commandNames, async (params: CmdBusCallback) => {
      if (!commandPerms.get(params.player)) return;
      if (!StaffService.hasAnyPermissionFlag(params.player, ["ADMINISTRATOR", this.requiredFlag])) return;

      await this.run(params);
    });
  }
}