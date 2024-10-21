import { Router, Request, Response } from "express";
import { ITransaction } from "../../interfaces/ITransaction";
import { TransactionRepository } from "../../repositories/TransactionRepository";
const router: Router = Router();

router.get("", async (req: Request, res: Response) => {
  try {
    const [transactions] = await new TransactionRepository().getAll();
    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [transaction] = await new TransactionRepository().getById(id);
    res.send(transaction[0]).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
