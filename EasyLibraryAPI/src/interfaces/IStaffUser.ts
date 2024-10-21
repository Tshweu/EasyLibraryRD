import { RowDataPacket } from "mysql2/promise";
import { IUser } from "./IUser";

export interface IStaffUser extends IUser{
    user_id?: number,
    password?: string
}