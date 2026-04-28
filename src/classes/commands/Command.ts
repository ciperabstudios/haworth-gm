import { Player, PlayerEvent, type CmdBusCallback } from "@infernus/core";
import { showInfoForPlayer } from "@modules/filterscripts";
import { commandPerms } from "@modules/server/auth";
import { Colors } from "@modules/server/colors";


const COMMAND_TYPES = {
    "DEVELOPMENT": "Desarrollo",

    // — Player
    "PLAYER": {
        "ANIMATIONS": "Animaciones para el jugador",
        "CHAT":       "Chat del jugador",
        "EXTRAS":     "Contenido extra para el jugador",
        "NETWORK":    "Estadísticas de red del jugador",
        "ROLEPLAY":   "Interacciones de rol del jugador",
        "SETTINGS":   "Configuración del jugador",
        "VEHICLES":   "Interacción del jugador con vehículos",
    },

    // — Staff.
    "STAFF": {
        "JUNIOR":      "Características de un administrador Junior",
        "SEMI_SENIOR": "Características de un administrador SemiSenior",
    }

} as const;

type CommandTypes = typeof COMMAND_TYPES;

export type CommandCategory = keyof CommandTypes;
//type CommandSubCategory<T extends CommandCategory> = CommandTypes[T] extends string ? never : keyof CommandTypes[T];

export type CommandSubCategory<T extends CommandCategory> = T extends CommandCategory
    ? CommandTypes[T] extends string // El value de la categoría es un string en vez de un Record de subcategorías.
        ? never
        : keyof CommandTypes[T]
    : never;


export const COMMAND_CATEGORIES_TRANSLATIONS: Record<CommandCategory, string> = {
    "DEVELOPMENT": "Desarrollo",
    "PLAYER": "Jugador",
    "STAFF": "Administración"
} as const;

export const getCommandCategoryTranslation = <T extends CommandCategory>(category: T): string => COMMAND_CATEGORIES_TRANSLATIONS[category];
export const getCommandSubCategoryDescription = <T extends CommandCategory>(category: T, subcategory: CommandSubCategory<T>): string => (COMMAND_TYPES[category] as Record<string, string>)[subcategory];

type MaybePromise<T> = Promise<T> | T;
type CallbackRet = boolean | number | void;

export type MaybePromiseCallbackRet = MaybePromise<CallbackRet>;

type RunFunction = (params: CmdBusCallback) => MaybePromise<CallbackRet>;//Promise<CallbackRet> | CallbackRet;


interface BaseCommandProps {
    name: string;
    aliases?: string[];
    run: RunFunction;
};

export interface CommandStructure<T extends CommandCategory = CommandCategory> extends BaseCommandProps {
    category?: T;
    subcategory?: CommandSubCategory<T>;
    description: string;
    syntax?: string;
    dev?: boolean;
};


export default class Command<T extends CommandCategory = CommandCategory> {
    private static commands = new Map<string, Command<CommandCategory>>();

    name: string;

    category?: T;
    subcategory?: CommandSubCategory<T>;
    
    description: string;
    syntax?: string;
    aliases?: string[];
    dev?: boolean;
    run: RunFunction;

    constructor(props: CommandStructure<T>) {

        const { name, category, subcategory, description, syntax, aliases, dev, run } = props;

        this.name = name;
        this.description = description;
        this.run = run;
        if (category)    this.category = category;
        if (subcategory) this.subcategory = subcategory;
        if (syntax)      this.syntax = syntax;
        if (aliases)     this.aliases = aliases;
        if (dev)         this.dev = dev;

        Command.register(this);

        this.registerHandler();
    }

    protected registerHandler(): void {
        const commandNames = !this.aliases ? this.name : [this.name, ...this.aliases];
        
        PlayerEvent.onCommandText(commandNames, async (params: CmdBusCallback) => {
            if (!commandPerms.get(params.player)) return;
            await this.run(params);
        });
    }

    private static register<T extends CommandCategory>(command: Command<T>) {
        this.commands.set(command.name, command);
    }
    

    static getCommand(name: string): Command | undefined {
        return this.commands.get(name);
    }

    static getCommands(): Command[] {
        return [...this.commands.values()];
    }

    static getCommandsByCategory(category: string): Command[] | null {
        return this.getCommands().filter(commands => commands.category === category);
    }


    static callCommand(player: Player, cmdName: string, subcommand?: CmdBusCallback["subcommand"]) {
        const command = this.getCommand(cmdName);
        if (!command) return showInfoForPlayer(player, `~w~El comando ingresado no existe, usa ~g~/ayuda~w~`, 3000);

        const params: CmdBusCallback = {
            player,
            mainCommand: command.name,
            subcommand: subcommand || [],
            cmdText: subcommand?.join(" ") || "",
            buffer: Array.from(Buffer.from(subcommand?.join(" ") || "")),
            isStrict: true,
            next: () => {}
        }

        return command.run(params);
    }

    static getSyntax(commandName: string, player: Player) {
        const command = this.commands.get(commandName);

        if (!command) return showInfoForPlayer(player, `~r~~h~ERROR: ~s~Comando no encontrado.`, 3000);

        return player.sendClientMessage(-1, `{ff6347}[Sintaxis] {A3A3A3}${command.syntax || `/${command.name}`}`); 
    }

    static isValidId(player: Player, id: number) {

        if (isNaN(id)) {
            player.sendClientMessage(Colors.WrongSintaxis, "La ID ingresada no es numérica.");
            return false;
        }

        if (!Player.getInstance(+id)) {
            player.sendClientMessage(Colors.WrongSintaxis,  "El jugador está desconectado.");
            return false;
        }

        return true;
    }


    static _isValidId(player: Player, id: number): Player | false {
        if (isNaN(id)) {
            player.sendClientMessage(Colors.WrongSintaxis, "La ID ingresada no es numérica.");
            return false;
        }

        const playerInstance = Player.getInstance(id);

        if (!playerInstance) {
            player.sendClientMessage(Colors.WrongSintaxis,  "El jugador está desconectado.");
            return false;
        }

        return playerInstance;
    }

};