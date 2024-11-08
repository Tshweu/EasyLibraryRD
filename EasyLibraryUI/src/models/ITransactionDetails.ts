import { IBook } from "./IBook";
import { ILibraryMember } from "./ILibraryMember";
import { IFine } from "./IFine";
import { IStaffUser } from "./IStaffUser";

export interface ITransactionDetails{
  transaction_id: number,
  staff: IStaffUser,
  member: ILibraryMember,
  status: string,
  penalties: IFine[],
  due_date?: string,
  date_created: string,
  books: IBook[],
}
