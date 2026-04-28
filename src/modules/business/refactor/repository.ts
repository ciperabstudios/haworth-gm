import { MongooseRepository } from "@utils/interfaces/repository";
import { Business } from "./domain";
import type { IBusiness } from "./interfaces";
import type { Model } from "mongoose";
import type { Document } from "mongoose";
import BusinessModel from "@database/schemas/business";


export class BusinessRepository extends MongooseRepository<Business, IBusiness> {
    constructor() {
        super(
            BusinessModel as Model<IBusiness & Document>,
            (json: IBusiness) => new Business(json),
            (entity: Business) => entity.allProps
        );
    }
}