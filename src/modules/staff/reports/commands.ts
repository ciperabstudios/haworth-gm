import StaffCommand from "@commands/StaffCommand";
import { isStaffReportStatusType, STAFF_REPORT_STATUS_TYPES, staffReportService, type StaffReportStatusType } from "./core";
import { Colors } from "@modules/server/colors";
import { Dialog, DialogStylesEnum, Player } from "@infernus/core";
import { capitalize } from "@utils/capitalize";
import { PaginatedDialog } from "@managers/PaginatedDialog";
import { StaffChatService } from "../core";
import Command from "@commands/Command";
import { timerManager } from "@managers/TimerManager";

new StaffCommand({
    name: "reportes",
    aliases: ["res"],
    requiredFlag: "ATTEND_REPORTS",
    loggable: false,
    description: "Listado de todos los reportes hechos por usuarios.",
    run: async ({ player, subcommand, next }) => {

        if (subcommand.at(0) && !isStaffReportStatusType(subcommand[0].toLowerCase())) {
            player.sendClientMessage(Colors.WrongSintaxis, "Uso: /reportes -f <Estado>");
            player.sendClientMessage(Colors.LightRed, `Estados disponibles: ${STAFF_REPORT_STATUS_TYPES.join(" | ")}`);
            return next();
        }

        const filter = !!(subcommand.at(0) && isStaffReportStatusType(subcommand[0].toLowerCase() as StaffReportStatusType));
        
        const reports = filter
                    ? staffReportService.getAllReports(subcommand[0].toLowerCase() as StaffReportStatusType)
                    : staffReportService.getAllReports();

        const CAPTION_RED_ARROW = "{FF6359}>{C3C3C3}";
        const DIALOG_RED_ARROW = "{FF6359}>{FFFFFF}";

        const reportsMapped = reports.map(r => {
            const reason = r.reason.length > 25 ? `${r.reason.slice(0, 25)}...` : r.reason;

            const players = Player.getInstances();
            const reporter = players.find(p => p.getName().name === r.reporter);
            const reported = players.find(p => p.getName().name === r.reported);

            const parts = `${reporter ? `${reporter.getName().name} (${reporter.id})` : "??"} ${DIALOG_RED_ARROW} ${reported ? `${reported.getName().name} (${reported.id})` : "??"}`;

            return `${r.id}\t${parts}\t${reason}\t${capitalize(r.status)}`;
        });

        /* const manager = new DialogManager<ReportListState>({ player, state: {
            selectedIndex: 0,
        } });

        const DIALOG_STEPS = {
            LIST: 0,
            FILTER_BY_STATE: 1,
            REPORT_DETAILS: 2,
        }

        const steps: DialogsData<ReportListState>[] = [
            {
                dialog: (state) => {
                    const filterByStateOption = "Filtrar por estado...";

                    return {
                        style: "TABLIST_HEADERS",
                        paginated: true,
                        caption: `H. ${CAPTION_RED_ARROW} Listado de reportes`,
                        headers: "ID\tPartes\tRazón\tEstado",
                        info: reportsMapped,
                        button1: "X",
                        button2: "O"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    
                }
            }

        ];
 */


        const dialog = new PaginatedDialog({
            style: "TABLIST_HEADERS",
            caption: `H. ${CAPTION_RED_ARROW} Listado de reportes${filter ? ` ${CAPTION_RED_ARROW} Filtrado por: ${capitalize(subcommand[0])}` : ''}`,
            headers: "ID\tPartes\tRazón\tEstado",
            info: reportsMapped,
            button1: "X",
            button2: "O"
        });

        await dialog.show(player);

        return next();
    }
});


new StaffCommand({
    name: "verreporte",
    aliases: ["vreporte", "vre"],
    requiredFlag: "ATTEND_REPORTS",
    loggable: false,
    description: "Revisa los detalles de un reporte.",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /verreporte <ID_Reporte>");

        const reportId = parseInt(subcommand[0]);
        if (isNaN(reportId)) return player.sendClientMessage(Colors.LightRed, "ID de reporte inválido.");

        const report = staffReportService.getReport(reportId);
        if (!report) return player.sendClientMessage(Colors.LightRed, "No se encontró un reporte con ese ID.");

        //id, reason, reported, reporter, status

        const CAPTION_RED_ARROW = "{FF6359}>{C3C3C3}";

        const dialog = new Dialog({
            style: DialogStylesEnum.MSGBOX,
            caption: `H. ${CAPTION_RED_ARROW} Detalles de reporte (${report.id})`,
            info: `Estado del reporte: ${capitalize(report.status)}\n\nReportante: ${report.reporter}\nReportado: ${report.reported}\n\nMotivo: ${report.reason}`,
            button1: "Cerrar"
        });

        await dialog.show(player);

        return next();
    }
});


new StaffCommand({
    name: "rechazarreporte",
    aliases: ["rreporte", "rre"],
    requiredFlag: "ATTEND_REPORTS",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /r(echazar)re(porte) <ID_Reporte>");

        const reportId = parseInt(subcommand[0]);
        if (isNaN(reportId)) return player.sendClientMessage(Colors.LightRed, "ID de reporte inválida.");

        const report = staffReportService.getReport(reportId);
        if (!report) return player.sendClientMessage(Colors.LightRed, "No se encontró un reporte con esa ID.");

        const success = staffReportService.rejectReport(reportId);
        if (!success) return player.sendClientMessage(Colors.LightRed, "El reporte ya ha sido rechazado.");

        StaffChatService.sendAdminMessage(Colors.Red3, `[Reportes (( ${reportId} ))]: ${player.getName().name} (${player.id}) rechazó el reporte.`);

        return next();
    }
});



new StaffCommand({
    name: "aceptarreporte",
    aliases: ["areporte", "are"],
    requiredFlag: "ATTEND_REPORTS",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /a(ceptar)re(porte) <ID_Reporte>");

        const reportId = parseInt(subcommand[0]);
        if (isNaN(reportId)) return player.sendClientMessage(Colors.LightRed, "ID de reporte inválida.");

        const report = staffReportService.getReport(reportId);
        if (!report) return player.sendClientMessage(Colors.LightRed, "No se encontró un reporte con esa ID.");

        const success = staffReportService.acceptReport(reportId);
        if (!success) return player.sendClientMessage(Colors.LightRed, "El reporte ya ha sido aceptado.");
        
        StaffChatService.sendAdminMessage(Colors.Red3, `[Reportes (( ${reportId} ))]: ${player.getName().name} (${player.id}) aceptó el reporte.`);

        return next();
    }
});



new StaffCommand({
    name: "completarreporte",
    aliases: ["creporte", "cre"],
    requiredFlag: "ATTEND_REPORTS",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /c(ompletar)re(porte) <ID_Reporte>");

        const reportId = parseInt(subcommand[0]);
        if (isNaN(reportId)) return player.sendClientMessage(Colors.LightRed, "ID de reporte inválida.");

        const report = staffReportService.getReport(reportId);
        if (!report) return player.sendClientMessage(Colors.LightRed, "No se encontró un reporte con esa ID.");

        const success = staffReportService.completeReport(reportId);
        if (!success) return player.sendClientMessage(Colors.LightRed, "El reporte ya ha sido completado.");
        
        StaffChatService.sendAdminMessage(Colors.Red3, `[Reportes (( ${reportId} ))]: ${player.getName().name} (${player.id}) completó el reporte.`);
        
        return next();
    }
});



new StaffCommand({
    name: "reabrirreporte",
    aliases: ["rareporte", "reare"],
    requiredFlag: "ATTEND_REPORTS",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /rea(brir)re(porte) <ID_Reporte>");

        const reportId = parseInt(subcommand[0]);
        if (isNaN(reportId)) return player.sendClientMessage(Colors.LightRed, "ID de reporte inválida.");

        const report = staffReportService.getReport(reportId);
        if (!report) return player.sendClientMessage(Colors.LightRed, "No se encontró un reporte con esa ID.");

        const success = staffReportService.reopenReport(reportId);
        if (!success) return player.sendClientMessage(Colors.LightRed, "El reporte ya ha sido reabierto.");
        
        StaffChatService.sendAdminMessage(Colors.Red3, `[Reportes (( ${reportId} ))]: ${player.getName().name} (${player.id}) reabrió el reporte.`);

        return next();
    }
});


// ---------------------------------------------------------------

const playerReportsCooldown: Map<Player, number> = new Map();
const MAX_REPORT_INTERVAL = 30_000; // 30 segundos para realizar otro reporte.

new Command({
    name: "reportar",
    aliases: ["re"],
    description: "",
    category: "PLAYER",
    run: async ({ player, subcommand, next }) => {
        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /re(portar) <ID_Jugador> <Razón>");

        if (playerReportsCooldown.has(player)) {
            const reportCreatedAt = playerReportsCooldown.get(player)!;
            const timeLeft = Math.max(0, (reportCreatedAt + MAX_REPORT_INTERVAL - Date.now()) / 1000 | 0);
            
            return player.sendClientMessage(Colors.LightRed, `Podrás realizar otro reporte en ${timeLeft} segundos.`);
        }

        const reportedId = parseInt(subcommand[0]);
        if (isNaN(reportedId)) return player.sendClientMessage(Colors.LightRed, "ID inválida.");

        const reportedPlayer = Player.getInstance(reportedId);
        if (!reportedPlayer) return player.sendClientMessage(Colors.LightRed, "No se encontró al jugador reportado o se desconectó.");

        const reason = subcommand.slice(2).join(" ");

        staffReportService.createReport(player, reportedPlayer, {
            reporter: player.getName().name,
            reported: reportedPlayer.getName().name,
            reason,
        });

        player.sendClientMessage(Colors.Green, "Tu reporte ha sido enviado con éxito a la administración.");
        
        playerReportsCooldown.set(player, Date.now());

        timerManager.createPlayerTimer(
            player,
            "report_created",
            () => playerReportsCooldown.delete(player),
            MAX_REPORT_INTERVAL,
            false
        );

        return next();
    }
});