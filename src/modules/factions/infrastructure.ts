import { autoIncrementPlugin } from "@database/schemas/counter";
import { logger } from "@logger";
import type { ICoordinates } from "@utils/interfaces/coordinates";
import { CachedRepository, MongooseRepository } from "@utils/interfaces/repository";
import type { StrictSchemaDefinition } from "@utils/interfaces/schemas";
import { model, Schema, type Document, type Model } from "mongoose";
import type { FactionPermissionString } from "./permissions";

export type FactionType = "POLICE" | "MEDIC" | "GOVERNMENT";

export interface IFactionRoleMember {
    name: string;
    roleUid: number; 
}

export interface IFactionRole {
    uid: number;
    name: string;
}

export interface IFaction {
    id: string;
    name: string;
    type: FactionType;
    color: string;
    alias: string;

    // -----------------

    permissions: string[];

    // -----------------

    leader: string | null;
    subLeader: string | null;
    
    // -----------------

    members: IFactionRoleMember[];
    roles: IFactionRole[];

    // -----------------

    coordinates: {
        interior: ICoordinates | null;
        exterior: ICoordinates | null;
    };
}


interface IFactionDocument extends IFaction, Omit<Document, "id"> {};
interface IFactionModel extends Model<IFactionDocument> {};

type CreateFactionDTO = Pick<IFaction, "name" | "type">;

// -----------------------------------------------------------------

const coordinatesObjectSchema = new Schema<ICoordinates>({ 
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    vw: { type: Number, default: 1 }
}, { _id: false });


const factionMemberSchema = new Schema<IFactionRoleMember>({
    name: { type: String, required: true },
    roleUid: { type: Number, required: true, min: 1 }
}, { _id: false });


const factionRoleSchema = new Schema<IFactionRole>({
    uid: { type: Number, required: true, min: 1 },
    name: { type: String, required: true }
}, { _id: false });


const factionSchemaDefinition: StrictSchemaDefinition<IFaction> = {
    id: { type: String, unique: true, immutable: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String, default: "#000000" },
    alias: { type: String, default: "" },
    leader: { type: String, default: null },
    subLeader: { type: String, default: null },
    members: { type: [factionMemberSchema], default: [] },
    roles: { type: [factionRoleSchema], default: [] },
    coordinates: { interior: coordinatesObjectSchema, exterior: coordinatesObjectSchema },
    permissions: { type: [String], default: [] }
}

const factionSchema = new Schema<IFactionDocument, IFactionModel>(factionSchemaDefinition, { timestamps: true });

factionSchema.plugin(autoIncrementPlugin, {
    id: "factionId",
    field: "id",
    string: true
});

const FactionModel = model<IFactionDocument, IFactionModel>("factions", factionSchema);

// -----------------------------------------------------------------


export class Faction {
    constructor(private props: IFaction) {
        if (!this.props.permissions) this.props.permissions = [];
    }

    get id() { return this.props.id; }
    get name() { return this.props.name; }
    get type() { return this.props.type; }
    get color() { return this.props.color; }
    get alias() { return this.props.alias; }

    // ---------------------------------------

    get leader() { return this.props.leader; }
    get subLeader() { return this.props.subLeader; }

    // ---------------------------------------

    get members() { return this.props.members; }
    get roles() { return this.props.roles; }

    get interiorCoords() { return structuredClone(this.props.coordinates.interior); }
    get exteriorCoords() { return structuredClone(this.props.coordinates.exterior); }

    // ---------------------------------------

    get allProps() { return structuredClone(this.props) };

    // ---------------------------------------

    hasPermission(permission: FactionPermissionString): boolean {
        return this.props.permissions.includes(permission);
    }

    addPermission(permission: FactionPermissionString) {
        if (!this.hasPermission(permission)) this.props.permissions.push(permission);
    }

    removePermission(permission: FactionPermissionString) {
        if (!this.hasPermission(permission)) return;

        this.props.permissions = this.props.permissions.filter(p => p !== permission);
    }

    // ---------------------------------------

    setType(newType: FactionType) {
        this.props.type = newType;
    }

    setColor(newColor: string) {
        this.props.color = newColor;
    }

    setAlias(newAlias: string) {
        this.props.alias = newAlias;
    }

    // ---------------------------------------

    setLeader(newLeader: string | null) {
        this.props.leader = newLeader;
    }

    setSubLeader(newSubLeader: string | null) {
        this.props.subLeader = newSubLeader;
    }

    // ---------------------------------------

    roleExists(roleUid: number): boolean {
        return this.props.roles.some(r => r.uid === roleUid);
    }

    roleNameExists(roleName: string): boolean {
        return this.props.roles.some(r => r.name === roleName);
    }

    roleHasMembers(roleUid: number): boolean {
        return this.props.members.some(m => m.roleUid === roleUid);
    }

    addRole(newRole: IFactionRole) {
        if (this.roleExists(newRole.uid)) return;

        this.props.roles.push(newRole);
    }

    removeRole(roleUid: number) {
        if (!this.roleExists(roleUid)) return;

        // Denegar borrado si hay miembros con el rol.
        if (this.roleHasMembers(roleUid)) return;

        this.props.roles = this.props.roles.filter(r => r.uid !== roleUid);
    }

    changeRoleName(roleUid: number, newRoleName: string) {
        if (!this.roleExists(roleUid)) return;
        if (this.roleNameExists(newRoleName)) return;

        const role = this.props.roles.find(m => m.uid === roleUid);

        if (role) role.name = newRoleName;
    }


    // ---------------------------------------

    isPlayerMember(playerName: string): boolean {
        return this.props.members.some(m => m.name === playerName);
    }

    addMember(member: IFactionRoleMember) {
        if (!this.roleExists(member.roleUid)) return;
        if (this.isPlayerMember(member.name)) return;

        this.props.members.push(member);
    }

    removeMember(playerName: string) {
        if (!this.isPlayerMember(playerName)) return;

        this.props.members = this.props.members.filter(m => m.name !== playerName);

        if (this.props.leader === playerName) this.props.leader = null;
        if (this.props.subLeader === playerName) this.props.subLeader = null;
    }

    changeMemberRole(memberName: string, newRoleUid: number) {
        if (!this.isPlayerMember(memberName)) return;
        if (!this.roleExists(newRoleUid)) return;

        const member = this.props.members.find(m => m.name === memberName);
        
        if (member) member.roleUid = newRoleUid;
    }

    // ---------------------------------------

    setInteriorCoordinates(newCoordinates: ICoordinates | null) {
        this.props.coordinates.interior = newCoordinates;
    }

    setExteriorCoordinates(newCoordinates: ICoordinates | null) {
        this.props.coordinates.exterior = newCoordinates;
    }
}

// -----------------------------------------------------------------

class FactionRepository extends MongooseRepository<Faction, IFaction> {
    constructor() {
        super(
            FactionModel as Model<IFaction & Document>,
            (data: IFaction) => new Faction(data),
            (entity: Faction) => entity.allProps
        );
    }
}

// -----------------------------------------------------------------

class FactionService {
    private memberIndex = new Map<string, string>(); // Member.name -> Faction.id

    constructor(private readonly repository: CachedRepository<Faction>) {}

    rebuildIndex() {
        this.memberIndex.clear();

        const factions = this.repository.findInCache({});
        for (const faction of factions) {
            for (const member of faction.members) {
                this.memberIndex.set(member.name, faction.id);
            }
        }
    }

    // ---------------------------------------

    async modify<R>(factionId: string, operation: (faction: Faction) => R): Promise<R | null> {
        return this.repository.modify(factionId, operation);
    }

    // ---------------------------------------

    private createAlias(name: string): string {
        return name.split(" ").map(w => w[0]).join("");
    }

    // ---------------------------------------

    private getNextRoleUid(faction: Faction): number {
        if (!faction.roles.length) return 1;

        const uids = faction.roles.map(roles => roles.uid);
        return Math.max(...uids) + 1;
    }

    // ---------------------------------------

    getFactionByMember(playerName: string): Faction | undefined {
        const factionId = this.memberIndex.get(playerName);
        if (!factionId) return;

        const faction = this.repository.get(factionId);
        if (!faction) return;

        return faction;
    }

    isFactionMember(playerName: string, factionId: string): boolean {
        return this.memberIndex.get(playerName) === factionId;
    }

    // ---------------------------------------

    getFactionByMemberName(playerName: string): Faction | undefined {
        const allFactions = this.repository.findInCache({});

        return allFactions.find(faction => faction.isPlayerMember(playerName));
    }

    // ---------------------------------------

    async addMember(factionId: string, name: string, roleUid: number): Promise<boolean> {
        const result = await this.repository.modify(factionId, faction => {
            faction.addMember({ name, roleUid });
            this.memberIndex.set(name, factionId);
        });

        return !!result;
    }

    async removeMember(factionId: string, name: string): Promise<boolean> {
        const result = await this.repository.modify(factionId, faction => {
            faction.removeMember(name);
            this.memberIndex.delete(name);
        });

        return !!result;
    }

    // ---------------------------------------

    async createFaction(dto: CreateFactionDTO) {
        const { name, type } = dto;
        
        const data: Omit<IFaction, "id"> = {
            name, type,
            color: "#000000",
            alias: this.createAlias(name),
            leader: null,
            subLeader: null,
            members: [],
            roles: [],
            permissions: [],
            coordinates: {
                interior: null,
                exterior: null
            }
        };
        
        await this.repository.create(data as any);

        return true;
    }

    async deleteFaction(factionId: string) {
        await this.repository.delete(factionId);
    }

    // ---------------------------------------

    async createRole(factionId: string, roleName: string): Promise<boolean> {
        const faction = await this.repository.findById(factionId);
        if (!faction) return false;

        if (faction.roleNameExists(roleName)) return false;

        const newUid = this.getNextRoleUid(faction);

        const newRole: IFactionRole = {
            uid: newUid,
            name: roleName
        };

        faction.addRole(newRole);

        await this.repository.save(factionId, faction);
        return true;
    }
}

// -----------------------------------------------------------------

const factionDbRepo = new FactionRepository();
export const factionCacheRepo = new CachedRepository<Faction>(factionDbRepo, logger, "id");
export const factionService = new FactionService(factionCacheRepo);

export const initializeFactions = async () => {
    await factionCacheRepo.initialize("facciones");
}