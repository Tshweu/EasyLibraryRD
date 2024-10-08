import { Router, Request, Response} from 'express';
import { Book } from '../../models/book';
import { IBook } from '../../interfaces/IBook';
const router : Router = Router();

router.put('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const new_book: IBook = {
            title: req.body.title,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            publication_year: req.body.publication_year,
            author: req.body.author,
            status: req.body.status,
            condition: req.body.condition,
        }
        let book = await Book.findByIdAndUpdate<IBook>(id,new_book,{new: true});
        res.send(book).status(200);
    } catch (err) {
        res.send(err.message).status(500);
    }
})

export default router;