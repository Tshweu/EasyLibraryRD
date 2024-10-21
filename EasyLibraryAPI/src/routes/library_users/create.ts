import { Router, Request, Response } from 'express';
import { IUser } from '../../interfaces/IUser';
import { IMember } from '../../interfaces/IMember';
import { MemberRepository } from '../../repositories/MemberRepository';

const router: Router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const new_member: IMember = {
      name: req.body.name,
      surname: req.body.surname,
      phone_number: req.body.phone_number,
      email: req.body.email,
      id_number: req.body.id_number,
      created_by: req.body.user_id,
      status: 'Active',
      enabled: true
    };

    await new MemberRepository().create(new_member);
    res.status(201).send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

export default router;
