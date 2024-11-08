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
      book_condition: req.body.book_condition
    };

    const created_book = await new BookRepository().create(new_book);
    res.status(201).send(created_book);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
