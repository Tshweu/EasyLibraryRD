import { IMember } from "../IMember";
import { IStaffUserTransactionDTO } from "./IStaffUserTransactionDTO";
import { IBook } from "../IBook";
import { IPenalty } from "../IPenalty";
import { IMemberTransactionDTO } from "./IMemberTransactionDTO";

export interface IReadTransactionDTO{
    transaction_id : number,
    staff : IStaffUserTransactionDTO,
    member: IMemberTransactionDTO,
    total_books: number,
    status: string,
    due_date: string,
    date_created: string,
}