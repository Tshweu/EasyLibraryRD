import mongoose from "mongoose";
import { ITransaction } from "../interfaces/ITransaction";
import { book_schema } from "./book";
import { penalty_schema } from "./penalty";

const transactionSchema = new mongoose.Schema<ITransaction>({
  staff_user_id: { type: mongoose.Types.ObjectId, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true },
  status: { type: String, required: true },
  penalties: {type: [penalty_schema]},
  //condition: { type: String, required: true },
  date_returned: { type: String },
  date: { type: String, required: true },
  books: [book_schema],
});

export const Transaction = mongoose.model('Transaction',transactionSchema);
