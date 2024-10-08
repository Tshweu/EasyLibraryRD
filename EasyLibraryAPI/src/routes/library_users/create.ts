import { Router, Request, Response } from 'express';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../models/user';

const router: Router = Router();

router.post('', async (req: Request, res: Response) => {
  try {
    const new_user: IUser = {
      name: req.body.name,
      surname: req.body.surname,
      phone_number: req.body.phone_number,
      email: req.body.email,
    };
    const user = await User.create<IUser>(new_user);
    res.send(user).status(201);
  } catch (err) {
    console.log(err);
    res.send(err.message).status(500);
  }
});

export default router;
