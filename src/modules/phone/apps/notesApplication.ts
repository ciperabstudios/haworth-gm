import { Player } from "@infernus/core";
import { DialogManager, type DialogsData } from "@managers/DialogManager";
import { Colors, redString } from "@modules/server/colors";
import { BasePhoneApplication } from "./core";
import type { IBasePhoneApplication } from "./interfaces";

interface INote {
    id: number;
    title: string;
    content: string;
}


interface INoteOptions {
    getNote(id: number): INote | undefined;
    getNotes(): INote[];

    createNote(title: string, content: string): INote;
    editNote(id: number, content: string): void;
    deleteNote(id: number): void;
}

interface INoteMenuState {
    selectedNoteIndex?: number;
    noteTitle?: string;
    noteContent?: string;
}

class NotesApplicationService { FALTA HACER }


export default class NotesApplication extends BasePhoneApplication implements INoteOptions {
    private notes: INote[] = [];
    private nextId: number = 1;

    constructor(props: IBasePhoneApplication, savedData?: any) {
        super(props);

        if (savedData) {
            const { notes = [], nextId = 1 } = savedData;

            this.notes = notes;
            this.nextId = nextId;
        }
    }

    override serialize(): unknown {
        return {
            notes: this.notes,
            nextId: this.nextId
        } as const;
    }

    getNote(id: number): INote | undefined {
        return this.notes.find(note => note.id === id);
    }

    getNotes(): INote[] {
        return this.notes;
    }

    createNote(title: string, content: string): INote {
        const note: INote = {
            id: this.nextId++,
            title, content
        };

        this.notes.push(note);

        return note;
    }

    editNote(id: number, content: string): void {
        const note = this.notes.find(n => n.id === id);
        
        if (note) note.content = content;
    }

    deleteNote(id: number): void {
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) this.notes.splice(index, 1);
    }

    override async run(player: Player) {

        const STEPS_NOTES_UI = {
            MAIN_MENU: 0,
            NOTES_LIST: 1,
            CREATE_NOTE_TITLE: 2,
            CREATE_NOTE_CONTENT: 3,
            DELETE_NOTE: 4,
            NOTE_INFO: 5,
        } as const;

        const manager = new DialogManager<INoteMenuState>({ player });

        const steps: DialogsData<INoteMenuState>[] = [
            { // 0 -> Menú principal.
                dialog: (state) => {
                    const options = [
                        "Notas",
                        "Crear nota",
                        "Borrar nota"
                    ].join("\n");

                    return {
                        style: "LIST",
                        caption: `H. ${redString(">")} Aplicación (${this.name}) ${redString(">")} Menú principal`,
                        info: options,
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return manager.stop();

                    switch (listItem) {
                        case 0: return { step: STEPS_NOTES_UI.NOTES_LIST };
                        case 1: return { step: STEPS_NOTES_UI.CREATE_NOTE_TITLE };
                        case 2: return { step: STEPS_NOTES_UI.DELETE_NOTE };
                        default: return { step: STEPS_NOTES_UI.MAIN_MENU };
                    }
                }
            },
            { // 1 -> Listado de notas.
                dialog: (state) => {
                    const formattedNotes = this.notes.map(note => `[${note.id}] ${note.title}`);

                    return {
                        style: "LIST",
                        paginated: true,
                        caption: `H. ${redString(">")} Aplicación (${this.name}) ${redString(">")} Tus notas`,
                        info: !formattedNotes.length ? ["Sin notas..."] : formattedNotes,
                        button1: "Ver",
                        button2: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response || !this.notes.length) return { step: STEPS_NOTES_UI.MAIN_MENU };

                    manager.state.selectedNoteIndex = listItem;
                    return { step: STEPS_NOTES_UI.NOTE_INFO };
                }
            },
            { // 2 -> Crear nota (agregar título).
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. ${redString(">")} Aplicación (${this.name}) ${redString(">")} Crear nota (título)`,
                        info: "Escribe el título de la nota a continuación.\n\nLa longitud máxima para un título es de veinte (20) caracteres.",
                        button1: "Aceptar",
                        button2: "Cancelar"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: STEPS_NOTES_UI.MAIN_MENU };

                    const sanitizedInput = inputText.trim();
                    
                    if (sanitizedInput.length > 20) {
                        player.sendClientMessage(Colors.LightRed, "El máximo de caracteres para el título es de veinte (20).");
                        return { step: STEPS_NOTES_UI.CREATE_NOTE_TITLE };
                    }

                    manager.state.noteTitle = sanitizedInput;
                    return { step: STEPS_NOTES_UI.CREATE_NOTE_CONTENT };
                }
            },
            { // 3 -> Crear nota (agregar contenido).
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. ${redString(">")} Aplicación (${this.name}) ${redString(">")} Crear nota (contenido)`,
                        info: "Escribe el contenido de la nota a continuación.\n\nLa longitud máxima para el contenido es de cien (100) caracteres",
                        button1: "Crear",
                        button2: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: STEPS_NOTES_UI.CREATE_NOTE_TITLE };

                    const sanitizedInput = inputText.trim();

                    if (sanitizedInput.length > 100) {
                        player.sendClientMessage(Colors.LightRed, "El máximo de caracteres para el contenido es de cien (100).");
                        return { step: STEPS_NOTES_UI.CREATE_NOTE_CONTENT };
                    }

                    const noteTitle = manager.state.noteTitle!;
                    //const noteContent = manager.state.noteContent!;
                    
                    manager.state.noteContent = sanitizedInput;

                    this.createNote(noteTitle, sanitizedInput);

                    return { step: STEPS_NOTES_UI.NOTES_LIST };
                }
            },
            { // 4 -> Borrar nota.
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. ${redString(">")} Aplicación (${this.name}) ${redString(">")} Borrar nota`,
                        info: "Escribe el ID de la nota que quieres borrar.",
                        button1: "Borrar",
                        button2: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: STEPS_NOTES_UI.MAIN_MENU };

                    const id = Number(inputText.trim());
                    
                    if (isNaN(id)) {
                        player.sendClientMessage(Colors.LightRed, "El ID de la nota ingresado no es un valor numérico válido.");
                        return { step: STEPS_NOTES_UI.DELETE_NOTE };
                    }

                    const note = this.getNote(id);

                    if (!note) {
                        player.sendClientMessage(Colors.LightRed, "No se encontró ninguna nota con ese ID.");
                        return { step: STEPS_NOTES_UI.DELETE_NOTE };
                    }

                    this.deleteNote(id);

                    return { step: STEPS_NOTES_UI.MAIN_MENU };
                }
            },
            { // 5 -> Ver nota.
                dialog: (state) => {
                    const selectedNote = this.getNotes().at(state.selectedNoteIndex!)!;
                    console.log({ selectedNoteIndex: state.selectedNoteIndex });
                    console.log(selectedNote);

                    return {
                        style: "MSGBOX",
                        caption: `H. ${redString(">")} Aplicación (${this.name}) ${redString(">")} Notas ${redString(">")} "${selectedNote.title}"`,
                        info: selectedNote.content,
                        button1: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    return { step: STEPS_NOTES_UI.NOTES_LIST };
                }
            }
        ];

        manager.setDialogs(steps);
        await manager.start();
    }
}