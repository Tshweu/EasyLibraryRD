import { Router, Request, Response} from 'express';
import { IBook } from '../../interfaces/IBook';
const router : Router = Router();

router.delete('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const book = {};
        if(!book){
            res.status(401).send('Book not found');
        }else{
            res.status(200).send(book);
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

export default router;