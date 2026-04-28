import { Document, model, type ObjectId, Schema, SchemaTypes } from "mongoose";

export const STAFF_PERMISSIONS_FLAGS = [
    "MANAGE_VEHICLES",   // ✅
    "MANAGE_PLAYERS",    // ✅
    "MANAGE_ACTORS",     // ✅
    "MANAGE_BUSINESS",   // ✅
    "MANAGE_FACTIONS",   // ✅
    "BAN", "UNBAN",      // ✅
    "KICK",              // ✅
    "ADMINISTRATOR", "DEVELOPER", // 🟡
    "TELEPORTS",         // ✅
    "EXTRAS",            // ✅
    "MANAGE_STREAMER",   // ✅
    "ADMIN_CHAT",        // ✅
    "MANAGE_ROLEPOINTS", // ✅
    "MANAGE_HOUSES",     // ✅
    "ATTEND_REPORTS",    // ✅
    "ATTEND_QUESTIONS"   // ✅
] as const;

export type TStaffPermissionFlag = typeof STAFF_PERMISSIONS_FLAGS[number];

export interface IStaffPermission { 
    flag: TStaffPermissionFlag;
    description: string;
    bits: bigint;
}

export const PERMISSION_GROUPS: Record<TStaffPermissionFlag, Omit<IStaffPermission, "flag">> = {
    "MANAGE_VEHICLES":   { description: "Permite la gestión de los vehículos",    bits: 1n << 0n   },
    "MANAGE_PLAYERS":    { description: "Permite la gestión de los jugadores",    bits: 1n << 1n   },
    "MANAGE_ACTORS":     { description: "Permite la gestión de los actores",      bits: 1n << 2n   },
    "MANAGE_BUSINESS":   { description: "Permite la gestión de los negocios",     bits: 1n << 3n   },
    "MANAGE_FACTIONS":   { description: "Permite la gestión de las facciones",    bits: 1n << 4n   },
    "BAN":               { description: "Permite banear jugadores",               bits: 1n << 5n   },
    "UNBAN":             { description: "Permite desbanear jugadores",            bits: 1n << 6n   },
    "KICK":              { description: "Permite expulsar jugadores",             bits: 1n << 7n   },
    "TELEPORTS":         { description: "Permite el uso de teletransportes",      bits: 1n << 8n   },
    "EXTRAS":            { description: "Permite el uso de comandos misceláneos", bits: 1n << 9n   },
    "MANAGE_STREAMER":   { description: "Permite la gestión del plugin Streamer", bits: 1n << 10n  },
    "ADMIN_CHAT":        { description: "Permite visualizar el chat del Staff",   bits: 1n << 11n  },
    "MANAGE_ROLEPOINTS": { description: "Permite gestionar los puntos de rol.",   bits: 1n << 12n  },
    "MANAGE_HOUSES":     { description: "Permite la gestión de las casas",        bits: 1n << 13n  },
    "ATTEND_REPORTS":    { description: "Permite atender reportes.",              bits: 1n << 14n  },
    "ATTEND_QUESTIONS":  { description: "Permite atender dudas.",                 bits: 1n << 15n  },
    

    /* -------- */
    "DEVELOPER":         { description: "Otorga control de desarrollador",        bits: 1n << 337n },
    "ADMINISTRATOR":     { description: "Otorga todos los permisos",              bits: 1n << 420n },
} as const;



export interface IStaffRoleProps {
    name: string;
    translatedName: string;
    priority: number; // TODO: Hacer el sort en los get(Offline|Online)Admins.
    inherits?: TStaffPermissionFlag[];      // StaffPermission[]; // Permisos heredados.
    ownPermissions: TStaffPermissionFlag[]; // StaffPermission[];
    totalBits: bigint;
}


export interface IAdminProps {
    duty: boolean;
    role: IStaffRoleProps;
}

export interface IAdminPropsDocument {
    duty: boolean;
    roleId: ObjectId | IStaffRole;
}


export interface IStaffRole extends IStaffRoleProps, Document {};



export const StaffRoleSchema = new Schema<IStaffRole>({
    name: { type: String, unique: true },
    translatedName: { type: String, unique: true },
    priority: { type: Number, min: 0, required: true },
    inherits: { type: [String], enum: STAFF_PERMISSIONS_FLAGS, required: false, default: [] },
    ownPermissions: { type: [String], enum: STAFF_PERMISSIONS_FLAGS, required: true },
    totalBits: { type: String, immutable: true }
}, { timestamps: true });


export const AdminSchema = new Schema<IAdminPropsDocument>({
  duty: { type: Boolean, required: true },
  roleId: { type: SchemaTypes.ObjectId, ref: "StaffRoles" } // TODO: Hacer un borrado en cascada.
}, { _id: false });


const StaffRoleModel = model<IStaffRole>("StaffRoles", StaffRoleSchema);

export default StaffRoleModel;