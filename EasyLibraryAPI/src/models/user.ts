import { Date, model, ObjectId, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const user_schema = new Schema<IUser>({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    phone_number: {type: String, required: true},
    email: {type: String, required: true},
});

export const User = model<IUser>('User',user_schema);


