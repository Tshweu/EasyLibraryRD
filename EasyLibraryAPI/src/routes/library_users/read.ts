import { Router, Request, Response } from 'express';
import { IBook } from '../../interfaces/IBook';
import { IUser } from '../../interfaces/IUser';
import { MemberRepository } from '../../repositories/MemberRepository';
const router: Router = Router();

router.get('', async (req: Request, res: Response) => {
  try {
    const [members] = await new MemberRepository().getAll();
    res.status(200).send(members);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const [member] = await new MemberRepository().getById(id);
    res.status(200).send(member[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
