import { Router, Request, Response} from 'express';
import { IBook } from '../../interfaces/IBook';
import { BookRepository } from '../../repositories/BookRepository';
const router : Router = Router();

router.put('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const book: IBook = {
            book_id: req.body.book_id,
            title: req.body.title,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            year: req.body.publication_year,
            author: req.body.author,
            status: req.body.status,
            book_condition: req.body.condition,
        };
        await new BookRepository().update(book);
        res.status(200).send('success');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

export default router;