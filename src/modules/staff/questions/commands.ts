import Command from "@commands/Command";
import StaffCommand from "@commands/StaffCommand";
import { Dialog, DialogStylesEnum, Player } from "@infernus/core";
import { PaginatedDialog } from "@managers/PaginatedDialog";
import { Colors } from "@modules/server/colors";
import { capitalize } from "@utils/capitalize";
import { StaffChatService } from "../core";
import { isStaffQuestionStatusType, STAFF_QUESTION_STATUS_TYPES, staffQuestionService, type StaffQuestionStatusType } from "./core";
import { timerManager } from "@managers/TimerManager";

new StaffCommand({
    name: "dudas",
    aliases: ["questions"],
    requiredFlag: "ATTEND_QUESTIONS",
    loggable: false,
    description: "Listado de todas las dudas hechas por usuarios.",
    run: async ({ player, subcommand, next }) => {
        if (subcommand.at(0) && !isStaffQuestionStatusType(subcommand[0].toLowerCase())) {
            player.sendClientMessage(Colors.WrongSintaxis, "Uso: /dudas -f <Estado>");
            player.sendClientMessage(Colors.LightRed, `Estados disponibles: ${STAFF_QUESTION_STATUS_TYPES.join(" | ")}`);
            return next();
        }

        const filter = !!(subcommand.at(0) && isStaffQuestionStatusType(subcommand[0].toLowerCase() as StaffQuestionStatusType));

        const questions = filter
            ? staffQuestionService.getAllQuestions(subcommand[0].toLowerCase() as StaffQuestionStatusType)
            : staffQuestionService.getAllQuestions();

        const CAPTION_RED_ARROW = "{FF6359}>{C3C3C3}";
        const DIALOG_RED_LINE = "{FF6359}|{FFFFFF}";

        const questionsMapped = questions.map(q => {
            const question = q.question.length > 25 ? `${q.question.slice(0, 25)}...` : q.question;

            const parts = `${q.askedBy} ${DIALOG_RED_LINE} ${q.answeredBy || "Nadie"}`;
            
            return `${q.id}\t${parts}\t${question}\t${capitalize(q.status)}`
        });

        const dialog = new PaginatedDialog({
            style: "TABLIST_HEADERS",
            caption: `H. ${CAPTION_RED_ARROW} Listado de dudas${filter ? ` ${CAPTION_RED_ARROW} Filtrado por: ${capitalize(subcommand[0])}` : ''}`,
            headers: "ID\tAutor/Staff\tDuda\tEstado",
            info: questionsMapped,
            button1: "X",
            button2: "O"
        });

        await dialog.show(player);

        return next();
    }
});


new StaffCommand({
    name: "verduda",
    requiredFlag: "ATTEND_QUESTIONS",
    loggable: false,
    description: "Revisa los detalles de una duda.",
    run: async ({ player, subcommand, next }) => {
        
        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /verduda <ID_Duda>");

        const questionId = parseInt(subcommand[0]);
        if (isNaN(questionId)) return player.sendClientMessage(Colors.LightRed, "ID de duda inválido.");

        const question = staffQuestionService.getQuestion(questionId);
        if (!question) return player.sendClientMessage(Colors.LightRed, "No se encontró una duda con ese ID.");

        const CAPTION_RED_ARROW = "{FF6359}>{C3C3C3}";

        const formattedQuestionStatus = 
            question.status === "answered" ? `Respondida por: ${question.answeredBy!}` :
            question.status === "rejected" ? `Rechazada por: ${question.answeredBy!}`  :
            "Sin responder/rechazar.";


        const dialog = new Dialog({
            style: DialogStylesEnum.MSGBOX,
            caption: `H. ${CAPTION_RED_ARROW} Detalles de duda (${question.id})`,
            info: `Estado de la duda: ${capitalize(question.status)}\nPreguntada por: ${question.askedBy}\n${formattedQuestionStatus}\n\n${question.question}`,
            button1: "Cerrar"
        });

        await dialog.show(player);

        return next();
    }
});



new StaffCommand({
    name: "responderduda",
    requiredFlag: "ATTEND_QUESTIONS",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {

        if (subcommand.length < 2) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /res(ponder)duda <ID_Duda> <Respuesta>");

        const questionId = parseInt(subcommand[0]);
        if (isNaN(questionId)) return player.sendClientMessage(Colors.LightRed, "ID de duda inválido.");

        const question = staffQuestionService.getQuestion(questionId);
        if (!question) return player.sendClientMessage(Colors.LightRed, "No se encontró una duda con ese ID.");

        if (staffQuestionService.isQuestionAnswered(questionId)) return player.sendClientMessage(Colors.LightRed, "La duda ya ha sido resuelta.");

        const answer = subcommand.slice(1).join(" ");

        staffQuestionService.answerQuestion(questionId, player.getName().name, answer);

        StaffChatService.sendAdminMessage(Colors.Red3, `[Dudas (( ${questionId} ))]: ${player.getName().name} (${player.id}) respondió la duda.`);

        const questionPlayer = Player.getInstances().find(p => p.getName().name === question.askedBy);

        if (!questionPlayer) return next();

        questionPlayer.sendClientMessage(Colors.LightBlue, `${player.accountName} ha respondido tu duda: ${answer}`);

        return next();
    }
});



new StaffCommand({
    name: "rechazarduda",
    requiredFlag: "ATTEND_QUESTIONS",
    loggable: false,
    description: "",
    run: async ({ player, subcommand, next }) => {
        if (!subcommand.length) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /r(echazar)duda <ID_Duda>");

        const questionId = parseInt(subcommand[0]);
        if (isNaN(questionId)) return player.sendClientMessage(Colors.LightRed, "ID de duda inválido.");

        const question = staffQuestionService.getQuestion(questionId);
        if (!question) return player.sendClientMessage(Colors.LightRed, "No se encontró una duda con ese ID.");

        if (staffQuestionService.isQuestionAnswered(questionId)) return player.sendClientMessage(Colors.LightRed, "La duda ya ha sido resuelta.");

        if (staffQuestionService.isQuestionRejected(questionId)) return player.sendClientMessage(Colors.LightRed, "La duda ya ha sido rechazada.");

        staffQuestionService.rejectQuestion(questionId, player.getName().name);

        StaffChatService.sendAdminMessage(Colors.Red3, `[Dudas (( ${questionId} ))]: ${player.getName().name} (${player.id}) rechazó la duda.`);

        const questionPlayer = Player.getInstances().find(p => p.getName().name === question.askedBy);

        if (!questionPlayer) return next();

        questionPlayer.sendClientMessage(Colors.LightBlue, `${player.accountName} ha rechazado tu duda.`);

        return next();
    }
});


// ---------------------------------------------------------------

const playerQuestionsCooldown: Map<Player, number> = new Map();
const MAX_QUESTION_INTERVAL = 30_000; // 30 segundos para realizar otra duda.

new Command({
    name: "duda",
    description: "",
    category: "PLAYER",
    run: async ({ player, subcommand, next }) => {

        if (!subcommand.at(0)) return player.sendClientMessage(Colors.WrongSintaxis, "Uso: /duda <Duda>");

        if (playerQuestionsCooldown.has(player)) {
            const askedAt = playerQuestionsCooldown.get(player)!;
            const timeLeft = Math.max(0, (askedAt + MAX_QUESTION_INTERVAL - Date.now()) / 1000 | 0);

            return player.sendClientMessage(Colors.LightRed, `Podrás realizar otra duda en ${timeLeft} segundos.`);
        }

        const question = subcommand.join(" ");

        staffQuestionService.createQuestion({
            question,
            askedBy: player.getName().name
        });

        player.sendClientMessage(Colors.Green, "Tu duda ha sido enviada con éxito a la administración.");

        playerQuestionsCooldown.set(player, Date.now());

        timerManager.createPlayerTimer(
            player, 
            "question_created", 
            () => playerQuestionsCooldown.delete(player),
            MAX_QUESTION_INTERVAL, 
            false
        );

        return next();
    }
});