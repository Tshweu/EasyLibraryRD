import { Router, Request, Response } from "express";
import { ITransaction } from "../../interfaces/ITransaction";
import { Transaction } from "../../models/transaction";
import mongoose from "mongoose";
const router: Router = Router();

router.get("", async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "member",
        },
      },
      {
        $lookup: {
          from: "staffusers",
          localField: "staff_user_id",
          foreignField: "_id",
          as: "staff",
        },
      },
      {
        $unwind: "$staff",
      },
      {
        $unwind: "$member",
      },
    ]).exec();
    console.log(transactions);
    res.send(transactions).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.aggregate([
      {
        $match: {
          '_id': new mongoose.Types.ObjectId(id)
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "member",
        },
      },
      {
        $lookup: {
          from: "staffusers",
          localField: "staff_user_id",
          foreignField: "_id",
          as: "staff",
        },
      },
      {
        $unwind: "$staff",
      },
      {
        $unwind: "$member",
      },
    ]).exec();
    res.send(transaction[0]).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
