import { logger } from "@logger";
import { type IDialog, type IDialogResCommon, Dialog, DialogStylesEnum, Player } from "@infernus/core";
import { PaginatedDialog } from "./PaginatedDialog";

// Tipo de resultado para la lógica de los diálogos.
type LogicResult = void | { step: number };

// Lógica que se ejecuta al interactuar con el diálogo.
type DialogLogic = ({ response, listItem, inputText }: Omit<IDialogResCommon, "buffer">) => Promise<LogicResult>;

// Definir el tipo de estado.
type RecordType = object; // Record<string | number, unknown>;
type StateType<T extends RecordType> = T;


interface IBaseDialogProps extends Omit<IDialog, "style" | "info"> {
    style: keyof typeof DialogStylesEnum;
}

interface RegularDialog extends IBaseDialogProps {
    style: Exclude<keyof typeof DialogStylesEnum, "TABLIST_HEADERS" | "TABLIST" | "LIST">;
    info?: string;
}

interface ListNonPaginated extends IBaseDialogProps {
    style: "LIST";
    paginated?: false;
    info?: string;
}

interface ListPaginated extends IBaseDialogProps {
    style: "LIST";
    paginated: true;
    info: string[];
}

interface TablistNonPaginated extends IBaseDialogProps {
    style: "TABLIST";
    paginated?: false;
    info?: string;
}

interface TablistPaginated extends IBaseDialogProps {
    style: "TABLIST";
    paginated: true;
    info: string[];
}

interface TablistHeadersNonPaginated extends IBaseDialogProps {
    style: "TABLIST_HEADERS";
    paginated?: false;
    info?: string;
}

interface TablistHeadersPaginated extends IBaseDialogProps {
    style: "TABLIST_HEADERS";
    paginated: true;
    headers: string;
    info: string[];
}

type IDialogProps = 
    | RegularDialog
    | ListNonPaginated
    | ListPaginated
    | TablistNonPaginated
    | TablistPaginated
    | TablistHeadersNonPaginated 
    | TablistHeadersPaginated;

// Función que genera los datos del diálogo basados en el estado.
type DialogGenerator<T extends RecordType> = (state: StateType<T>) => IDialogProps;//BaseDialogProps;

// Estructura de datos para cada diálogo.
export interface DialogsData<T extends RecordType> {
    dialog: DialogGenerator<T>;  
    run_logic: DialogLogic;   
}

export class DialogManager<T extends RecordType> {
    private dialogs: DialogsData<T>[] = [];
    private currentStep: number = 0;
    private player: Player;
    private stopped: boolean = false;

    // Estado mutable compartido.
    public state: T;

    constructor({ player, state }: { player: Player, state?: T }) {
        this.player = player;
        this.state = state ?? ({} as T);
    }

    setDialogs(dialogs: DialogsData<T>[]) {
        this.dialogs.push(...dialogs);
    }

    // Verificar si el resultado de la lógica lleva a otro paso de diálogo
    private isStepResult(result: LogicResult): result is { step: number } {
        return !!result && typeof result === "object" && "step" in result;
    }

    private isListPaginated(props: IDialogProps): props is ListPaginated {
        return props.style === "LIST" && Array.isArray(props.info);
    }

    private isTablistPaginated(props: IDialogProps): props is TablistPaginated {
        return props.style === "TABLIST" && Array.isArray(props.info);
    }

    private isTablistHeadersPaginated(props: IDialogProps): props is TablistHeadersPaginated {
        return props.style === "TABLIST_HEADERS" && ("headers" in props) && Array.isArray(props.info);
    }

    private async executeSteps(): Promise<void> {
        while (!this.stopped) {
            try {
                if (!this.player.isConnected()) this.stop();
                
                const actualStep = this.dialogs[this.currentStep];
                if (!actualStep) return;
                
                const dialogProps = actualStep.dialog(this.state);

                const dialog = this.isListPaginated(dialogProps) || this.isTablistPaginated(dialogProps) || this.isTablistHeadersPaginated(dialogProps)
                    ? await new PaginatedDialog(dialogProps).show(this.player)
                    : await new Dialog({ ...dialogProps, style: DialogStylesEnum[dialogProps.style] }).show(this.player);

                const { response, listItem, inputText} = dialog;
                
                const logicResult = await actualStep.run_logic({ response, listItem, inputText });

                if (this.isStepResult(logicResult)) {
                    this.currentStep = logicResult.step;
                    continue;
                }

                if (!response) {
                    if (this.currentStep === 0) break;
                    this.currentStep--;
                    continue;
                }

                this.currentStep++;

            } catch (error) {
                logger.error(`[DIALOGS] ${(error as Error).message}`);
                break;
            }
        }
    }

    async start() {
        this.stopped = false;
        await this.executeSteps();
    }

    stop() {
        this.stopped = true;
    }
}