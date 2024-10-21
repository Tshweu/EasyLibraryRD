import { Router, Request, Response } from 'express';
import { IStaffUser } from '../../interfaces/IStaffUser';
import { UserRepository } from '../../repositories/UserRepository';

const router: Router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const [users,fields] = await new UserRepository().getAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [user,fields] = await new UserRepository().getById(id);
    res.status(200).send(user[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
