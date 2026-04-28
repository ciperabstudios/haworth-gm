import { Document, model, type ObjectId, Schema, SchemaTypes } from "mongoose";
import { AdminSchema, type IAdminPropsDocument } from "./staff";
import { Permissions } from "@modules/staff";


interface IVIP {
  tier: number;
  expirationDate: number;
}

interface INewUser {
  id: string;
  name: string;
  email: string;
  password: string;
  ip: string;

  // --------
  registrationDate: string;

  // --------
  lastConnection: string;
  lastConnections: string[];

  // --------
  role: number;

  // -------- // TODO: Agregar contenido VIP.
  // vip: IVIP 

  // --------
  hawks: number; // Coins.

  // --------
  characters: ObjectId[];
}



interface BanData {
  banType?: string;
  reason?: string;
  time?: string;
  author?: string;
  moment?: string;
};


export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  ip?: string;
  registrationDate: string;

  email_verified: boolean;
  email_token_verification: string;

  lastConnection: string;
  lastConnections: string[];

  certified?: boolean;
  role: number;
  vip?: { tier?: number; vipExpiration?: string; };
  hawks?: number;

  // Sistema de administración.
  admin?: IAdminPropsDocument;//IAdminProps;
  //addAdminStructure(): Promise<IUser>;

  characters: ObjectId[];
  charactersAmount?: number;

  profileBio?: string;

  discordId?: string;
  discord_uuid?: string | null;

  friends?: any[];
  friendsPending?: any[];

  privacy: boolean;
  notifications?: ObjectId[];

  multiaccount?: boolean;

  ban?: BanData;

  gift?: number;

  togNames?: boolean;
}


export interface CreateUserDTO {
  name: IUser["name"];
  email: IUser["email"];
  password: IUser["password"];
}



export interface IUserDocument extends IUser, Omit<Document, "id"> {};


/*
const AdminSchema = new Schema<IAdminProps>({
  rank: {
    type: Number,
    required: false,
    default: 0
  },
  isDuty: {
    type: Boolean,
    required: false,
    default: false
  },

}, { _id: false });
*/



const UserSchema = new Schema<IUserDocument>({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: false,
    },
    email_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    email_token_verification: {
      type: String,
      required: true,
      default: null,
    },
    registrationDate: {
      type: String,
      default: `${Date.now()}`
    },
    lastConnection: {
      type: String,
      default: `${Date.now()}`
    },
    lastConnections: {
      type: [String],
      default: []
    },
    /*
    lastConnections: {
      type: [{
        ipAddress: String,
        date: String,
        deviceType: String,
        location: {
          country: String,
          city: String,
          subdivision: String,
          time_zone: String,
          org: String,
          asn: String,
          continent: String,
          postal_code: String
        }
      }],
      default: []
    },
    */

    certified: {
      type: Boolean,
      required: false,
      default: false,
    },
    role: {
      type: Number,
      required: true,
      default: Permissions.USER.bitfield
    },
    vip: {
      tier: {
        type: Number,
        required: false,
        default: 0
      },
      vipExpiration: {
        type: String, 
        required: false,
        default: null,
      },
    },
    hawks: { // Coins.
      type: Number,
      required: false,
      default: 3
    },

    admin: AdminSchema,

    characters: {
      type: [SchemaTypes.ObjectId],
      ref: "Character"
    },
    charactersAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    profileBio: {
      type: String,
      required: false,
    },
    discordId: {
      type: String,
      required: false,
      default: null,
    },
    friends: {
      type: Array,
      required: false,
      default: []
    },
    privacy: {
      type: Boolean,
      default: true,
    },
    friendsPending: {
      type: Array,
      required: false,
      default: []
    },
    notifications : {
      type : [ SchemaTypes.ObjectId ],
      ref : 'Notification',
    },
    discord_uuid: {
      type: String,
      default: null,
      //required: true,
    },
    multiaccount: {
      type: Boolean,
      required: false,
      default: false,
    },
    ban: {
      banType: {
        type: String,
        required: false,
        default: null,
      },
      reason: {
        type: String,
        required: false,
        default: null,
      },
      time: {
        type: String,
        required: false,
        default: null,
      },
      author: {
        type: String,
        required: false,
        default: null,
      },
      moment: {
        type: String,
        required: false,
        default: null,
      },
    },
    gift: {
      type: Number,
      required: false,
      default: 0,
    },
    togNames: {
      type: Boolean,
      required: false,
      default: false
    }
    }, {
      timestamps: true
});




const User = model<IUserDocument>("User", UserSchema);

export default User;