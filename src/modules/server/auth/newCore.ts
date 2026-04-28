import type { BloodType, Continent, Country, Ethnicity, EyesType, HairType, ICharacter, ICharacterDocument, IUserDocument } from "@database/index";
import CharacterModel, { BLOOD_TYPES, CONTINENTS, ETHNICITIES, EYES_TYPES, HAIR_TYPES } from "@database/schemas/character";
import User from "@database/schemas/user";
import { Dialog, DialogStylesEnum, Dynamic3DTextLabel, DynamicActor, GameText, Player, PlayerEvent } from "@infernus/core";
import { logger } from "@logger";
import { DialogManager, type DialogsData } from "@managers/DialogManager";
import { showInfoForPlayer } from "@modules/filterscripts";
import { PlayerPositionTracker } from "@modules/player/tracking";
import { playerHealthArmor } from "@modules/wounds";
import type { ICoordinates } from "@utils/interfaces/coordinates";
import bcrypt from "bcryptjs";
import moment from "moment";
import { CustomPlayerEvent, triggerLogin, triggerLogout } from "src/classes/events/CustomEvent";
import { genCode, LanguageData, Sleep } from "../assets";
import { ClearChat, ProximityDetector } from "../chat";
import { Colors, setStringColor } from "../colors";
import { DEBUG_MODE, SERVER_VERSION } from "../config";
import { getMapZoneName3D, getStreetName } from "../streets";
import { commandPerms, createAccount, createCharacter, EMAIL_REGEX, setCameraRandomLogin } from "./functions";

// -----------------------------------------------------------------------------------------------------------

interface ISignupState {
    username: string;
    email: string;
    password: string;
}


interface ILoginState {
    username: string;
    attempts: number;
    loggedIn: boolean;
    user: IUserDocument | null;
}


interface ICharacterCreationState {
    name: string;
    genre: "male" | "female";
    age: number;
    height: number;
    weight: number;
    blood: BloodType;
    ethnicity: Ethnicity;
    hair: HairType;
    eyes: EyesType;
    continent: Continent;
    country: Country;
}

type CharacterState = ICharacterDocument | "CREATE" | null;


// -----------------------------------------------------------------------------------------------------------


const RED_ARROW = "{FF6359}>{C3C3C3}";
const RED_DOT = "{FF6359}*{C3C3C3}"
const RED_QUOTE = "{FF6359}'{C3C3C3}"

const formatHeight = (heightInCentimeters: number): string => {
    const h = heightInCentimeters.toString().split("");
    const [meters, ...centimeters] = h;

    return `${meters}.${centimeters.join("")}m`;
}

const calculateIMC = (heightInCentimeters: number, weight: number): string => {
    const heightInMeters = heightInCentimeters / 100;
    const imc = Math.round(weight / (heightInMeters ** 2));

    if (imc >= 30) return "Obesidad";
    if (imc >= 25) return "Sobrepeso";
    if (imc >= 18.5) return "Saludable";
    if (imc >= 17) return "Delgado/a";
    return "Bajo peso";
}


// -----------------------------------------------------------------------------------------------------------

class AuthService {
    static async validateCredentials(nameOrEmail: string, passwordInput: string): Promise<IUserDocument | null> {
        const user = await User.findOne({
            $or: [{ name: nameOrEmail }, { email: nameOrEmail }] 
        });

        if (!user) return null;

        const correctCredentials = await bcrypt.compare(passwordInput, user.password);
        
        if (DEBUG_MODE) return user;
        return correctCredentials ? user : null;
    }
    
    static async userExists(nameOrEmaiL: string): Promise<boolean> {
        const user = await User.exists({ $or: [{ name: nameOrEmaiL }, { email: nameOrEmaiL }] });
        return !!user;
    }

    static async characterExists(name: string): Promise<boolean> {
        const character = await CharacterModel.exists({ name });
        return !!character;
    }

    static async isEmailRegistered(email: string): Promise<boolean> {
        const user = await User.findOne({ email });
        return !!user;
    }
}


// -----------------------------------------------------------------------------------------------------------


class CharacterSessionService {
    async getCharacters(accountID: string): Promise<ICharacterDocument[]> {
        return CharacterModel.find({ accountID });
    }

    async saveData(player: Player, _pos?: ICoordinates & { cX: number; cY: number; cZ: number; }) {
        if (!player.dbId) return;
        if (!player.character) return;
        
        const { x: pX, y: pY, z: pZ } = player.getPos();
        const { x: cX, y: cY, z: cZ } = player.getCameraPos();

        const { health, kevlar } = playerHealthArmor.get(player)!;

        const pos = _pos || {
            x: pX, y: pY, z: pZ, cX, cY, cZ,
            int: player.getInterior(),
            vw: player.getVirtualWorld()
        };

        const { x, y, z, int ,vw } = pos;

        try {
            await player.character.updateOne({
                $set: {
                    lastConnection: Date.now(),
                    health, kevlar,
                    skin: { id: player.getSkin() } satisfies ICharacter["skin"],
                    coordinates: {
                        x, y, z,
                        interior: int,
                        virtualWorld: vw,
                        camera: { x: cX, y: cY, z: cZ }
                    } satisfies ICharacter["coordinates"]
                }
            });

            /* await CharacterModel.findByIdAndUpdate(player.dbId, {
                $set: {
                    lastConnection: Date.now(),
                    health, kevlar,
                    skin: { id: player.getSkin() } satisfies ICharacter["skin"],
                    coordinates: {
                        x, y, z,
                        interior: int,
                        virtualWorld: vw,
                        camera: { x: cX, y: cY, z: cZ }
                    } satisfies ICharacter["coordinates"]
                }
            }); */
        } catch (error) {
            logger.error(`[CharacterSessionService] Error al intentar guardar el personaje:`, error);
        }

        // TODO: Mover a AccountSessionService.
        try {
            await User.findOneAndUpdate(
                { id: player.accountId },
                {
                    $set: { lastConnection: Date.now() }
                }
            );

        } catch (error) {
            logger.error(`[CharacterSessionService] Error al intentar guardar la cuenta:`, error)
        }
    }

    isSessionActive(player: Player): boolean {
        return player.isLoggedIn;
    }

    closeSession(player: Player) {
        playerHealthArmor.delete(player);
        player.resetMoney();
        player.resetWeapons();
        player.setVirtualWorld(0);
        player.setInterior(0);
        player.toggleSpectating(true);

        player.isLoggedIn = false;
    }

    async setSession(player: Player, character: ICharacterDocument) {
        const user = await User.findOne({ id: character.accountID });
        if (!user) return;

        if (this.isSessionActive(player)) this.closeSession(player);

        player.dbId = character.ID;
        player.playerName = player.getName().name;
        player.character = character;
        player.isLoggedIn = true;
    }
}


class AccountSessionService {
    isSessionActive(player: Player): boolean {
        return !!player.accountId;
    }

    closeSession(player: Player) {
        player.accountId = null;
        player.accountName = null;
    }

    async setSession(player: Player, user: IUserDocument) {

        if (this.isSessionActive(player)) {
            if (player.accountId === user.id) return;
            this.closeSession(player);
        }

        player.accountId = user.id;
        player.accountName = user.name;
        player.account = user;
    }
}


// -----------------------------------------------------------------------------------------------------------

class CharacterSelectionService {
    private _character: ICharacterDocument | null = null;

    selectCharacter(character: ICharacterDocument) {
        this._character = character;
        return this;
    }

    private setupPlayer(player: Player) {
        if (!this._character) {
            logger.error("No hay un personaje asignado para preparar al jugador.");
            return;
        }

        const { name, health, kevlar, coordinates, skin, level } = this._character;
        const { x, y, z, interior, virtualWorld } = coordinates;

        // Config.
        player.setSpawnInfo(0, skin.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        
        player.setName(name);
        //player.setScore(level.actual);
        //player.setSkin(skin.id);
        player.setColor(0xFFFFFF00);

        // Health & Kevlar.
        //if (!playerHealthArmor.has(player)) playerHealthArmor.set(player, { health, kevlar });
        playerHealthArmor.set(player, { health, kevlar });
        player.setHealth(health);
        player.setArmour(kevlar);

        // Positioning.
        player.toggleSpectating(false);
        player.setInterior(interior);
        player.setVirtualWorld(virtualWorld);
        player.setPos(x, y, z);
        player.setCameraBehind();

        // UI.
        const lastConnection = moment(this._character.lastConnection).format("LLLL");

        ClearChat(player);

        new GameText(`~h~~h~${name}~h~~h~`, 3000, 8).forPlayer(player);

        player.sendClientMessage(Colors.Yellow, `SERVIDOR: Bienvenido a Haworth Roleplay - Versión ${SERVER_VERSION}`);
        player.sendClientMessage(Colors.Grey, `${setStringColor('[!]', "Red", Colors.Grey)} Utiliza '/ayuda' para ver la lista de comandos disponibles.`);
        player.sendClientMessage(Colors.Grey, `Última conexión: ${lastConnection}.`);

        player.toggleControllable(false);
        showInfoForPlayer(player, "~y~Sincronizando con el servidor, aguarda...", 4000);
        setTimeout(() => player.toggleControllable(true), 4000);

        // Permissions.
        commandPerms.set(player, true);
    }

    async spawn(player: Player) {
        if (!this._character) {
            logger.error("No hay un personaje asignado para spawnear.");
            return;
        }

        player.playSound(1055);

        this.setupPlayer(player);
    }

    async playCinematic(player: Player) {
        if (!this._character) {
            logger.error("No hay un personaje asignado para mostrar la cinemática.");
            return;
        }

        const { x, y, z, virtualWorld, interior } = this._character.coordinates;

        const actor = new DynamicActor({
            modelId: this._character.skin.id,
            x, y, z, 
            r: 0,
            interiorId: interior,
            worldId: virtualWorld,
            invulnerable: true,
            health: 100,
            //streamDistance: 300
        }).create();

        const nameTagLabel = new Dynamic3DTextLabel({
            charset: "win1252",
            text: `Iniciando sesión...\n${this._character.name.replace("_", " ")} (${player.id})`,
            color: "#FFFFFF",
            x, y: y - 0.05, z: z + 1.05,
            interiorId: interior,
            worldId: virtualWorld,
            drawDistance: 5
        }).create();

        const lookAtZ = z + 1.0;
        const steps = [150, 100, 50];
        let currentZ = z + (steps[0] + 100);

        player.setVirtualWorld(0);
        player.setInterior(0);

        player.setCameraPos(x, y, currentZ);
        player.setCameraLookAt(x, y, lookAtZ);

        const OFFSET_STEP_TIME = 1500;

        for (const offset of steps) {
            if (!player.isConnected()) break; // Seguridad si se desconecta en medio.

            player.playSound(1054);

            const nextZ = z + offset;
            player.interpolateCameraPos(x, y, currentZ, x, y, nextZ, OFFSET_STEP_TIME);
            player.interpolateCameraLookAt(x, y, lookAtZ, x, y, lookAtZ, OFFSET_STEP_TIME);
            
            currentZ = nextZ;
            await Sleep(OFFSET_STEP_TIME);
        }

        player.playSound(1055);

        // Limpieza.
        if (actor.isValid()) actor.destroy();
        if (nameTagLabel.isValid()) nameTagLabel.destroy();

        this.setupPlayer(player);
    }
}


// -----------------------------------------------------------------------------------------------------------


class DialogAuthService {
    constructor(
        private readonly characterSelectionSession: CharacterSelectionService,
        private readonly accountSessionService: AccountSessionService,
        private readonly characterSessionService: CharacterSessionService
    ) {};

    async getCharacter(player: Player, user: IUserDocument): Promise<ICharacterDocument | "RETURN_TO_PANEL"> {
        let character: CharacterState = null;

        while (!character) {
            character = await this.showCharacters(player, user);

            if (!character) return "RETURN_TO_PANEL";

            if (character === "CREATE") {
                await this.showCharacterCreation(player, user);
                character = await this.showCharacters(player, user);
                continue;
            }
        }

        return character as ICharacterDocument;
    }


    async showPanel(player: Player) {

        const PANEL_STEPS = {
            MAIN_MENU: 0,
            CONFIRM_EXIT: 1,
        } as const;

        const manager = new DialogManager({ player });

        const steps: DialogsData<{}>[] = [
            { // 0 -> Menú principal.
                dialog: (state) => {
                    const options = ["Iniciar sesión", "Registrarse", "Salir"];
                    const formattedOptions = options.map(o => `${RED_DOT}{FFFFFF} ${o}`);

                    return {
                        style: "LIST",
                        caption: `Haworth ${RED_ARROW} Panel de ingreso`,
                        info: formattedOptions.join("\n"),
                        button1: "O",
                        button2: "X"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PANEL_STEPS.CONFIRM_EXIT };

                    switch (listItem) {
                        case 0:
                        case 1: {
                            const user = !listItem
                                ? await this.showLogin(player)
                                : await this.showSignup(player);

                            if (!user) return { step: PANEL_STEPS.MAIN_MENU };

                            const character = await this.getCharacter(player, user);
                            if (character === "RETURN_TO_PANEL") return { step: PANEL_STEPS.MAIN_MENU };

                            const { interior, virtualWorld } = character.coordinates;
                            const isPlayerOnInterior = interior !== 0 && virtualWorld !== 0;

                            const selection = await this.characterSelectionSession.selectCharacter(character);

                            isPlayerOnInterior || DEBUG_MODE
                                ? await selection.spawn(player)
                                : await selection.playCinematic(player);

                            await this.accountSessionService.setSession(player, user);
                            await this.characterSessionService.setSession(player, character);
                            
                            await triggerLogin(player);

                            manager.stop();
                            break;
                        }

                        case 2: return { step: PANEL_STEPS.CONFIRM_EXIT };
                    }
                }
            },
            { // 1 -> Confirmar salida.
                dialog: (state) => ({
                    style: "MSGBOX",
                    caption: `H. ${RED_ARROW} Abandono de servidor`,
                    info: `{C3C3C3}¿Estás seguro? Confirma pulsando el botón ${RED_QUOTE}Confirmar${RED_QUOTE} para salir.`,
                    button1: "Confirmar",
                    button2: "Volver"
                }),
                run_logic: async ({ response, listItem, inputText } ) => {
                    if (!response) return { step: PANEL_STEPS.MAIN_MENU };

                    player.sendClientMessage(Colors.LightRed, "Saliendo del servidor...");
                    player.kick();
                    return manager.stop();
                }
            }
        ];

        manager.setDialogs(steps);
        await manager.start();
    }


    async showSignup(player: Player): Promise<IUserDocument | null> {
        const SIGNUP_DIALOG_STEPS = {
            NAME: 0,
            EMAIL: 1,
            PASSWORD: 2
        } as const;

        const manager = new DialogManager<ISignupState>({
            player,
            state: { username: "", email: "", password: "" }
        });

        const steps: DialogsData<ISignupState>[] = [
            { // 0 -> Ingresar nombre de la cuenta.
                dialog: (state) => ({
                    style: "INPUT",
                    caption: `H. ${RED_ARROW} Registro de cuenta ${RED_ARROW} Ingresar nombre`,
                    info: "Ingresa un nombre de usuario para registrarte.",
                    button1: "Ingresar",
                    button2: "Salir"
                }),
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) {
                        await this.showPanel(player);
                        return manager.stop();
                    }

                    const sanitizedInput = inputText.trim();

                    if (!sanitizedInput.length) return { step: SIGNUP_DIALOG_STEPS.NAME };

                    if (sanitizedInput.length < 2) {
                        player.sendClientMessage(Colors.LightRed, "Nombre cuenta muy corto. El mínimo de caracteres permitido es de 2.");
                        return { step: SIGNUP_DIALOG_STEPS.NAME };
                    }

                    if (sanitizedInput.length > 20) {
                        player.sendClientMessage(Colors.LightRed, "Nombre de cuenta muy largo. El máximo de caracteres permitido es de 20.");
                        return { step: SIGNUP_DIALOG_STEPS.NAME };
                    }

                    if (await AuthService.userExists(sanitizedInput)) {
                        player.sendClientMessage(Colors.LightRed, "Ya existe una cuenta con ese nombre. Por favor, intenta con otro.");
                        return { step: SIGNUP_DIALOG_STEPS.NAME };
                    }
                    
                    manager.state.username = sanitizedInput;
                }
            },
            { // 1 -> Ingresar correo de la cuenta.
                dialog: (state) => ({
                    style: "INPUT",
                    caption: `H. ${RED_ARROW} Registro de cuenta (${state.username}) ${RED_ARROW} Ingresar correo electrónico`,
                    info: `Ingresa un correo electrónico para registrarte.\n\n${RED_DOT} Es cambiable en un futuro, pero ten en cuenta que\nlo vas a necesitar en próximas actualizaciones.`,
                    button1: "Ingresar",
                    button2: "Volver"
                }),
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: SIGNUP_DIALOG_STEPS.NAME };

                    const sanitizedInput = inputText.trim();

                    if (!sanitizedInput.length) return { step: SIGNUP_DIALOG_STEPS.EMAIL };

                    if (!EMAIL_REGEX.test(sanitizedInput)) {
                        player.sendClientMessage(Colors.LightRed, "El correo ingresado es inválido.");
                        return { step: SIGNUP_DIALOG_STEPS.EMAIL };
                    }

                    if (await AuthService.isEmailRegistered(sanitizedInput)) {
                        player.sendClientMessage(Colors.LightRed, "El correo ingresado ya está utilizado en otra cuenta.");
                        player.sendClientMessage(Colors.LightRed, "En caso de pérdida, contacta con el equipo administrativo.");
                        return { step: SIGNUP_DIALOG_STEPS.EMAIL };
                    }

                    manager.state.email = sanitizedInput;
                }
            },
            {
                dialog: (state) => ({
                    style: "PASSWORD",
                    caption: `H. ${RED_ARROW} Registro de cuenta (${state.username}) ${RED_ARROW} Ingresar contraseña`,
                    info: `Ingresa una contraseña para finalizar el registro.\n\n${RED_DOT} Por cuestiones de seguridad, el mínimo es de ocho (8) caracteres.`,
                    button1: "Finalizar",
                    button2: "Volver"
                }),
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: SIGNUP_DIALOG_STEPS.EMAIL };

                    const sanitizedInput = inputText.trim();

                    if (!sanitizedInput.length) return { step: SIGNUP_DIALOG_STEPS.PASSWORD };

                    if (sanitizedInput.length < 8) {
                        player.sendClientMessage(Colors.LightRed, "La contraseña ingresada es muy corta. Asegúrate de cumplir el mínimo de ocho (8) caracteres.");
                        return { step: SIGNUP_DIALOG_STEPS.PASSWORD };
                    }

                    if (sanitizedInput.length > 60) {
                        player.sendClientMessage(Colors.LightRed, "La contraseña ingresada es muy larga.");
                        return { step: SIGNUP_DIALOG_STEPS.PASSWORD };
                    }

                    manager.state.password = sanitizedInput;
                }
            }
        ];

        manager.setDialogs(steps);
        await manager.start();

        const { username, email, password } = manager.state;

        const user = await createAccount({
            name: username,
            email, password
        });

        return user;
    }


    async showLogin(player: Player): Promise<IUserDocument | null> {

        const LOGIN_DIALOG_STEPS = {
            NAME_OR_EMAIL: 0,
            PASSWORD: 1,
        } as const;
        
        const manager = new DialogManager<ILoginState>({ 
            player, 
            state: {
                username: "", 
                attempts: 3, 
                loggedIn: false, 
                user: null 
            } 
        });

        const steps: DialogsData<ILoginState>[] = [
            { // 0 -> Ingresar email o nombre de la cuenta.
                dialog: (state) => ({
                    style: "INPUT",
                    caption: `H. ${RED_ARROW} Ingreso al servidor`,
                    info: "Ingresa el nombre de usuario o correo electrónico de tu cuenta para identificarte.",
                    button1: "Ingresar",
                    button2: "Salir"
                }),
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return manager.stop();
                    
                    const sanitizedInput = inputText.trim();

                    if (!sanitizedInput.length) {
                        //player.sendClientMessage(Colors.LightRed, "Asegúrate de ingresar un nombre de usuario o correo electrónico");
                        return { step: LOGIN_DIALOG_STEPS.NAME_OR_EMAIL };
                    }

                    const userExists = await AuthService.userExists(sanitizedInput);

                    if (sanitizedInput.length < 3 || !userExists) {
                        player.sendClientMessage(Colors.LightRed, "Asegúrate de ingresar un nombre de usuario o correo electrónico válido.");
                        return { step: LOGIN_DIALOG_STEPS.NAME_OR_EMAIL };
                    }

                    manager.state.username = sanitizedInput;
                },
            },
            { // 1 -> Introducir contraseña de la cuenta.
                dialog: (state) => ({
                    style: "PASSWORD",
                    caption: `H. ${RED_ARROW} Ingreso al servidor (${state.username})`,
                    info: "Introduce la contraseña.",
                    button1: "Ingresar",
                    button2: "Atrás"
                }),
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: LOGIN_DIALOG_STEPS.NAME_OR_EMAIL };

                    const username = manager.state.username;
                    const sanitizedInput = inputText.trim();

                    const user = await AuthService.validateCredentials(username, sanitizedInput);

                    if (!user) {
                        manager.state.attempts--;

                        if (manager.state.attempts <= 0) {
                            player.sendClientMessage(Colors.LightRed, "Te has quedado sin intentos para iniciar sesión, saliendo...");
                            player.kick();
                            return manager.stop();
                        }

                        player.sendClientMessage(Colors.LightRed, `Contraseña incorrecta. Te quedan ${manager.state.attempts} aún.`);

                        return { step: LOGIN_DIALOG_STEPS.PASSWORD };
                    }

                    manager.state.user = user;

                    return manager.stop();
                }
            }
        ];

        manager.setDialogs(steps);
        await manager.start();

        return manager.state.user;
    }


    async showCharacters(player: Player, user: IUserDocument): Promise<CharacterState> {
        const characters = await this.characterSessionService.getCharacters(user.id);

        const CREATE_CHARACTER_OPTION = "Crear nuevo personaje...";

        const formattedCharacters = characters.map(character => {
            const lastConnection = moment(character.lastConnection).format("L LTS");

            const { x, y, z } = character.coordinates;
            const zone = `${getStreetName(x, y)}, ${getMapZoneName3D(x, y, z)}`;

            return `{FFFFFF}${character.name.replace("_", " ")}\t${lastConnection}\t{FFCC80}${zone}`;
        });

        const options = !characters.length
            ? CREATE_CHARACTER_OPTION : `${formattedCharacters.join("\n")}\n${CREATE_CHARACTER_OPTION}`;

        const dialog = new Dialog({
            style: DialogStylesEnum.TABLIST_HEADERS,
            caption: `${user.name} ${RED_ARROW} Selección de personaje`,
            info: `Personaje\tÚltima conexión\tUbicación\n${options}`,
            button1: "Acceder",
            button2: "Salir"
        });
   
        const { response, listItem } = await dialog.show(player);

        if (!response) return null;

        if (!characters.length && !listItem) return "CREATE";
        if (characters.length > 0 && listItem > characters.length - 1) return "CREATE";

        const character = characters[listItem];

        return character;
    }


    async showCharacterCreation(player: Player, user: IUserDocument): Promise<ICharacterDocument | null> {
        const CREATE_CHARACTER_STEPS = {
            MAIN_MENU: 0,
            DEFINE_NAME: 1,
            GENRE: 2,
            PROFILE_AGE: 3,
            PROFILE_HEIGHT: 4,
            PROFILE_WEIGHT: 5,
            PROFILE_BLOOD: 6,
            PROFILE_ETHNICITY: 7,
            PROFILE_HAIR: 8,
            PROFILE_EYES: 9,
            PROFILE_CONTINENT: 10,
            PROFILE_COUNTRY: 11,
            CONFIRM_CREATION: 12
        } as const;

        const manager = new DialogManager<ICharacterCreationState>({
            player,
            state: {
                name: "",
                genre: "male",
                age: 16,
                height: 165,
                weight: 55,
                blood: "A+",
                ethnicity: "Caucásico",
                hair: "Castaño",
                eyes: "Café",
                continent: "América del Norte",
                country: "Estados Unidos"
            }
        });

        const steps: DialogsData<ICharacterCreationState>[] = [
            { // 0 -> Menú principal.
                dialog: (state) => {
                    const formattedName = state.name ? state.name.replace("_", " ") : "Sin definir";
                    const formattedGenre = state.genre === "male" ? "Masculino" : "Femenino";
                    const formattedHeight = formatHeight(state.height);
                    const formattedWeight = `${state.weight}kg (${calculateIMC(state.height, state.weight)})`;
    
                    return {
                        style: "TABLIST",
                        caption: `H. ${RED_ARROW} Creación de personaje`,
                        info: `Nombre\t${formattedName}\nGénero\t${formattedGenre}\nEdad\t${state.age} años\nAltura\t${formattedHeight}\nPeso\t${formattedWeight}\nTipo de sangre\t${state.blood}\nEtnia\t${state.ethnicity}\nEstilo de cabello\t${state.hair}\nColor de ojos\t${state.eyes}\nContinente\t${state.continent}\nPaís\t${state.country}\nConfirmar creación.`,
                        button1: "Crear",
                        button2: "Cancelar"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) {
                        manager.state.name = "";
                        return manager.stop();
                    }
    
                    switch (listItem) {
                        case 0:  return { step: CREATE_CHARACTER_STEPS.DEFINE_NAME  };
                        case 1:  return { step: CREATE_CHARACTER_STEPS.GENRE };
                        case 2:  return { step: CREATE_CHARACTER_STEPS.PROFILE_AGE };
                        case 3:  return { step: CREATE_CHARACTER_STEPS.PROFILE_HEIGHT };
                        case 4:  return { step: CREATE_CHARACTER_STEPS.PROFILE_WEIGHT };
                        case 5:  return { step: CREATE_CHARACTER_STEPS.PROFILE_BLOOD };
                        case 6:  return { step: CREATE_CHARACTER_STEPS.PROFILE_ETHNICITY };
                        case 7:  return { step: CREATE_CHARACTER_STEPS.PROFILE_HAIR };
                        case 8:  return { step: CREATE_CHARACTER_STEPS.PROFILE_EYES };
                        case 9:  return { step: CREATE_CHARACTER_STEPS.PROFILE_CONTINENT };
                        case 10: return { step: CREATE_CHARACTER_STEPS.PROFILE_COUNTRY };
                        case 11: {
                            if (manager.state.name !== "") return manager.stop(); // Creación finalizada.
    
                            player.sendClientMessage(Colors.Red, "No puedes crear el personaje sin haberle definido un nombre.");
                            return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                        }
                        default: return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                    }
                }
            },
            { // 1 -> Definir nombre.
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. ${RED_ARROW} Creación de personaje > Definir nombre`,
                        info: "Defina el nombre de su personaje a continuación.\n\nNo olvide de seguir el formato Nombre_Apellido.",
                        button1: "Definir",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    const sanitizedInput = inputText.trim();
    
                    const ROLEPLAY_NAME_REGEX = /^[A-Z][a-z]+_[A-Z][a-z]+$/g;
                    
                    if (!ROLEPLAY_NAME_REGEX.test(sanitizedInput)) {
                        player.sendClientMessage(Colors.Red, "El nombre ingresado no sigue el formato Nombre_Apellido.");
                        return { step: CREATE_CHARACTER_STEPS.DEFINE_NAME };
                    }
    
                    if (sanitizedInput.length < 6) {
                        player.sendClientMessage(Colors.Red, "El nombre ingresado es muy corto, considere uno más largo (mínimo de 6 caracteres).");
                        return { step: CREATE_CHARACTER_STEPS.DEFINE_NAME };
                    }
    
                    if (sanitizedInput.length > 25) {
                        player.sendClientMessage(Colors.Red, "El nombre ingresado es muy largo, considere uno más corto (máximo de 25 caracteres).");
                        return { step: CREATE_CHARACTER_STEPS.DEFINE_NAME };
                    }

                    if (await AuthService.characterExists(sanitizedInput)) {
                        player.sendClientMessage(Colors.LightRed, "Ya existe un personaje con ese nombre. Por favor, intenta con otro.");
                        return { step: CREATE_CHARACTER_STEPS.DEFINE_NAME };
                    }
    
                    manager.state.name = sanitizedInput;
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 2 -> Seleccionar género.
                dialog: (state) => {
                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Seleccionar género`,
                        info: "Masculino\nFemenino",
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    const options = ["male", "female"] as const; 
    
                    manager.state.genre = options[listItem];
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 3 -> Indicar edad.
                // info: "Defina el nombre de su personaje a continuación.\n\nNo olvide de seguir el formato Nombre_Apellido.",
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Indicar edad`,
                        info: "Indique la edad de su personaje a continuación.\n\nEl mínimo actualmente está en dieciséis (16) años y el máximo en cien (100).",
                        button1: "Indicar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    const age = parseInt(inputText.trim());
    
                    if (isNaN(age)) {
                        player.sendClientMessage(Colors.Red, "La edad indicada no es un número válido.");
                        return { step: CREATE_CHARACTER_STEPS.PROFILE_AGE };
                    }
    
                    if (age < 16 || age > 100) {
                        player.sendClientMessage(Colors.Red, "La edad indicada no está dentro del rango válido. Asegúrese de colocar un valor entre 16 y 100.");
                        return { step: CREATE_CHARACTER_STEPS.PROFILE_AGE };
                    }
    
                    manager.state.age = age;
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 4 -> Indicar altura
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Indicar altura`,
                        info: "Indique la altura de su personaje a continuación.\n\nAsegúrese de colocar un valor en centímetros entre ciento cuarenta (140) y doscientos diez (210).",
                        button1: "Indicar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    const height = parseInt(inputText.trim());
    
                    if (isNaN(height)) {
                        player.sendClientMessage(Colors.Red, "La altura indicada no es un número válido.");
                        return { step: CREATE_CHARACTER_STEPS.PROFILE_HEIGHT };
                    }
    
                    if (height < 140 || height > 210) {
                        player.sendClientMessage(Colors.Red, "La altura indicada no está dentro del rango válido. Asegúrese de colocar un valor entre 140 y 210.");
                        return { step: CREATE_CHARACTER_STEPS.PROFILE_HEIGHT };
                    }
    
                    manager.state.height = height;
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 5 -> Indicar peso
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Indicar peso`,
                        info: "Indique el peso de su personaje a continuación.\n\nAsegúrese de color un valor entre treinta y cinco (35) y doscientos (200).",
                        button1: "Indicar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    const weight = parseInt(inputText.trim());
    
                    if (isNaN(weight)) {
                        player.sendClientMessage(Colors.Red, "El peso indicado no es un número válido.");
                        return { step: CREATE_CHARACTER_STEPS.PROFILE_WEIGHT };
                    }
    
                    if (weight < 35 || weight > 200) {
                        player.sendClientMessage(Colors.Red, "El peso indicado no está dentro del rango válido. Asegúrese de colocar un valor entre 35 y 200.");
                        return { step: CREATE_CHARACTER_STEPS.PROFILE_WEIGHT };
                    }
    
                    manager.state.weight = weight;
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 6 -> Seleccionar tipo de sangre.
                dialog: (state) => {
                    const formattedBloodTypes = BLOOD_TYPES.map(b => `${RED_DOT} ${b}`).join("\n");

                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Seleccionar tipo de sangre`,
                        info: formattedBloodTypes,
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    manager.state.blood = BLOOD_TYPES[listItem];
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 7 -> Seleccionar etnia.
                dialog: (state) => {
                    const formattedEthnicities = ETHNICITIES.map(e => `${RED_DOT} ${e}`).join("\n");

                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Seleccionar etnia`,
                        info: formattedEthnicities,
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    manager.state.ethnicity = ETHNICITIES[listItem];
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 8 -> Seleccionar tipo de cabello
                dialog: (state) => {
                    const formattedHairs = HAIR_TYPES.map(h => `${RED_DOT} ${h}`).join("\n");

                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Seleccionar estilo de cabello`,
                        info: formattedHairs,
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    manager.state.hair = HAIR_TYPES[listItem];
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 9 -> Seleccionar color de ojos.
                dialog: (state) => {
                    const formattedEyes = EYES_TYPES.map(e => `${RED_DOT} ${e}`).join("\n");

                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Seleccionar color de ojos`,
                        info: formattedEyes,
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    manager.state.eyes = EYES_TYPES[listItem];
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 10 -> Seleccionar continente.
                dialog: (state) => {
                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Seleccionar continente`,
                        info: Object.keys(CONTINENTS).join("\n"),
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    const options = Object.keys(CONTINENTS);
    
                    manager.state.continent = options[listItem] as Continent;
    
                    const countries = CONTINENTS[manager.state.continent] as readonly Country[];
                    if (!countries.includes(manager.state.country)) manager.state.country = countries[0];
    
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            },
            { // 11 -> Seleccionar país en base al continente (diálogo paginado).
                dialog: (state) => {
                    const selectedContinentCountries = [...CONTINENTS[state.continent]] as Country[];
    
                    return {
                        style: "LIST",
                        caption: `H. ${RED_ARROW} Creación de personaje ${RED_ARROW} Selección de país (${state.continent})`,
                        info: selectedContinentCountries,
                        paginated: true,
                        button1: "Seleccionar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
    
                    const selectedContinentCountries = [...CONTINENTS[manager.state.continent]] as Country[];
    
                    manager.state.country = selectedContinentCountries[listItem];
                    return { step: CREATE_CHARACTER_STEPS.MAIN_MENU };
                }
            }
        ];

        manager.setDialogs(steps);
        await manager.start();

        const { name, genre, ...profile } = manager.state;
        
        if (name === "") return null;
    
        const character = await createCharacter(user.id, { name, genre, profile });
        return character;
    }
}


// -----------------------------------------------------------------------------------------------------------


export const characterSessionService = new CharacterSessionService();
export const accountSessionService = new AccountSessionService();
export const characterSelectionService = new CharacterSelectionService();

export const dialogAuthService = new DialogAuthService(
    characterSelectionService,
    accountSessionService,
    characterSessionService
);


// -----------------------------------------------------------------------------------------------------------


const isPlayerUsingDL = (player: Player): boolean => {
    return player.getVersion().version.includes("0.3.DL");
}


PlayerEvent.onAndroidCheck(async ({ player, result, next }) => {
    if (!result) return next();

    player.sendClientMessage(Colors.Skin, "Tu cliente de juego no es compatible con esta versión de Haworth.");
    //player.sendClientMessage(Colors.WrongSintaxis, `Ingresa a '${setStringColor("haworth.gg/how-to-play", "Bordo", Colors.WrongSintaxis)}' para obtener más información sobre cómo jugar.`);
    player.sendClientMessage(Colors.Skin, "Ingresa al servidor con la versión 0.3.DL (PC).");

    player.kick();

    return next();
});


PlayerEvent.onConnect(async ({ player, next }) => {
    commandPerms.set(player, false);

    player.setColor("#000000");
    player.setName(genCode(8));
    player.setTeam(0);
    player.toggleSpectating(true);
    
    player.locale  = LanguageData.Locale;
    player.charset = LanguageData.Charset;

    if (!isPlayerUsingDL(player)) {
        player.sendClientMessage(Colors.Skin, "Tu cliente de juego no es compatible con esta versión de Haworth.");
        //player.sendClientMessage(Colors.WrongSintaxis, `Ingresa a '${setStringColor("haworth.gg/how-to-play", "Bordo", Colors.WrongSintaxis)}' para obtener más información sobre cómo jugar.`);
        player.sendClientMessage(Colors.Skin, "Ingresa al servidor con la versión 0.3.DL.");

        player.kick();
        return next();
    }

    Sleep(2000);
    player.sendClientMessage(Colors.Skin, "Espere mientras carga el servidor...");

    setTimeout(async () => {
        setCameraRandomLogin(player);
        await dialogAuthService.showPanel(player);
    }, 5_000);

    return next();
});


PlayerEvent.onDisconnect(async ({ player, reason, next }) => {

    await triggerLogout(player);
    //CustomPlayerEventTrigger.onLogout(player);

    // ---------------------------------

    const responses = [
        'abandonó el servidor de forma involuntaria (Timeout/Crash)',
        'abandonó el servidor de forma voluntaria (/q)',
        'fue expulsado por un administrador (Kick/Ban)',
        'abandonó el servidor (Custom)',
        'abandonó el servidor (Mode End)',
    ] as const;

    const quitMsg = `(( ${player.getName(true).name} ${responses[reason]}. ))`;

    ProximityDetector({ radius: 15, player, color: "#B85066", message: quitMsg });

    return next();
});


// -----------------------------------------------------------------------------------------------------------


CustomPlayerEvent.onLogout(async ({ player, next }) => {
    PlayerPositionTracker.stopTracking(player);
    const trackedPos = PlayerPositionTracker.getLastKnownPosition(player);
    PlayerPositionTracker.clear(player);

    const { x, y, z } = trackedPos || player.getPos();

    const [pVw, pInt] = [player.getVirtualWorld(), player.getInterior()];
    const { vw = pVw, int = pInt } = trackedPos ?? {};

    const { x: cX, y: cY, z: cZ } = player.getCameraPos();
    const { cameraX = cX, cameraY = cY, cameraZ = cZ } = trackedPos ?? {};

    await characterSessionService.saveData(player, { x, y, z, int, vw, cX: cameraX, cY: cameraY, cZ: cameraZ });

    // ---------------------------------

    commandPerms.delete(player);
    playerHealthArmor.delete(player);

    characterSessionService.closeSession(player);
    accountSessionService.closeSession(player);

    return next();
})