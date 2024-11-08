import { Router, Request, Response } from "express";
import { IStaffUser } from "../../interfaces/IStaffUser";
import { ITransaction } from "../../interfaces/ITransaction";
import { TransactionRepository } from "../../repositories/TransactionRepository";
const router: Router = Router();

router.put("/:id", async (req: Request, res: Response) => {
    //return book

    const transaction = {
        transaction_id: 0,
        books: [],
        return_date: ''
      }

    const transactions = await new TransactionRepository().returnBooks(transaction);
});

export default router;
