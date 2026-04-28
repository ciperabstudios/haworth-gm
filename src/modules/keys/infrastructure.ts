import type { ICharacterDocument } from "@database/index";
import CharacterModel from "@database/schemas/character";
import { PlayerEvent, type Player } from "@infernus/core";
import { MongooseRepository } from "@utils/interfaces/repository";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";
import { AVAILABLE_OPTIONS, KEY_MAPPING, type ICommandKeys, type IKeys, type IKeyUpdate, type IPlayerKeys, type KeyBitsByGroup, type KeyMappingBits, type KeyMappingGroup, type KeyMappingLabel, type KeyOption, type KeyOptionAction, type KeyOptionData, type KeyOptionGroup } from "./definitions";
import Command from "@commands/Command";

class KeysRepository extends MongooseRepository<ICharacterDocument, ICharacterDocument> {
    constructor() {
        super(
            CharacterModel,
            (doc) => doc,
            (entity) => entity,
            "_id"
        );
    }

    async updatePlayerKeys(characterId: string, updates: IKeyUpdate[]): Promise<boolean> {
        const $set: Record<string, string> = {};
        const $unset: Record<string, ""> = {};

        for (const { state, key, action } of updates) {
            const path = `shortcutKeys.${state}.${key}`;

            action
                ? $set[path] = action
                : $unset[path] = "";
        }

        const updateOps: any = {};
        if (Object.keys($set).length > 0) updateOps["$set"] = $set;
        if (Object.keys($unset).length > 0) updateOps["$unset"] = $unset;

        if (!Object.keys(updateOps).length) return false;

        const result = await this.model.updateOne(
            { ID: characterId },
            updateOps
        );

        return result.modifiedCount > 0;
    }
}


// --------------------------------------------------------------------------

class KeyService {
    private cache: Map<number, IPlayerKeys> = new Map();

    private readonly REPEATED_KEY_COLOR = "FF4040"; // #FF4040
    private readonly NORMAL_KEY_COLOR   = "FF6347"; // #FF6347

    constructor(private readonly repository: KeysRepository) {};

    private _loadedKeys: Set<number> = new Set();

    // -----------------------------------------------

    loadKeys(player: Player, keys: IKeys) {
        if (this._loadedKeys.has(player.id)) return;
        if (!player.character) return;

        this.cache.set(player.id, structuredClone(keys));
        this._loadedKeys.add(player.id);
    }

    unloadKeys(player: Player) {
        if (!this._loadedKeys.has(player.id)) return;

        this.cache.delete(player.id);
        this._loadedKeys.delete(player.id);
    }

    getKeys(player: Player): IPlayerKeys | undefined {
        return this.cache.get(player.id);
    }

    // -----------------------------------------------

    updateKeysCache(player: Player, updates: IKeyUpdate[]) {
        const currentKeys = this.getKeys(player);
        if (!currentKeys) return;

        for (const { state, key, action } of updates) {
            action
                ? (currentKeys[state] as any)[key] = action
                : (currentKeys[state] as any)[key] = null
        }
    }

    async updateKeysDatabase(player: Player, updates: IKeyUpdate[]) {
        if (!player.character) return;

        await this.repository.updatePlayerKeys(player.character.ID, updates);
    }

    // -----------------------------------------------

    /**
     * Obtiene el nombre legible de una tecla dado su bitmask.
     * Ej: 4 -> "Control (Ctrl)"
    */
    getKeyLabelFromBits<O extends keyof typeof KEY_MAPPING>(bits: KeyMappingBits<O>, option: O): KeyMappingLabel<O> {
        return KEY_MAPPING[option][bits];
    }

    /**
     * Obtiene la data de una opción de tecla dada su clave interna.
     * Ej: "openInventory" -> ["openInventory", "Abrir el inventario"]
    */
    getDataFromKey<O extends keyof typeof AVAILABLE_OPTIONS>(key: KeyOption<O>, option: O): KeyOptionData<O> {
        // El '!' es seguro porque Available Options es constante
        return AVAILABLE_OPTIONS[option].find(([k]) => k === key)!;
    }

    /**
     * Obtiene la data dada la acción (descripción).
     * Útil para búsquedas inversas si las necesitas.
    */
    getDataFromAction<O extends keyof typeof AVAILABLE_OPTIONS>(action: KeyOptionAction<O>, option: O): KeyOptionData<O> {
        return AVAILABLE_OPTIONS[option].find(([, a]) => a === action)!;
    }

    /**
     * Obtiene la acción dado los bits pasados (tecla presionada).
    */
    getActionFromKeyPressed<S extends KeyOptionGroup>(player: Player, state: S, bits: KeyMappingBits<Exclude<S, "HYBRID">>): KeyOption<S> | null {
        const keys = this.getKeys(player);
        if (!keys) return null;
        
        const data = Object.entries(keys[state]).find(([a, b]) => b === bits) as [KeyOption<S>, KeyBitsByGroup<S> | null] | undefined;
        if (!data) return null;

        const [action, assignedBits] = data;

        return action;
    }

    /**
     * Verifica si una tecla está asignada a más de una acción en el mismo grupo.
    */
    isBitRepeated<T extends KeyMappingGroup>(shortcuts: Partial<Record<string, number | null>>, bit: KeyMappingBits<T>): boolean {
        let count = 0;

        for (const value of Object.values(shortcuts)) {
            if (value === bit) count++;
            if (count > 1) return true;
        }

        return false;
    }

    /**
     * Obtiene el color para mostrar en el diálogo (Naranja si es única, roja si es repetida).
    */
    getKeyColor<T extends KeyMappingGroup>(shortcuts: Partial<Record<string, number | null>>, bit: KeyMappingBits<T> | null): string {
        if (!bit) return this.NORMAL_KEY_COLOR;
        return this.isBitRepeated(shortcuts, bit) ? this.REPEATED_KEY_COLOR : this.NORMAL_KEY_COLOR;
    }


}



// --------------------------------------------------------------------------

const keysRepo = new KeysRepository();
export const keyService = new KeyService(keysRepo); 

// --------------------------------------------------------------------------

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    keyService.loadKeys(player, player.character!.toObject().shortcutKeys as IKeys);

    return next();
});


const linkedKeysCommands: ICommandKeys = {
    ON_FOOT: {
        joinInterior: "",
        exitInterior: "",
        openInventory: "inventory",
        openDoors: "",
        closeDoors: "",
        buyProducts: "",
        openPhone: "telefono",
        checkTrunk: "",
        checkVehicle: ""
    },

    IN_VEHICLE: {
        toggleEngine: "motor",
        toggleLights: "luces",
        toggleSeatbelt: "",
        toggleWindow: ""
    },

    HYBRID: {
        toggleLock: ""
    }
} as const;


PlayerEvent.onKeyStateChange(async ({ player, oldKeys, newKeys, next }) => {
    const playerState = (player.isInAnyVehicle() ? "IN_VEHICLE" : "ON_FOOT") as KeyMappingGroup;

    const action = keyService.getActionFromKeyPressed(player, playerState, newKeys as KeyMappingBits<typeof playerState>);
    if (!action) return next();

    const actionCommand = (linkedKeysCommands[playerState][action as keyof typeof linkedKeysCommands[typeof playerState]]) as string;
    if (actionCommand === "") return next();

    await Command.callCommand(player, actionCommand);

    return next();
});


CustomPlayerEvent.onLogout(async ({ player, next }) => {
    keyService.unloadKeys(player);

    return next();
});