import { Router, Request, Response } from 'express';
import { Book } from '../../models/book';
import { IBook } from '../../interfaces/IBook';

const router: Router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const new_book: IBook = {
      title: req.body.title,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      publication_year: req.body.publication_year,
      author: req.body.author,
      status: req.body.status,
      condition: req.body.condition,
      date: new Date().toLocaleDateString(),
    };
    const book = await Book.create<IBook>(new_book);
    res.send(book).status(201);
  } catch (err) {
    console.log(err);
    res.send(err.message).status(500);
  }
});

export default router;
