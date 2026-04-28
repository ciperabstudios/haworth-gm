import StaffCommand from "@commands/StaffCommand";
import { Player } from "@infernus/core";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService, StaffService } from "@modules/staff/core";



new StaffCommand({
    name: "ban",
    requiredFlag: "BAN",
    loggable: true,
    description: "",
    syntax: "/ban <ID> <Motivo>",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0) || subcommand.length < 2) return StaffCommand.getSyntax("ban", player);
    
        if (!StaffCommand.isValidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;
    
        if (StaffService.hasAnyPermissionFlag(target, ["DEVELOPER", "ADMINISTRATOR"])) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes banear a un dueño o programador.");
        if (StaffService.isRoleHigher(target, player) || StaffService.isRoleEqual(target, player)) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes banear a un miembro de la administración con tu mismo cargo o superior.");
    
        target.banEx(subcommand.slice(1).join(" "), target.charset);
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} baneó a ${target.getName().name}. Motivo: ${subcommand.slice(1).join(" ")}`);
        // TODO: Logs handling.
        return next();

    }
});



/*
new StaffCommand({
    name: "banip",
    requiredFlag: "BAN",
    loggable: true,
    description: "",
    syntax: "/banip <ID> <Motivo>",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0) || subcommand.length < 2) return StaffCommand.getSyntax("banip", player);
    
        if (!StaffCommand.invalidId(player, +subcommand[0])) return next();

        const target = Player.getInstance(+subcommand[0])!;
    
        if (StaffService.hasAnyPermissionFlag(target, ["DEVELOPER", "ADMINISTRATOR"])) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes banear a un dueño o programador.");
        if (StaffService.isRoleHigher(target, player) || StaffService.isRoleEqual(target, player)) return player.sendClientMessage(Colors.WrongSintaxis, "No puedes banear a un miembro de la administración con tu mismo cargo o superior.");
    
        const IpData: HydratedDocument<IPs> = new IP({
            IP: target.getIp(),
            Reason: subcommand.slice(1).join(" "),
            Admin: playerDatabaseAccounts.get(player)?.id,
            Temporal: false
        });
    
        await IpData.save();
        target.banEx(subcommand.slice(1).join(" "), target.charset);
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} baneó de IP a ${target.getName().name}. Motivo: ${subcommand.slice(1).join(" ")}`);
        // TODO: Logs handling.
        return next();

    }
});



new StaffCommand({
    name: "desbanip",
    requiredFlag: "UNBAN",
    loggable: true,
    description: "",
    syntax: "/unbanip <IP> [Motivo]",
    aliases: ["unbanip"],
    run: async ({ player, subcommand, next }) => {

        if (!StaffService.hasPermissionFlag(player, "UNBAN")) return next();

        if (!subcommand.at(0) || subcommand.length < 2) return StaffCommand.getSyntax("desbanip", player);
        
        const _IP = await IP.findOne({ ip: subcommand.slice(0, 1).join(" ") });
        if (!_IP) return player.sendClientMessage(Colors.WrongSintaxis, "La IP proporcionada no es válida o no está baneada.");
        
        // TODO: Si la IP fue baneada por un dueño o programador, devolver mensaje de que no es posible.
    
        IP.findOneAndDelete({ ip: _IP.ip }).catch(err => logger.error((err as Error).message));
    
        StaffChatService.sendAdminMessage(Colors.OrangeWhite, `${player.getName().name} desbaneó la IP ${subcommand.slice(0, 1).join(" ")}. Motivo: ${subcommand.slice(1).join(" ")}`);
        // TODO: Logs handling.
        return next();

    }
}); */