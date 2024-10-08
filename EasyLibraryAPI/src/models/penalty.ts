import { Date, model, ObjectId, Schema } from "mongoose";
import { IPenalty } from "../interfaces/IPenalty";

export const penalty_schema = new Schema<IPenalty>({
    description: {type: String, required: true},
    date: {type: String, required: true},
    cost: {type: Number, required: true}
});

export const Penalty = model('penalty',penalty_schema);




