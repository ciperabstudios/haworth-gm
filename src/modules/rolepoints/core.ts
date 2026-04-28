import CharacterModel from "@database/schemas/character";
import RolepointModel from "@database/schemas/rolepoint";
import { Player } from "@infernus/core";
import { logger } from "@logger";
import { CachedRepository, MongooseRepository } from "@utils/interfaces/repository";
import type { Document, Model } from "mongoose";
import { CustomPlayerEvent } from "src/classes/events/CustomEvent";

export interface IRolepoint {
    id: string;
    amount: number;
    characterId: string;
    reason: string;
    staffId: string;
    givenAt: number;
};


type CreateRolepointDTO = Omit<IRolepoint, "id" | "givenAt">;

// ---------------------------------------------------------------------

class Rolepoint {
    constructor (private props: IRolepoint) {}

    get id() { return this.props.id; }
    get amount() { return this.props.amount; }
    get characterId() { return this.props.characterId; }
    get reason() { return this.props.reason; }
    get staffId() { return this.props.staffId; }
    get givenAt() { return this.props.givenAt; }

    get allProps() { return structuredClone(this.props); }

    // ---------------------------------------

    changeAmount(newAmount: number) {
        if (newAmount <= 0) return;

        this.props.amount = newAmount;
    }

    changeReason(newReason: string) {
        this.props.reason = newReason;
    }
}


// ---------------------------------------------------------------------


class RolepointService {
    private _loadedPlayers: Set<number> = new Set();

    constructor (private readonly repository: CachedRepository<Rolepoint>) {}

    // ---------------------------------------

    async modify<R>(rolepointId: string, operation: (rolepoint: Rolepoint) => R): Promise<R | null> {
        return this.repository.modify(rolepointId, operation);
    }

    // ---------------------------------------

    get(rolepointId: string): Rolepoint | null {
        return this.repository.get(rolepointId);
    }

    // ---------------------------------------

    async createRolepoint(props: CreateRolepointDTO): Promise<Rolepoint | void> {
        const characterDoc = await CharacterModel.findOne({ ID: props.characterId });
        if (!characterDoc) return;


        const data: Omit<IRolepoint, "id"> = {
            ...props,
            givenAt: Date.now()
        };

        const rolepoint = await this.repository.create(data as any);

        // Agregar rolepoint al array del personaje.
        await CharacterModel.findByIdAndUpdate(characterDoc._id, {
            $push: {
                pdr: rolepoint.id
            }
        });

        return rolepoint;
    }

    async deleteRolepoint(rolepointId: string): Promise<boolean> {
        return await this.repository.delete(rolepointId);
    }

    // ---------------------------------------

    async loadPlayer(player: Player): Promise<void> {
        if (this._loadedPlayers.has(player.id)) return;

        const rolepoints = await this.repository.loadMany({ characterId: player.character!.ID });
        if (!rolepoints.length) return;

        for (const rolepoint of rolepoints) {
            await this.repository.save(rolepoint.id, rolepoint);
        }

        this._loadedPlayers.add(player.id);
        logger.debug(`[RolepointService] Cargados ${rolepoints.length} puntos de rol de ${player.getName().name}.`);
    }


    unloadPlayer(player: Player): void {
        if (!this._loadedPlayers.has(player.id)) return;

        const rolepoints = this.repository.findInCache({ characterId: player.character!.ID });
        if (!rolepoints.length) return;

        for (const rolepoint of rolepoints) {
            this.repository.evict(rolepoint.id);
        }

        this._loadedPlayers.delete(player.id);
        logger.debug(`[RolepointService] Descargados ${rolepoints.length} puntos de rol de ${player.getName().name}.`);
    }

    // ---------------------------------------

    getPlayer(player: Player): IRolepoint[] {
        return this.repository.findInCache({ characterId: player.character!.ID });
    }
}

// ---------------------------------------------------------------------

class RolepointRepository extends MongooseRepository<Rolepoint, IRolepoint> {
    constructor() {
        super(
            RolepointModel as Model<IRolepoint & Document>,
            (doc) => new Rolepoint(doc),
            (entity: Rolepoint) => entity.allProps,
            "id"
        );
    }
}

// ---------------------------------------------------------------------

const rolepointDbRepo = new RolepointRepository();
const rolepointCacheRepo = new CachedRepository<Rolepoint>(rolepointDbRepo, logger, "id");
export const rolepointService = new RolepointService(rolepointCacheRepo);

// ---------------------------------------------------------------------

CustomPlayerEvent.onLogin(async ({ player, next }) => {
    await rolepointService.loadPlayer(player);
    return next();
});


CustomPlayerEvent.onLogout(async ({ player, next }) => {
    rolepointService.unloadPlayer(player);
    return next();
});