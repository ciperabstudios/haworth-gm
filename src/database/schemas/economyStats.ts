import { Document, model, Schema } from "mongoose";

export interface EconomyStatsProps {
    totalPlayerCash: number;
    totalBankMoney: number;
    totalBusinessFunds: number;
    totalFactionFunds: number;
}

interface IEconomyStats extends EconomyStatsProps, Document {};


const EconomyStatsSchema = new Schema<IEconomyStats>({
    _id: { type: String, default: "main" },
    totalPlayerCash: { type: Number, required: true, default: 0 },
    totalBankMoney: { type: Number, required: true, default: 0 },
    totalBusinessFunds: { type: Number, required: true, default: 0 },
    totalFactionFunds: { type: Number, required: true, default: 0 }
}, { timestamps: { 
    createdAt: false,
    updatedAt: true
 } });
 

const EconomyStats = model<IEconomyStats>("EconomyStats", EconomyStatsSchema);

export default EconomyStats;