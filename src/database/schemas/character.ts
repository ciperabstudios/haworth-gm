import type { IPlayerJobData } from "@modules/jobs";
import { keySchema, type IKeys } from "@modules/keys/definitions";
import type { ILevelData } from "@modules/server/level";
//import { KeySchema, type ShortcutKeys } from "@modules/keys";
import type { StrictSchemaDefinition } from "@utils/interfaces/schemas";
import { Document, type Model, model, Schema } from "mongoose";

export const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

export const ETHNICITIES = ["Caucásico", "Afroamericano", "Asiático", "Hispano", "Indígena", "Árabe"] as const; 

export const EYES_TYPES = ["Castaños", "Verdes", "Azules", "Grises", "Café", "Avellanos", "Marrones", "Ámbar"] as const;

//const Genre = ["Masculino", "Femenino"] as const;

export const HAIR_TYPES = ["Castaño", "Castaño oscuro", "Rubio", "Negro", "Pelirrojo cobrizo", "Pelirrojo intenso", "Plateado", "Teñido", "Calvo"] as const;

export const CONTINENTS = {
    "América del Norte": ["Estados Unidos", "Canadá", "México"],
    "América Central": ["Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panamá", "México"],
    "América Central (Caribe)": ["Puerto Rico", "Bahamas", "Colombia", "Costa Rica", "Cuba", "Guatemala", "Honduras","Nicaragua", "Panamá", "República Dominicana", "Venezuela"],
    "América del Sur": ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Ecuador", "Paraguay", "Perú", "Uruguay", "Venezuela"],
    "Asia": ["Afganistán", "Arabia Saudita", "Bangladés", "Catar", "China", "Corea del Sur", "Filipinas", "India", "Irán", "Japón", "Rusia"],
    "Europa": ["Rusia", "Alemania", "Reino Unido", "Francia", "Italia", "España", "Ucrania", "Países Bajos", "Bélgica", "Suiza", "Lituania"],
    "África": ["Nigeria", "República Democrática del Congo", "Etiopía", "Egipto", "Sudáfrica", "Argelia", "Marruecos"],
    "Oceanía": ["Australia", "Nueva Zelanda", "Fiyi", "Micronesia", "Papúa Nueva Guinea", "Kiribati"]
} as const;

/* export interface CharacterInput {
    accountID: string;
    name: string;
};
 */
export interface IPlayerCurrency {
    cash: number;
    // bank ...
}

export type BloodType = typeof BLOOD_TYPES[number];
export type Ethnicity = typeof ETHNICITIES[number];
export type HairType = typeof HAIR_TYPES[number];
export type EyesType = typeof EYES_TYPES[number];

export type Continent = keyof typeof CONTINENTS;
export type Country = typeof CONTINENTS[Continent][number];



export interface ICharacter {
    ID: string;
    accountID: string;
    name: string;

    lastConnection: number;

    health: number;
    kevlar: number;

    level: ILevelData;

    genre: 'male' | 'female';

    skin: {
        id: number;
    }

    // Características superficiales.
    profile: {
        age: number;
        height: number;
        weight: number;
        blood: BloodType;
        ethnicity: Ethnicity;
        hair: HairType;
        eyes: EyesType;
        continent: keyof typeof CONTINENTS;
        country: string;
    }

    // Sistema de economía.
    currency: {
        cash: number;
        // TODO: Añadir bank. Se podría tener dinero vinculado a varios bancos.
    }

    // Teclas/Atajos.
    shortcutKeys: IKeys;

    // Sistema de trabajos (jobs).
    job?: IPlayerJobData;

    coordinates: {
        x: number;
        y: number;
        z: number;
        // angle: number;
        camera: {
            x: number;
            y: number;
            z: number;
        }
        interior: number;
        virtualWorld: number;
    }

    // Estadísticas de eventos administrativos.
    pdr?: string[];
}


export interface ICharacterDocument extends ICharacter, Document {};
export interface ICharacterModel    extends Model<ICharacterDocument> {};

export interface CreateCharacterDTO {
    name: ICharacter["name"];
    genre: ICharacter["genre"];
    profile: ICharacter["profile"];
}

const levelSchema = new Schema({
    actual: { type: Number, min: 1, default: 1 },
    points: { type: Number, min: 0, default: 0 },
    totalPoints: { type: Number, min: 20, default: 0 }
}, { _id: false });

const skinSchema = new Schema({
    id: { 
        type: Number, 
        min: [0, "El ID de skin {VALUE} es inválido. Debe ser al menos 0."], 
        max: [311, "El id de skin {VALUE} es inválido. Debe ser máximo 311."], 
        required: true 
    }
}, { _id: false });

const profileSchema = new Schema({
    age: { type: Number, min: 16, max: 100, required: true },
    height: { type: Number, min: 140, max: 210, required: true },
    weight: { type: Number, min: 35, max: 200, required: true },
    blood: { type: String, enum: BLOOD_TYPES, required: true },
    ethnicity: { type: String, enum: ETHNICITIES, required: true },
    hair: { type: String, enum: HAIR_TYPES, required: true },
    eyes: { type: String, enum: EYES_TYPES, required: true },
    continent: { type: String, enum: Object.keys(CONTINENTS), required: true },
    country: {
        type: String,
        required: true,
        validate: {
            validator: function (this: { continent?: Continent }, country: string) {
                if (!this.continent) return false;

                const countries = CONTINENTS[this.continent] as readonly string[];
                return countries.includes(country);
            },
            message: (props: any) => `El país '${props.value}' no pertenece al continente seleccionado.`
        }
    }
}, { _id: false });

const currencySchema = new Schema({
    cash: { type: Number, min: 0, max: 999_999_999, default: 0 }
}, { _id: false });

const coordinatesSchema = new Schema({
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 },
    interior: { type: Number, min: 0, default: 0 },
    virtualWorld: { type: Number, min: 0, default: 0 },
    camera: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        z: { type: Number, default: 0 }
    }
}, { _id: false });

const jobSchema = new Schema({
    jobType: { type: String, required: true },
    shiftsCompleted: { type: Number, min: 0, default: 0 }
}, { _id: false });


const characterSchemaDefinition: StrictSchemaDefinition<ICharacter> = {
    ID: { type: String, required: true, unique: true, immutable: true },
    accountID: { type: String, required: true, immutable: true },

    // -------

    name: { type: String, required: true, match: /^[A-Z][a-z]+_[A-Z][a-z]+$/g }, // Nombre_Apellido

    health: { type: Number, min: 0, max: 100, default: 100 },
    kevlar: { type: Number, min: 0, max: 100, default: 0 },

    level: levelSchema,

    genre: { type: String, enum: ["male", "female"], required: true },

    skin: skinSchema,

    profile: profileSchema,

    currency: currencySchema,

    lastConnection: { type: Number, default: Date.now() },

    coordinates: coordinatesSchema,

    pdr: { type: [String], default: [] },

    job: jobSchema,

    shortcutKeys: keySchema
};

const characterSchema = new Schema<ICharacterDocument, ICharacterModel>(characterSchemaDefinition, { timestamps: true });

characterSchema.pre('validate', function(next) {
    if (!this.skin || this.skin.id === undefined) {
        this.skin = {
            id: this.genre === "male" ? 2 : 41
        };
    }
    next();
});

const CharacterModel = model<ICharacterDocument, ICharacterModel>("characters", characterSchema);

export default CharacterModel;