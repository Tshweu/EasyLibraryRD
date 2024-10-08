import { Router, Request, Response } from "express";
import { IStaffUser } from "../../interfaces/IStaffUser";
import { StaffUser } from "../../models/staffUser";
import { ITransaction } from "../../interfaces/ITransaction";
import mongoose from "mongoose";
import { Transaction } from "../../models/transaction";
import { Book } from "../../models/book";
const router: Router = Router();

router.put("/:id", async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
  });

  try {
    const id = req.params.id;

    const original_transaction = await Transaction.findById(id).session(
      session
    );

    original_transaction.date_returned = new Date().toLocaleDateString();
    const books = req.body.books;
    //Check if all books borrowed were returned
    let all_books_returned = true;
    for (let i = 0; i < original_transaction.books.length; i++) {
        const temp_id = original_transaction.books[i]["_id"].toString()
      if (
        books.indexOf(temp_id) === -1
      ) {
        all_books_returned = false;
        break;
      }
      original_transaction.books[i].status = "returned"
    }

    if (all_books_returned) {
      original_transaction.status = "returned";
    } else {
      original_transaction.status = "partial return";
    }

    await original_transaction.save({session: session});

    //update book status to returned
    //ToDo : clear previous member object
    await Book.updateMany(
      { _id: { $in: req.body.books } },
      { $set: { status: "available" } }
    ).session(session);
    res.send(original_transaction).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
