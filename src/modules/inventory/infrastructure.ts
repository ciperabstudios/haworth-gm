import { CachedRepository, MongooseRepository } from "@utils/interfaces/repository";
import { Player, PlayerEvent } from "@infernus/core";
import { Document, model, Model, Schema } from "mongoose";
import type { HandOption, IPlayerInventory, IPlayerInventoryDB, IPlayerInventoryDocument, IPlayerInventoryModel, MaybeObject, PlayerHandsDomain, TPlayerPockets } from "./interfaces";
import { BaseObject, OBJECT_ATTACHMENT_CONFIG, objectService, WeaponObject } from "@modules/objects";
import { isEquipabble } from "@modules/objects/interface";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";
//import { attachableRegistry } from "@modules/attachables/registry";




//type TAttachmentObjectConfig = Omit<IAttachedObject, "materialColor1" | "materialColor2" | "modelId"> & Partial<Pick<IAttachedObject, "materialColor1" | "materialColor2">>;

export const DEFAULT_FSCALE = { fScaleX: 1, fScaleY: 1, fScaleZ: 1 } as const;
export const DEFAULT_ATTACHMENT_DATA = { fX: 0, fY: 0, fZ: 0, fRotX: 0, fRotY: 0, fRotZ: 0, ...DEFAULT_FSCALE } as const;


/* const DEFAULT_HANDS_ATTACHMENT_CONFIG: Record<HandOption, TAttachmentObjectConfig> = {
  left: { bone: BoneIdsEnum.LeftHand, ...DEFAULT_ATTACHMENT_DATA },
  right: { bone: BoneIdsEnum.RightHand, ...DEFAULT_ATTACHMENT_DATA },
} as const; */

const OBJECT_INDEX_SLOTS: Record<HandOption, number> = {
  right: 7,
  left: 8,
} as const;

// ----------------------------------------------------



const playerHandsSchema = new Schema<IPlayerInventoryDB["hands"]>({
    left: { type: String, default: null },
    right: { type: String, default: null }
}, { _id: false });

const playerInventorySchema = new Schema<IPlayerInventoryDocument, IPlayerInventoryModel>({
    playerName: { type: String, required: true, unique: true },
    hands: { type: playerHandsSchema, required: true },
    pockets: { type: [String], default: [], required: true }
});

const PlayerInventoryModel = model<IPlayerInventoryDocument, IPlayerInventoryModel>("player_inventories", playerInventorySchema);

// ----------------------------------------------------


export class PlayerHands {
    constructor(private data: PlayerHandsDomain) {}

    // --------------------------------------------

    getLeft(): MaybeObject {
        return this.data.left;
    }

    getRight(): MaybeObject {
        return this.data.right;
    }

    // --------------------------------------------

    isHandBusy(hand: HandOption): boolean {
        return !!this.data[hand];
    }

    areHandsEmpty(): boolean {
        return !this.data["left"] && !this.data["right"];
    }

    // --------------------------------------------

    grabObject(hand: HandOption, objId: string) {
        if (this.isHandBusy(hand)) throw new Error("La mano está ocupada.");

        const obj = objectService.findById(objId);
        if (!obj) throw new Error("No existe un objeto con esa ID.");

        this.data[hand] = obj;
    }

    throwObject(hand: HandOption): BaseObject<any> | void {
        const obj = this.data[hand];
        if (!obj) return;

        this.data[hand] = null;

        return obj;
    }

    // --------------------------------------------

    swap() {
        const left = this.data.left;
        const right = this.data.right;

        this.data.left = right;
        this.data.right = left;
    }
}


// ----------------------------------------------------

export class PlayerPockets {
    constructor (private data: TPlayerPockets) {}

    getAll(): readonly BaseObject<any>[] { 
        return [...this.data]; 
    }

    // --------------------------------------------

    hasObject(objId: string): boolean {
        return this.data.some(o => o.id === objId);
    }

    getObjectOnIndex(idx: number): BaseObject<any> | null {
        return this.data[idx] ?? null;
    }

    addObject(obj: BaseObject<any>) {
        if (!obj.id) throw new Error("Objeto inválido.");
        this.data.push(obj);
    }

    removeObject(objId: string): BaseObject<any> | void {
        const objIdx = this.data.findIndex(p => p && p.id === objId);
        if (objIdx === -1) return;

        return this.data.splice(objIdx, 1)[0];
    }
}


// ----------------------------------------------------

export class PlayerInventory {
    constructor (public readonly playerName: string, private data: IPlayerInventory) {}

    // --------------------------------------------

    debug() {
        console.log({
            hands: {
                left: this.data.hands.getLeft()?.id ?? null,
                right: this.data.hands.getRight()?.id ?? null,
            },
            pockets: this.data.pockets.getAll().map(o => ({...o}))
        });
    }

    // --------------------------------------------

    getHands() {
        return this.data.hands;
    }

    getPockets() {
        return this.data.pockets;
    }

    // --------------------------------------------

    storeObjectInPocket(hand: HandOption) {
        const hands = this.data.hands;
        if (!hands.isHandBusy(hand)) return;

        const obj = hands.throwObject(hand);
        if (!obj) return;

        this.data.pockets.addObject(obj);
    }

    putPocketObjectInHand(objIdx: number, hand: HandOption) {
        const pockets = this.data.pockets;
        const hands = this.data.hands;

        const obj = pockets.getObjectOnIndex(objIdx);
        if (!obj) return;

        if (hands.isHandBusy(hand)) return;

        pockets.removeObject(obj.id);
        hands.grabObject(hand, obj.id);
    }


}


// ----------------------------------------------------


class PlayerInventoryService {
    constructor(private readonly repository: CachedRepository<PlayerInventory>) {}

    get(player: Player): PlayerInventory | null {
        return this.repository.get(player.getName().name);
    }


    async save(playerName: string, inv: PlayerInventory, upsert: boolean = false) {
        await this.repository.save(playerName, inv, upsert || false);
    }


    async getOrCreate(player: Player): Promise<PlayerInventory> {
        const playerName = player.getName().name;

        const existing = await this.repository.findById(playerName);

        if (existing) {
            this.syncHands(player, existing);
            return existing;
        }

        const inv = this.createInventory(player);

        this.syncHands(player, inv);
        await this.repository.save(playerName, inv, true);

        return inv;
    }

    private createInventory(player: Player): PlayerInventory {
        const inv = new PlayerInventory(player.getName().name, {
            hands: new PlayerHands({ left: null, right: null }),
            pockets: new PlayerPockets([])
        });

        return inv;
    }

    private syncHands(player: Player, inventory: PlayerInventory): void {
        const hands = inventory.getHands();
        const left = hands.getLeft();
        const right = hands.getRight();

        this.dettachObject(player, "left");
        this.dettachObject(player, "right");
        player.resetWeapons();

        if (left) this.attachObject(player, "left", left.id);

        if (right) {
            isEquipabble(right)
                ? (right as WeaponObject).equip(player)
                : this.attachObject(player, "right", right.id);
        }
    }

    async grabObject(player: Player, hand: HandOption, objId: string): Promise<void> {
        const playerName = player.getName().name;

        const inv = await this.repository.findById(playerName);
        if (!inv) return;

        const hands = inv.getHands();

        if (hands.isHandBusy(hand)) return;
        if (hands.getLeft()?.id === objId || hands.getRight()?.id === objId) return;

        hands.grabObject(hand, objId);
    
        this.syncHands(player, inv);
        await this.repository.save(playerName, inv);
    }

    async swapHands(player: Player) {
        const playerName = player.getName().name;

        const inv = await this.repository.findById(playerName);
        if (!inv) return;

        inv.getHands().swap();

        this.syncHands(player, inv);
        await this.repository.save(playerName, inv);
    }

    async storeObjectInPocket(player: Player, hand: HandOption) {
        const playerName = player.getName().name;

        const inv = await this.repository.findById(playerName);
        if (!inv) return;

        inv.storeObjectInPocket(hand);
        this.syncHands(player, inv);

        await this.repository.save(playerName, inv);
    }

    async putPocketObjectInHand(player: Player, objIdx: number, hand: HandOption) {
        const playerName = player.getName().name;

        const inv = await this.repository.findById(playerName);
        if (!inv) return;

        inv.putPocketObjectInHand(objIdx, hand);
        this.syncHands(player, inv);

        await this.repository.save(playerName, inv);
    }

    async dropObject(player: Player, hand: HandOption) {
        const playerName = player.getName().name;

        const inv = await this.repository.findById(playerName);
        if (!inv) return;

        const hands = inv.getHands();
        if (!hands.isHandBusy(hand)) return;

        const handObj = hands.throwObject(hand);

        this.syncHands(player, inv);
        await this.repository.save(playerName, inv);

        return handObj;
    }

    // --------------------------------------------

    private async attachObject(player: Player, hand: HandOption, objId: string) {
        const obj = await objectService.findById(objId);
        if (!obj) return;

        const h = hand === "left" ? "LEFT_HAND" : "RIGHT_HAND";

        const attachData = OBJECT_ATTACHMENT_CONFIG[obj.attachTag][h];

        const { bone, fX, fY, fZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ } = attachData

        if (hand === "right" && isEquipabble(obj)) (obj as WeaponObject).equip(player);
        
        player.setAttachedObject(OBJECT_INDEX_SLOTS[hand], obj.modelId, bone, 
            fX, fY, fZ, fRotX, fRotY, fRotZ,
            fScaleX, fScaleY, fScaleZ,
        );
    }

    private dettachObject(player: Player, hand: HandOption) {
        player.removeAttachedObject(OBJECT_INDEX_SLOTS[hand]);
    }
}

// ----------------------------------------------------

class PlayerInventoryRepository extends MongooseRepository<PlayerInventory, IPlayerInventoryDB> {
    constructor() {
        super(
            PlayerInventoryModel as Model<IPlayerInventoryDB & Document>,
            (json: IPlayerInventoryDB) => new PlayerInventory(json.playerName, {
                hands: new PlayerHands({
                    left: json.hands.left ? objectService.findById(json.hands.left) : null,
                    right: json.hands.right ? objectService.findById(json.hands.right) : null,
                }),
                pockets: new PlayerPockets(
                    json.pockets
                        .map(id => objectService.findById(id))
                        .filter((o): o is BaseObject<any> => !!o)
                )
            }),
            (entity: PlayerInventory) => {
                const hands = entity.getHands();
                const pockets = entity.getPockets();

                return {
                    playerName: entity.playerName,
                    hands: {
                        left: hands.getLeft()?.id ?? null,
                        right: hands.getRight()?.id ?? null,
                    },
                    pockets: pockets.getAll().map(o => o.id)
                }
            },
            "playerName"
        )
    }
}



// ----------------------------------------------------


const playerInventoryDbRepo = new PlayerInventoryRepository();
const playerInventoryCacheRepo = new CachedRepository<PlayerInventory>(playerInventoryDbRepo);

export const playerInventoryService = new PlayerInventoryService(playerInventoryCacheRepo);


// ----------------------------------------------------

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    await playerInventoryService.getOrCreate(player);

    return next();
});

CustomPlayerEvent.onLogout(async ({ player, next }) => {
    const playerName = player.getName().name;

    const inv = await playerInventoryCacheRepo.get(playerName);
    if (!inv) return next();

    await playerInventoryCacheRepo.save(playerName, inv);
    playerInventoryCacheRepo.evict(playerName);
});


PlayerEvent.onUpdate(async ({ player, next }) => { // asd.pwn: 10186
    if (!player.isSpawned() || !player.isConnected()) return next();

    const inv = playerInventoryService.get(player);
    if (!inv) return next();

    const hands = inv.getHands();

    if (!hands.isHandBusy("right")) return next();

    const right = hands.getRight();
    if (!isEquipabble(right)) return next();

    const obj = right as WeaponObject;

    const currentWeaponId = player.getWeapon();
    const currentAmmo = player.getAmmo();

    if (currentWeaponId === obj.weaponId) {
        if (currentAmmo < obj.getAmmoCount()) {
            obj.setAmmoCount(currentAmmo);
            await objectService.save(obj);
            // await objectService.setAmmoCount(obj.id, currentAmmo);
        }
    }

    if (currentWeaponId !== obj.weaponId && obj.getAmmoCount() > 0) player.setArmedWeapon(obj.weaponId);

    if (obj.getAmmoCount() === 0) {
        if (currentWeaponId !== -1) player.setArmedWeapon(0);
    }

    return next();
});