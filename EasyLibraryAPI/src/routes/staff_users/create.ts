import { Router, Request, Response } from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { StaffUser } from '../../models/staffUser';
import { hashPassword } from '../../helpers/encrypt';
const router: Router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const new_user: IStaffUser = {
      name: req.body.name,
      surname: req.body.surname,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: await hashPassword(req.body.password),
    };
    const user = await StaffUser.create<IStaffUser>(new_user);
    res.send('success').status(201);
  } catch (err) {
    console.log(err);
    res.send(err.message).status(500);
  }
});

export default router;
