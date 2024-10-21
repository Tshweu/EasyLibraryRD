import { RowDataPacket } from "mysql2";

export interface IUser{
    name: string,
    surname: string,
    phone_number: string,
    email: string,
    status: string,
    id_number: string,
    enabled: boolean,
    created_by?: number
}

