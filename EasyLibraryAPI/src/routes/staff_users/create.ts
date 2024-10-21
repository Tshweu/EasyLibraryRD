import { Router, Request, Response } from "express";
import { IStaffUser } from "../../interfaces/IStaffUser";
import { hashPassword } from "../../helpers/encrypt";
import pool from "../../../db";
import { UserRepository } from "../../repositories/UserRepository";
const router: Router = Router();

router.post("", async (req: Request, res: Response) => {
  try {
    const new_user: IStaffUser = {
      name: req.body.name,
      surname: req.body.surname,
      phone_number: req.body.phone_number,
      email: req.body.email,
      id_number: req.body.id_number,
      status: req.body.status,
      enabled: true,
      created_by: req.body.user_id,
      password: await hashPassword(req.body.password),
    };
    
    await new UserRepository().create(new_user);
    res.status(201).send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  };
});

export default router;
