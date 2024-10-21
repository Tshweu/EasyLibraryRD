import { IBook } from "./IBook";
import { IPenalty } from "./IPenalty";

export interface ITransaction{
    user_id: number,
    member_id: number,
    book_id: number,
    status: string,
    // penalties?: IPenalty[],
    // condition: string,
    date_returned?: string,
    date: string,
    books: IBook[]
}