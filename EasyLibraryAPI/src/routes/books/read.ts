import { Router, Request, Response } from 'express';
import { Book } from '../../models/book';
import { IBook } from '../../interfaces/IBook';
const router: Router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const books = await Book.find<IBook>();
    res.send(books).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await Book.findById<IBook>(id);
    if(!book){
      return res.send('Book not found').status(404);
    }
    res.send(book).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
