import { Router, Request, Response} from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { UserRepository } from '../../repositories/UserRepository';
const router : Router = Router();

router.put('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const user: IStaffUser = {
            user_id: req.body.id,
            name: req.body.name,
            surname: req.body.surname,
            phone_number: req.body.phone_number,
            email: req.body.email,
            id_number: req.body.id_number,
            status: req.body.status,
            enabled: req.body.enabled,
        }

        const [results] = await new UserRepository().update(user);
        console.log(results); 
        res.status(200).send('success');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

export default router;