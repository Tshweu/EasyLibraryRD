import verifyToken from '../../helpers/token';
import { compare } from '../../helpers/encrypt';
import { Router,Request,Response } from 'express';
import { IAuth } from '../../interfaces/IAuth';
import { StaffUser } from '../../models/staffUser';
import { IStaffUser } from '../../interfaces/IStaffUser';
import jwt from 'jsonwebtoken';
const pool = require('../../db');
const key = process.env.KEY;

const router: Router = Router();

router.post('',async (req: Request, res: Response)=>{
    let login_data: IAuth = {
        username : req.body.username,
        password : req.body.password
    };
    const con = await pool.getConnection();
    let sql = `
        SELECT * FROM users WHERE username = ?;
    `;
    const result = await con.execute(sql,[login_data.username]);
    await compare(login_data.password,result[0][0].password,(authenticated)=>{
        if(authenticated){
            let payload = { subject: result[0][0].user_id };
            let token = jwt.sign(payload, key);
            res.status(200).send({ "token": token });
       }
    });
})

export default router;
