import { Router, Request, Response} from 'express';
import { IUser } from '../../interfaces/IUser';
import { IMember } from '../../interfaces/IMember';
import { MemberRepository } from '../../repositories/MemberRepository';
const router : Router = Router();

router.put('/:id',async (req: Request,res: Response)=>{
    try {
       const member : IMember = {
        member_id: req.body.member_id,
        name: req.body.name,
        surname: req.body.surname,
        phone_number: req.body.phone_number,
        email: req.body.email,
        id_number: req.body.id_number,
        created_by: req.body.user_id,
        status: req.body.status,
        enabled: req.body.enabled,
      };
      await new MemberRepository().update(member);
      res.status(200).send('success');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

export default router;