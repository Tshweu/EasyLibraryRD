import { Router, Request, Response } from "express";
import { ITransaction } from "../../interfaces/ITransaction";
import { IBook } from "../../interfaces/IBook";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { BookRepository } from "../../repositories/BookRepository";
import { ICreateTransactionDTO } from "../../interfaces/dto/ICreateTransactionDTO";

const router: Router = Router();

router.post("", async (req: Request, res: Response) => {
  const question = req.body;
  try {
    const transaction : ICreateTransactionDTO = {
        book_ids : req.body.book_ids,
        user_id : req.body.user_id,
        member_id : req.body.member_id
    }
    //Validate that member is active
    //Validate that user has access
    await new TransactionRepository().create(transaction);
    return res.status(201).send({});
  } catch (err) {
    console.error(
      `Error occurred while creating question: ${err.message}`,
      err
    );
    console.info("Rollback successful");
    return res.send("error creating order").status(500);
  }
});

export default router;
