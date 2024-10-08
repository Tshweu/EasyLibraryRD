import { Router, Request, Response} from 'express';
import { Book } from '../../models/book';
import { IBook } from '../../interfaces/IBook';
const router : Router = Router();

router.delete('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete<IBook>(id);
        if(!book){
            res.send('Book not found').status(401);
        }else{
            res.send(book).status(200);
        }
    } catch (err) {
        return res.send(err.message).status(500);
    }
})

export default router;