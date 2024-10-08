import { Router, Request, Response } from "express";
import { StaffUser } from "../../models/staffUser";
import { ITransaction } from "../../interfaces/ITransaction";
import { User } from "../../models/user";
import { Transaction } from "../../models/transaction";
import { IBook } from "../../interfaces/IBook";
import { Book } from "../../models/book";
import mongoose from "mongoose";

const router: Router = Router();

router.post("", async (req: Request, res: Response) => {
  const question = req.body;
  const con = await pool.getConnection();
  await con.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
  await con.beginTransaction();
  try {
    let sql = `
        INSERT INTO questions(question_type,description,user_id) VALUES(?,?,?)`;
    await con.execute(sql, [question.question_type, question.description, 1]);
    const rows = await con.execute("SELECT LAST_INSERT_ID() as question_id");
    console.log(rows);
    for (answer of question.answers) {
      await con.execute(
        "INSERT INTO answers (description,is_correct,question_id) VALUES (?, ?,?)",
        [answer.description, answer.is_correct, rows[0][0].question_id]
      );
    }
    await con.commit();
    return res.send("Created Question").status(200);
  } catch (err) {
    console.error(
      `Error occurred while creating question: ${err.message}`,
      err
    );
    con.rollback();
    console.info("Rollback successful");
    return res.send("error creating order").status(500);
  }
});

export default router;
