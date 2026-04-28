import StaffCommand from "@commands/StaffCommand";
import { Colors } from "@modules/server/colors";
import { StaffChatService } from "@modules/staff/core";
//import { MoveVehicle, SetVehicleVW } from "@modules/vehicles/functions";
import { Player } from "@infernus/core";


new StaffCommand({
	name: "cambiarvw",
    requiredFlag: "MANAGE_PLAYERS",
    loggable: true,
	description: "",
	syntax: "/cambiarvw [ID] <VW>",
	aliases: ["changevirtualworld", "changevw"],
	run: async ({ player, subcommand, next }) => {
    
		if (!subcommand.at(0)) return StaffCommand.getSyntax("cambiarvw", player);
		if (!StaffCommand.isValidId(player, +subcommand[0])) return next();

		if (isNaN(+subcommand[1])) return player.sendClientMessage(Colors.WrongSintaxis, "[Error]: El VW tiene que ser especificado con un número válido.");
	
		const target = Player.getInstance(+subcommand[0])!;
	
		const targetVw = target.getVirtualWorld();
	
		if (target.isInAnyVehicle()) {
			//SetVehicleVW(Target, +subcommand[1]);
			target.sendClientMessage(Colors.White, `${player.getName().name} (${player.id}) cambió tu virtual world y el de tu vehículo (${targetVw} -> ${target.getVirtualWorld()}).`);
	
			StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} (${player.id}) cambió el virtual world de ${target.getName().name} (${target.id}) y el de su vehículo [${targetVw} -> ${target.getVirtualWorld()}].`);
	
			return next();
		}
	
		target.setVirtualWorld(+subcommand[0]);
		target.sendClientMessage(Colors.White, `${player.getName().name} (${player.id}) te cambió el virtual world (${targetVw} -> ${target.getVirtualWorld()}).`);
		
		StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} (${player.id}) cambió el virtual world de ${target.getName().name} (${target.id}) [${targetVw} -> ${target.getVirtualWorld()}].`);
	
		return next();

	}
});