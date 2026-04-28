import Command from "@commands/Command";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService, StaffService } from "@modules/staff/core";
import { Player } from "@infernus/core";

/*
new Command({
    name: "report",
    description: "Reportar a un usuario en específico.",
    aliases: ["re", "reportar"],
    
    run: async ({ player, subcommand: args, next }) => {

        const PlayerTimer = new Map();

        const PlayerName = player.getName().name;
 
        const [Target, Reason] = [Player.getInstance(+args[0]), args.slice(1).join(" ")];

        if(!Target || !Reason) return Command.getSyntax("desbanip", player);

        const StaffsOnline = (await Promise.all(Player.getInstances().map(async p => CheckAdmin(p, "EARLY_SUPPORTER")))).filter(Boolean).length;

        if (StaffsOnline === 0) return player.sendClientMessage(Colors.Grey, "* No hay administradores disponibles en este momento. Por favor, intenta enviar tu reporte más tarde.");

        if (PlayerTimer.has(PlayerName)) {
            const remainingTime = (PlayerTimer.get(PlayerName) - Date.now()) / 1000;
            return player.sendClientMessage(Colors.Red, `Debes esperar ${remainingTime.toFixed(2)} para que puedas enviar un nuevo reporte.`);
        };

        const report = new Report({
            id: randomId(),
            answered: false,
            author: player.getName().name,
            reason: Reason,
            reportedUser: Target.getName().name
        });
        
        await report.save();

        player.sendClientMessage(Colors.Yellow, "El reporte fue enviado correctamente. Serás atendido a la brevedad.");

        await SendToAdmins(Colors.Yellow, "|_______ NUEVO REPORTE _______|");
        await SendToAdmins(0xE11509FF, `Reporte de: ${PlayerName} [ID: ${player.id}] a ${Target?.getName().name} [ID: ${Target?.id}].`);
        await SendToAdmins(0xE11509FF, `Razón: ${Reason}`);

        const cooldownTime = 60 * 100 * 10; // 60 segundos.

        PlayerTimer.set(PlayerName, Date.now() + cooldownTime);

        setTimeout(() => PlayerTimer.delete(PlayerName), cooldownTime);


        return next();
    }
});

*/

/* const randomId = (length: number = 4): string =>
    [...Array(length)].map(() => Math.random().toString(36)[2]).join('');

new Command({
    name: "reportar",
    description: "",
    syntax: "/reportar <ID> <Razón>",
    aliases: ["report"],
    run: async ({ player, subcommand, next }) => {

        const PlayerTimer = new Map();

        const playerName = player.getName().name;
    
        const [target, reason] = [Player.getInstance(+subcommand[0]), subcommand.slice(1).join(" ")];
    
        if(!target || !reason) return Command.getSyntax("reportar", player);
    
        const staff = StaffService.getOnlineAdmins();

        if (!staff.length) return player.sendClientMessage(Colors.Grey, "* No hay administradores disponibles en este momento. Por favor, intenta enviar tu reporte más tarde.");
        
        if (PlayerTimer.has(playerName)) {
            const remainingTime = (PlayerTimer.get(playerName) - Date.now()) / 1000;
            return player.sendClientMessage(Colors.Red, `Debes esperar ${remainingTime.toFixed(2)} para que puedas enviar un nuevo reporte.`);
        };
    
        const report = new Report({
            id: randomId(),
            answered: false,
            author: player.getName().name,
            reason: reason,
            reportedUser: target.getName().name
        });
        
        await report.save();
    
        player.sendClientMessage(Colors.Yellow, "El reporte fue enviado correctamente. Serás atendido a la brevedad.");

        StaffChatService.sendAdminMessage(Colors.Yellow, "|_______ NUEVO REPORTE _______|");
        StaffChatService.sendAdminMessage(Colors.AlertRed, `Reporte de: ${playerName} [ID: ${player.id}] a ${target?.getName().name} [ID: ${target?.id}].`);
        StaffChatService.sendAdminMessage(Colors.AlertRed, `Razón: ${reason}`);
    
        const cooldownTime = 60 * 100 * 10; // 60 segundos.
    
        PlayerTimer.set(playerName, Date.now() + cooldownTime);
    
        setTimeout(() => PlayerTimer.delete(playerName), cooldownTime);
    
    
        return next();

    }
}); */





// TO-DO
// TODO: No permitir el envío del reporte si el usuario tiene bloqueado el uso de /report.