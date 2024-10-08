import { ObjectId } from "mongoose";
import { IBook } from "./IBook";
import { IPenalty } from "./IPenalty";

export interface ITransaction{
    staff_user_id: ObjectId,
    user_id: ObjectId,
    status: string,
    penalties?: IPenalty[],
    // condition: string,
    date_returned?: string,
    date: string,
    books: IBook[]
}