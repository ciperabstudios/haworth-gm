import { Player } from "@infernus/core";
import { Colors } from "@modules/server/colors";
import { StaffChatService } from "../core";

export type StaffQuestionStatusType = "unanswered" | "answered" | "rejected";

export const STAFF_QUESTION_STATUS_TYPES: StaffQuestionStatusType[] = ["unanswered", "answered"] as const;

export function isStaffQuestionStatusType(value: string): value is typeof STAFF_QUESTION_STATUS_TYPES[number] {
    return STAFF_QUESTION_STATUS_TYPES.includes(value as typeof STAFF_QUESTION_STATUS_TYPES[number]);
}

interface IStaffQuestion {
    id: number;
    status: StaffQuestionStatusType;

    question: string;
    askedBy: string;

    answer: string | null;
    answeredBy: string | null;
}

type CreateStaffQuestionDTO = Pick<IStaffQuestion, "question" | "askedBy">;

export class StaffQuestionService {
    private questions: IStaffQuestion[] = [];
    private perPlayerQuestions: Map<string, IStaffQuestion[]> = new Map();

    private lastId = 0;

    // -----------------------------

    private getNextQuestionId(): number {
        return ++this.lastId;
    }

    // -----------------------------

    getQuestion(id: number): IStaffQuestion | undefined {
        return this.questions.find(q => q.id === id);
    }

    getAllQuestions(filter?: StaffQuestionStatusType) {
        const allQuestions = [...this.questions.values()];

        if (filter) return allQuestions.filter(q => q.status === filter);

        return allQuestions;
    }

    isQuestionAnswered(id: number): boolean {
        const question = this.getQuestion(id);
        if (!question) return false;

        return !!question.answer;
    }

    isQuestionRejected(id: number): boolean {
        const question = this.getQuestion(id);
        if (!question) return false;

        return question.status === "rejected";
    }

    // -----------------------------

    createQuestion(dto: CreateStaffQuestionDTO) {
        const nextId = this.getNextQuestionId();

        const question: IStaffQuestion = {
            id: nextId,
            status: "unanswered",
            answeredBy: null,
            answer: null,
            ...dto
        };

        this.questions.push(question);

        StaffChatService.sendAdminMessage(Colors.SoftBlue, `[Dudas (( ${nextId} ))]: ${dto.askedBy} tiene la siguiente duda: ${dto.question}`);
    }

    removeQuestion(id: number) {
        if (!this.questions.some(q => q.id === id)) return;

        const questioner = this.questions[id].askedBy;

        this.questions = this.questions.filter(q => q.id !== id);

        const player = Player.getInstances().find(p => p.getName().name === questioner);
        if (!player) return;

        this.perPlayerQuestions.set(questioner, (this.perPlayerQuestions.get(questioner)?.filter(q => q.id === id) ?? []));
    }

    // -----------------------------

    changeQuestionStatusType(id: number, newStatus: StaffQuestionStatusType) {
        const question = this.getQuestion(id);
        if (!question) return;

        if (question.status === newStatus) return;

        question.status = newStatus;
    }

    // -----------------------------

    rejectQuestion(id: number, rejectedBy: string) {
        const question = this.getQuestion(id);
        if (!question) return;

        if (question.status === "answered") return;

        question.answeredBy = rejectedBy;

        this.changeQuestionStatusType(id, "rejected");
    }



    answerQuestion(id: number, answeredBy: string, reply: string) {
        const question = this.getQuestion(id);
        if (!question) return;

        if (question.answeredBy || question.answer) return;

        question.answeredBy = answeredBy;
        question.answer = reply;

        this.changeQuestionStatusType(id, "answered");
    }

}

// ---------------------------------------------------------------

export const staffQuestionService = new StaffQuestionService();

// ---------------------------------------------------------------