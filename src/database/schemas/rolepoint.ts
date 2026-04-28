import { Document, model, Schema } from "mongoose";
import { autoIncrementPlugin } from "./counter";
import Character from "./character";
import type { IRolepoint } from "@modules/rolepoints";
import type { Except } from "type-fest";


export interface IRolepointDocument extends IRolepoint, Except<Document, "id"> {};//Omit<Document, "id"> {};

export const RolepointSchema = new Schema<IRolepointDocument>({
    id: { type: String, unique: true, immutable: true },
    amount: { type: Number, min: 1, default: 1 },
    characterId: { type: String, ref: "Character", required: true }, 
    reason: { type: String, required: true },
    staffId: { type: String, ref: "Character", required: true },
    givenAt: { type: Number, required: true }
});


RolepointSchema.plugin(autoIncrementPlugin, {
    id: "rolePointId",
    field: "id"
});


RolepointSchema.pre("findOneAndDelete", { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    if (!doc) return;

    const rolePointId = doc.id;

    await Character.updateMany(
        { pdr: rolePointId },
        { $pull: { pdr: rolePointId } }
    );
});


const RolepointModel = model<IRolepointDocument>("rolepoints", RolepointSchema);

export default RolepointModel;