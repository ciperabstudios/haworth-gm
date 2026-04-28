import { logger } from "@logger";
import { isValidObjectId, type Document } from "mongoose";
import type { FilterQuery, Model, UpdateQuery } from "mongoose";

export interface IRepository<T> {
    create(data: Omit<T, 'id' | 'ID'>): Promise<T>;

    findById(id: string): Promise<T | null>;

    findAll(filter?: Partial<T>): Promise<T[]>;

    update(id: string, data: Partial<T>): Promise<T | null>;

    save(id: string, entity: T, upsert?: boolean): Promise<void>;

    delete(id: string): Promise<boolean>;
}



export class CachedRepository<T> implements IRepository<T> {
    private cache: Map<string, T> = new Map();

    constructor(
        private readonly dbRepository: IRepository<T>,
        private readonly _logger = logger,
        private readonly idFieldName: keyof T = "id" as keyof T
    ) {};

    async initialize(loadedItemsName: string): Promise<void> {
        const allItems = await this.dbRepository.findAll();

        this.cache.clear();
        for (const item of allItems) {
            const itemId = String(item[this.idFieldName]);
            this.cache.set(itemId, item);
        }

        this._logger.info(`Cargados/as ${allItems.length} ${loadedItemsName}.`);
    }

    // ---------------------------------------

    async loadMany(filter: Partial<T>): Promise<T[]> {
        const items = await this.dbRepository.findAll(filter);

        for (const item of items) {
            const itemId = String(item[this.idFieldName]);

            if (!this.cache.has(itemId)) {
                this.cache.set(itemId, item);
            }
        }

        return items;
    }

    evict(id: string): void {
        this.cache.delete(id);
    }

    findInCache(filter: Partial<T>): T[] {
        const allItems = [...this.cache.values()];
        const filterKeys = Object.keys(filter) as Array<keyof T>;

        if (!filterKeys.length) return allItems;

        return allItems.filter(item => {
            return filterKeys.every(key => item[key] === filter[key]);
        });
    }


    // ---------------------------------------

    get(id: string): T | null {
        return this.cache.get(id) ?? null;
    }

    // ---------------------------------------

    /**
     * Ejecuta una operación sobre una entidad y la guarda automáticamente
     */
    async modify<R>(id: string, operation: (entity: T) => R): Promise<R | null> {
        const entity = await this.findById(id);
        if (!entity) return null;
        
        const result = operation(entity);
        await this.save(id, entity);

        return result;
    }

    // ---------------------------------------

    async create(data: Omit<T, "id" | "ID">): Promise<T> {
        const newItem = await this.dbRepository.create(data);
        const itemId = String(newItem[this.idFieldName]);

        this.cache.set(itemId, newItem);

        return newItem;
    }

    async findById(id: string): Promise<T | null> {
        //return this.cache.get(id) || null;
        const cached = this.cache.get(id);
        if (cached) return cached;

        const fromDb = await this.dbRepository.findById(id);
        if (fromDb) this.cache.set(id, fromDb);

        return fromDb;
    }

    async findAll(filter: Partial<T> = {}): Promise<T[]> {
        const allItems = [...this.cache.values()];
        const filterKeys = Object.keys(filter) as Array<keyof T>;

        if (!filterKeys.length) return allItems;

        return allItems.filter(item => {
            return filterKeys.every(key => {
                return item[key] === filter[key];
            });
        });
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        const updatedItem = await this.dbRepository.update(id, data);

        if (updatedItem) this.cache.set(id, updatedItem);

        return updatedItem;
    }

    async save(id: string, entity: T, upsert?: boolean): Promise<void> {
        await this.dbRepository.save(id, entity, upsert || false);

        this.cache.set(id, entity);
    }


    async delete(id: string): Promise<boolean> {
        const deletedItem = await this.dbRepository.delete(id);

        if (deletedItem) this.cache.delete(id);

        return deletedItem;
    }
}



export abstract class MongooseRepository<Domain extends { [key: string]: any } /* { id: string } */, Persistence extends {}> implements IRepository<Domain> {
    constructor(
        protected readonly model: Model<Persistence & Document>,
        protected readonly toDomain: (data: Persistence) => Domain,
        protected readonly toPersistence: (entity: Domain) => Persistence,
        protected readonly idFieldName: keyof Domain = "id"
    ) {}

    private getFilter(id: string): FilterQuery<Persistence & Document> {
        if (isValidObjectId(id)) return { $or: [{ _id: id }, { [this.idFieldName]: id }] } as FilterQuery<Persistence & Document>;

        return { [this.idFieldName]: id } as FilterQuery<Persistence & Document>;
    }

    async create(data: Omit<Domain, "id" | "ID">): Promise<Domain> {
        const createdDoc = await this.model.create(data);
        return this.toDomain(createdDoc.toObject());
    }

    async findById(id: string): Promise<Domain | null> {
        const filter = this.getFilter(id);

        const jsonDoc = await this.model.findOne(filter).lean<Persistence>();
        if (!jsonDoc) return null;

        return this.toDomain(jsonDoc);
    }

    async findAll(filter: Partial<Domain> = {}): Promise<Domain[]> {
        const jsonDocs = await this.model.find(filter as FilterQuery<Persistence & Document>).lean<Persistence[]>();
        
        return jsonDocs.map(this.toDomain);
    }

    async update(id: string, data: Partial<Domain>): Promise<Domain | null> {
        const filter = this.getFilter(id);

        const updatedJson = await this.model.findOneAndUpdate(
            filter, 
            data as UpdateQuery<Persistence & Document>, 
            { new: true }
        ).lean<Persistence>();

        if (!updatedJson) return null;
        return this.toDomain(updatedJson);
    }

    async save(id: string, entity: Domain, upsert?: boolean): Promise<void> {
        const persistenceData = this.toPersistence(entity);

         
        const { _id, [this.idFieldName as string]: customId, ...cleanData } = persistenceData as any;

        const filter = this.getFilter(id);

        try {
            // ---------------------------------------
            let modelToUse = this.model;

            if (cleanData.kind && this.model.discriminators && this.model.discriminators[cleanData.kind]) {
                modelToUse = this.model.discriminators[cleanData.kind];
            }
            // ---------------------------------------

            await /*this.model*/modelToUse.updateOne(
                filter,
                { $set: cleanData } as UpdateQuery<Persistence & Document>,
                { upsert: upsert || false }
            );
        } catch (err) {
            logger.error(`[MongooseRepository] Error saving:`, err);
        }


    }

    async delete(id: string): Promise<boolean> {
        const filter = this.getFilter(id);

        const result = await this.model.deleteOne(filter);
        return result.deletedCount > 0;
    }
}