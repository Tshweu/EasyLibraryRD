import { Router, Request, Response} from 'express';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models/user';
const router : Router = Router();

router.put('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const user: IUser = {
            name: req.body.name,
            surname: req.body.surname,
            phone_number: req.body.phone_number,
            email: req.body.email,
            // status: req.body.status
        }
        let updatedUser = await User.findByIdAndUpdate<IUser>(id,user,{new: true});
        res.send(updatedUser).status(200);
    } catch (err) {
        res.send(err.message).status(500);
    }
})

export default router;