import { Player } from "@infernus/core";
import { Colors } from "@modules/server/colors/constants";
import { StaffChatService } from "../core";

export type StaffReportStatusType = "pending" | "rejected" | "accepted" | "in_revision" | "completed" | "reopened";

export const STAFF_REPORT_STATUS_TYPES: StaffReportStatusType[] = ["pending", "rejected", "accepted", "in_revision", "completed", "reopened"] as const;

export function isStaffReportStatusType(value: string): value is typeof STAFF_REPORT_STATUS_TYPES[number] {
  return STAFF_REPORT_STATUS_TYPES.includes(value as typeof STAFF_REPORT_STATUS_TYPES[number]);
}

export interface IStaffReport {
    id: number;
    status: StaffReportStatusType;

    reporter: string;
    reported: string;
    reason: string;
}

export interface CreateStaffReportDTO {
    reporter: IStaffReport["reporter"];
    reported: IStaffReport["reported"];
    reason: IStaffReport["reason"];
}

// ---------------------------------------------------------------

// TODO: Aplicar patrón State.

class StaffReportService {
    private reports: IStaffReport[] = [];
    private perPlayerReports: Map<string, IStaffReport[]> = new Map();

    private lastId = 0;

    // -----------------------------

    private getNextReportId(): number {
        return ++this.lastId;
    }

    // -----------------------------

    getReport(id: number): IStaffReport | undefined {
        return this.reports.find(r => r.id === id);
    }

    getAllReports(filter?: StaffReportStatusType) {
        const allReports = [...this.reports.values()];

        if (filter) return allReports.filter(r => r.status === filter);

        return allReports;
    }

    // -----------------------------

    createReport(reporterPlayer: Player, reportedPlayer: Player, dto: CreateStaffReportDTO) {
        const { reporter, reported, reason } = dto;
        const nextId = this.getNextReportId();

        const report: IStaffReport = {
            id: nextId,
            reporter,
            reported,
            reason,
            status: "pending"
        };

        this.reports.push(report);

        if (reporterPlayer && reportedPlayer) {
            const reporterName = reporterPlayer.getName().name;
            const reportedName = reportedPlayer.getName().name;

            const playerReports = this.perPlayerReports.get(reporterName);
            if (!playerReports) this.perPlayerReports.set(reporterName, []);

            playerReports?.push(report);

            // ----------------

            StaffChatService.sendAdminMessage(Colors.Red2, `[Reportes (( ${nextId} ))]: ${reporterName} (${reporterPlayer.id}) reportó a ${reportedName} (${reportedPlayer.id}). Motivo: ${reason}`);
        }
    }

    removeReport(id: number) {
        if (!this.reports.some(r => r.id === id)) return;
        
        const reporter = this.reports[id].reporter;

        this.reports = this.reports.filter(r => r.id !== id);

        const player = Player.getInstances().find(p => p.getName().name === reporter);
        if (!player) return;

        const playerName = player.getName().name;
        this.perPlayerReports.set(playerName, (this.perPlayerReports.get(playerName)?.filter(r => r.id === id) ?? []));
    }

    // -----------------------------

    changeReportStatusType(id: number, newStatus: StaffReportStatusType) {
        const report = this.getReport(id);
        if (!report) return;

        if (report.status === "completed" && newStatus !== "reopened") return;

        report.status = newStatus;
    }

    // -----------------------------

    rejectReport(id: number): boolean {
        const report = this.getReport(id);
        if (!report) return false;

        if (report.status === "rejected") return false;

        this.changeReportStatusType(id, "rejected");
        return true;
    }

    acceptReport(id: number): boolean  {
        const report = this.getReport(id);
        if (!report) return false;

        if (report.status === "accepted") return false;

        this.changeReportStatusType(id, "accepted");
        return true;
    }

    reviewReport(id: number): boolean  {
        const report = this.getReport(id);
        if (!report) return false;

        if (report.status === "in_revision") return false;

        this.changeReportStatusType(id, "in_revision");
        return true;
    }

    completeReport(id: number): boolean  {
        const report = this.getReport(id);
        if (!report) return false;

        if (report.status === "completed") return false;

        this.changeReportStatusType(id, "completed");
        return true;
    }

    reopenReport(id: number): boolean  {
        const report = this.getReport(id);
        if (!report) return false;

        if (report.status === "reopened") return false;

        this.changeReportStatusType(id, "reopened");
        return true;
    }
}

// ---------------------------------------------------------------

export const staffReportService = new StaffReportService();

// ---------------------------------------------------------------