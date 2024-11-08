import { IBook } from "./IBook";
import { ILibraryMember } from "./ILibraryMember";
import { IFine } from "./IFine";
import { IStaffUser } from "./IStaffUser";

export interface ITransaction{
  staff: IStaffUser,
  member: ILibraryMember,
  status: string,
  penalties: IFine[],
  date_returned?: string,
  date: string,
  books: IBook[],
}
