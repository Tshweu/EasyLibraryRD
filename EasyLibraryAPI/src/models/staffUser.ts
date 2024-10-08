import { Date, model, ObjectId, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { IStaffUser } from "../interfaces/IStaffUser";

const staff_user_schema = new Schema<IStaffUser>({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    phone_number: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

export const StaffUser = model('StaffUser',staff_user_schema);




