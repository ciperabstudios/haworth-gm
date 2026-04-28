import { type Player } from "@infernus/core";
import { WEAPON_MODELS, type IWeaponData, type WeaponAmmos } from "@modules/weapons";
import { CachedRepository } from "@utils/interfaces/repository";
import { FLATTENED_DRINK_ARCHETYPES, FLATTENED_FOOD_ARCHETYPES, FLATTENED_WEAPON_ARCHETYPES, FLATTENED_WEAPON_CATALOG, OBJECT_CATALOG, type ArchetypeDef, type IDrinkItem, type IFoodItem, type IReloadableWeaponItem, type ItemDef, type WeaponName } from "./catalog";
import { ObjectRepository, ObjectService } from "./infrastructure";
import { type FoodDrinkTemperature, type FoodObjectState, type IDrinkObject, type IEquippable, type IFoodObject, type IObject, type IReloadable, type IWeaponMagazine, type IWeaponObject, type ObjectSize } from "./interface";
//import { attachableRegistry, type IAttachable } from "@modules/attachables/registry";


// ----------------------------------------------------


export abstract class BaseObject<T extends IObject> {
    constructor(protected props: T) {}

    get id() { return this.props.id; }
    get name() { return this.props.name; }
    
    get kind() { return this.props.kind; }
    get metadata() { return this.props.metadata || {}; }

    protected abstract get definition(): ItemDef;
    protected abstract get archetype(): ArchetypeDef;

    get modelId(): number {
        return this.archetype.modelId;
    }

    get size(): ObjectSize {
        return this.archetype.size;
    }

    get attachTag() {
        return this.archetype.attachTag;
    }

    get allProps() { return structuredClone(this.props); }
}


// ----------------------------------------------------


export class GenericObject extends BaseObject<IObject> {
    constructor(data: IObject) {
        super(data);
    }

    /**
     * Construimos el arquetipo (datos visuales) dinámicamente.
     * Si el objeto trae 'modelId' en su metadata, lo usamos.
     * Si no, usamos un "Placeholder" (ej: una caja o maletín).
     */
    protected override get archetype(): ArchetypeDef {
        const meta = this.props.metadata || {};

        return {
            modelId: (meta as any).modelId ?? 1210,
            size: (meta as any).size ?? "small",
            attachTag: (meta as any).attachTag ?? "DEFAULT",
            ...meta
        } as ArchetypeDef;
    }


    /**
     * La definición lógica. Para objetos genéricos, es básicamente
     * un espejo de su arquetipo + su tipo.
     */
    protected get definition(): ItemDef {
        return {
            ...this.archetype,
            kind: this.props.kind
        } as unknown as ItemDef; 
    }
}






// ----------------------------------------------------


export class FoodObject extends BaseObject<IFoodObject> {

    protected override get definition() {
        const def = OBJECT_CATALOG.FOOD[this.name as keyof typeof OBJECT_CATALOG.FOOD];
        if (!def) throw new Error(`La comida '${this.name}' no existe en el catálogo.`);

        return def;
    }

    protected override get archetype() {
        const key = this.definition.archetype;

        const arch = FLATTENED_FOOD_ARCHETYPES.get(key);
        if (!arch) throw new Error(`Arquetipo '${key}' no encontrado.`);

        return arch;
    }

    get state(): FoodObjectState {
        return this.props.state || (this.definition as IFoodItem).state;
    }

    get temperature(): FoodDrinkTemperature {
        return this.props.temperature || (this.definition as IFoodItem).temperature;
    }

    get calories(): number {
        return this.definition.calories;
    }
}


// ----------------------------------------------------


export class DrinkObject extends BaseObject<IDrinkObject> {
    protected override get definition() {
        const def = OBJECT_CATALOG.DRINK[this.name as keyof typeof OBJECT_CATALOG.DRINK];
        if (!def) throw new Error(`La bebida '${this.name}' no existe en el catálogo.`);

        return def;
    }

    protected override get archetype() {
        const key = this.definition.archetype;

        const arch = FLATTENED_DRINK_ARCHETYPES.get(key);
        if (!arch) throw new Error(`Arquetipo '${key}' no encontrado.`);

        return arch;
    }

    get volume(): number {
        return this.props.volume || this.definition.volume;
    }

    get temperature(): FoodDrinkTemperature {
        return this.props.temperature || (this.definition as IDrinkItem).temperature;
    }

}

// ----------------------------------------------------


/* export class PhoneObject extends BaseObject<IPhoneObject> {
    constructor(
        protected override props: IPhoneObject,
        private _phone: Phone
    ) {
        super(props);
    }

    get phoneId() { return this.props.phoneId; }
    get phone() { return this._phone; }

    // TODO: Agregar métodos.

}
 */

// ----------------------------------------------------

const ALL_WEAPONS = new Map<string, IWeaponData>();
Object.values(WEAPON_MODELS).forEach(category => {
    Object.entries(category).forEach(([name, data]) => {
        ALL_WEAPONS.set(name, data);
    })
});

// ----------------------------------------------------

export class WeaponObject extends BaseObject<IWeaponObject> implements IEquippable, IReloadable {
    protected override get definition() {
        const def = FLATTENED_WEAPON_CATALOG.get(this.name as WeaponName);
        if (!def) throw new Error(`El arma '${this.name}' no existe en el catálogo.`);

        return def;
    }

    protected override get archetype() {
        const key = this.definition.archetype;
        const arch = FLATTENED_WEAPON_ARCHETYPES.get(key);

        if (!arch) throw new Error(`Arquetipo '${key}' no encontrado.`);
        return arch;
    }

    get weaponId() { return this.archetype.weaponId; }


    // -------------------------------------

    get magazine() {
        return structuredClone(this.props.magazine);
    }

    // IReloadable
    get hasMagazine(): boolean {
        return this.props.magazine !== null;
    }

    getAmmoCount(): number {
        return this.hasMagazine ? this.props.magazine!.size : 0;
    }

    setAmmoCount(newAmmoValue: number) {
        if (!this.hasMagazine || !this.props.magazine) return;
        // TODO: Hacer condicional para revisar si es un arma recargable.
        
        this.props.magazine = {
            ...this.props.magazine,
            size: newAmmoValue
        };
    }

    // -------------------------------------

    reload(amount: number): boolean {
        if (!this.hasMagazine || !this.props.magazine) return false;

        this.setAmmoCount(this.props.magazine.size + amount);

        return true;
    }

    isValidMagazine(ammoType: WeaponAmmos) {
        if (!this.props.magazine || this.hasMagazine) return false;

        const weapon = FLATTENED_WEAPON_CATALOG.get(this.name as WeaponName) as IReloadableWeaponItem;

        return weapon.magazine === ammoType;
    }

    loadMagazine(ammoType: WeaponAmmos, amount: number) {
        if (!this.hasMagazine) return false;

        this.props.magazine = {
            ammoType: ammoType,
            size: amount
        }
    }

    unloadMagazine(): IWeaponMagazine | null {
        if (!this.hasMagazine) return null;

        const oldMag = structuredClone(this.props.magazine);

        this.props.magazine = null;

        return oldMag;
    }

    // ---------------------------------------

    // IEquippable
    equip(player: Player): void {
        const ammo = this.hasMagazine ? this.props.magazine!.size : 1;

        player.giveWeapon(this.weaponId, ammo);
    }

}


// ----------------------------------------------------

const objectDbRepo = new ObjectRepository();
const objectCacheRepo = new CachedRepository<BaseObject<any>>(objectDbRepo);

export const initializeObjects = async () => {
    await objectCacheRepo.initialize("objetos");
}

export const objectService = new ObjectService(objectCacheRepo);

//attachableRegistry.register(objectService);