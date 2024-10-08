import { Router, Request, Response } from 'express';
import { IBook } from '../../interfaces/IBook';
import { StaffUser } from '../../models/staffUser';
import { User } from '../../models/user';
import { IUser } from '../../interfaces/IUser';
const router: Router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const users = await User.find<IUser>();
    res.send(users).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById<IUser>(id);
    res.send(user).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
