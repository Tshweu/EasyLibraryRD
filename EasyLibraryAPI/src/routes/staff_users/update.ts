import { Router, Request, Response} from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { StaffUser } from '../../models/staffUser';
const router : Router = Router();

router.put('/:id',async (req: Request,res: Response)=>{
    try {
        const id = req.params.id;
        const user: IStaffUser = {
            name: req.body.name,
            surname: req.body.surname,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password,
        }
        let updated_user = await StaffUser.findByIdAndUpdate<IStaffUser>(id,user,{new: true});
        res.send(updated_user).status(200);
    } catch (err) {
        res.send(err.message).status(500);
    }
})

export default router;