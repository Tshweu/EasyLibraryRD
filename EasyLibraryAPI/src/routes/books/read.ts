import { Router, Request, Response } from 'express';
import { IBook } from '../../interfaces/IBook';
import { BookRepository } from '../../repositories/BookRepository';
const router: Router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const [books] = await new BookRepository().getAll();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await new BookRepository().getById(id);

    if(!book){
      return res.status(404).send('Book not found');
    }
    return res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
