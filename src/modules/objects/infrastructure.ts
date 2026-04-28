import { CachedRepository, MongooseRepository } from "@utils/interfaces/repository";
import type { Document, Model } from "mongoose";
import { FLATTENED_WEAPON_ARCHETYPES, FLATTENED_WEAPON_CATALOG, isReloadableArchetype, OBJECT_CATALOG, type IDrinkItem, type IFoodItem, type IReloadableWeaponItem } from "./catalog";
import { DrinkObject, FoodObject, GenericObject, WeaponObject, type BaseObject } from "./core";
import { type CreateDrinkObjectDTO, type CreateFoodObjectDTO, type CreateGenericObjectDTO, type CreateWeaponObjectDTO, type IDrinkObject, type IFoodObject, type IObject, type ItemKind, type IWeaponObject, type ResultObject, type CreateObjectDTO } from "./interface";
import { BaseObjectModel, type IObjectDocument } from "./schemas";


export class ObjectFactory {
    static create(doc: IObjectDocument | IObject): BaseObject<any> {
        // Verificamos si tiene el método toObject antes de llamarlo.
        // Si no lo tiene, asumimos que 'doc' ya es la data cruda (porque vino de .lean())

        // flattenMaps: true convierte Map a Object.
        // versionKey: false quita __v.
        const rawData = (typeof (doc as any).toObject === 'function')
            ? (doc as any).toObject({ getters: true, virtuals: false, versionKey: false, flattenMaps: true })
            : doc;

        let object: BaseObject<any>;

        switch (doc.kind) {
            case "FOOD":   object = new FoodObject(rawData as IFoodObject);     break;
            case "DRINK":  object = new DrinkObject(rawData as IDrinkObject);   break;
            case "WEAPON": object = new WeaponObject(rawData as IWeaponObject); break;


            case "PHONE":
            case "FURNITURE":
            case "GENERIC":
                object = new GenericObject(rawData as IObject);
                break;

            default:
                throw new Error(`Unknown object kind: ${doc.kind}`);
        }

        return object;
    }

    static createFoodObjectData(dto: CreateFoodObjectDTO): Partial<IFoodObject> {
        const { name } = dto;

        const data = OBJECT_CATALOG.FOOD[name as keyof typeof OBJECT_CATALOG.FOOD];
        if (!data) throw new Error(`Comida '${name}' no encontrada en el catálogo.`);

        const { calories, state = "fresca", temperature = "tibia" } = data as IFoodItem;

        return {
            kind: "FOOD",
            name, calories, state, temperature
        };
    }

    static createDrinkObjectData(dto: CreateDrinkObjectDTO): Partial<IDrinkObject> {
        const { name } = dto;

        const data = OBJECT_CATALOG.DRINK[name as keyof typeof OBJECT_CATALOG.DRINK];
        if (!data) throw new Error(`Bebida '${name}' no encontrada en el catálogo.`);

        const { volume, temperature = "tibia" } = data as IDrinkItem;

        return {
            kind: "DRINK",
            name, volume, temperature
        };
    }

    static createWeaponObjectData(dto: CreateWeaponObjectDTO): Partial<IWeaponObject> {
        const { name } = dto;

        const data = FLATTENED_WEAPON_CATALOG.get(name);
        if (!data) throw new Error(`Arma '${name}' no encontrada en el catálogo.`);

        const arch = FLATTENED_WEAPON_ARCHETYPES.get(data.archetype);
        if (!arch) throw new Error(`Arquetipo '${arch}' no encontrado en el catálogo.`);

        if (isReloadableArchetype(arch)) {
            return {
                kind: "WEAPON",
                name,
                magazine: { ammoType: (data as IReloadableWeaponItem).magazine, size: arch.defaultAmmo }
            };
        }

        return {
            kind: "WEAPON",
            name,
        };
    }


    static createGenericObjectData(dto: CreateGenericObjectDTO): Partial<IObject> {
        const { metadata = {}, ...restOfDto } = dto;

        return { ...restOfDto, metadata };
    }
}



// --------------------------------------------------------------------



export class ObjectRepository extends MongooseRepository<BaseObject<any>, IObject> {
    constructor() {
        super(
            BaseObjectModel as Model<IObject & Document>,
            (doc) => ObjectFactory.create(doc as IObjectDocument),
            (entity) => entity.allProps,
            "id"
       );
    }
}



// --------------------------------------------------------------------


export class ObjectService {
    constructor(private readonly repository: CachedRepository<BaseObject<any>>) {}

    // ---------------------------------------

    findById(id: string): BaseObject<any> | null {
        return this.repository.findInCache({ id })?.[0];
    }

    // ---------------------------------------

    async save(object: BaseObject<any>): Promise<void> {
        await this.repository.save(object.id, object);
    }

    // ---------------------------------------
    
    async createObject<T extends ItemKind>(kind: T, dto: CreateObjectDTO<T>): Promise<ResultObject<T>> {
        switch (kind) {
            case "FOOD":   return (await this.repository.create(ObjectFactory.createFoodObjectData(dto as any) as any))   as ResultObject<T>;
            case "DRINK":  return (await this.repository.create(ObjectFactory.createDrinkObjectData(dto as any) as any))  as ResultObject<T>;
            case "WEAPON": return (await this.repository.create(ObjectFactory.createWeaponObjectData(dto as any) as any)) as ResultObject<T>;

            // PHONE, FURNITURE, GENERIC.
            default: return (await this.repository.create(ObjectFactory.createGenericObjectData({ ...dto, kind } as any) as any)) as ResultObject<T>;
        }
    }
}