import { Router, Request, Response } from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { StaffUser } from '../../models/staffUser';
const router: Router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const users = await StaffUser.find<IStaffUser>();
    res.send(users).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await StaffUser.findById<IStaffUser>(id);
    res.send(user).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
