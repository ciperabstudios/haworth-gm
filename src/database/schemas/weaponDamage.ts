import { BodyPartsEnum, WeaponEnum } from "@infernus/core";
import { Document, model, Model, Schema } from "mongoose";

export interface IWeaponDamage extends Document {
    weapon: keyof typeof WeaponEnum;
    data: {
        bodyPart: keyof typeof BodyPartsEnum;
        damage: number;
    }[]
}

type WeaponDamageModel = Model<IWeaponDamage>;

const WeaponDamageSchema = new Schema<IWeaponDamage, WeaponDamageModel>({
    weapon: { type: String, required: true },
    data: {
        type: [{
            bodyPart: { type: String, required: true },
            damage:   { type: String, required: true }
        }],
        required: true
    }
});

const WeaponDamage: WeaponDamageModel = model<IWeaponDamage, WeaponDamageModel>("WeaponDamage", WeaponDamageSchema);

export default WeaponDamage;