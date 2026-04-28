import { Player } from "@infernus/core";
import type { IObject, ItemKind } from "./interface";

export interface IItemHandler {
    // Se ejecuta al usar el objeto.
    onUse?(player: Player, object: IObject, action?: string): Promise<void>;
    
    // Se ejecuta al recoger/equipar.
    onEquip?(player: Player, object: IObject): void;
}

class ItemRegistry {
    private handlers = new Map<ItemKind, IItemHandler>();

    register(kind: ItemKind, handler: IItemHandler) {
        this.handlers.set(kind, handler);
    }

    get(kind: ItemKind): IItemHandler | undefined {
        return this.handlers.get(kind);
    }
}

export const itemRegistry = new ItemRegistry();