import { Router, Request, Response } from "express";
import { IBook } from "../../interfaces/IBook";
import con from "../../../db";
import { BookRepository } from "../../repositories/BookRepository";
const router: Router = Router();

router.post("", async (req: Request, res: Response) => {
  try {
    const new_book: IBook = {
      title: req.body.title,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      year: req.body.year,
      author: req.body.author,
      status: req.body.status,
      book_condition: req.body.condition
    };

    await new BookRepository().create(new_book);
    res.status(201).send('success');
  } catch (err) {
    console.log(err);
    res.send(err.message).status(500);
  }
});

export default router;
