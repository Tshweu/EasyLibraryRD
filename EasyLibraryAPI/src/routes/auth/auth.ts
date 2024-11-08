import verifyToken from '../../helpers/token';
import { compare } from '../../helpers/encrypt';
import { Router,Request,Response } from 'express';
import { IAuth } from '../../interfaces/IAuth';
import { IStaffUser } from '../../interfaces/IStaffUser';
import jwt from 'jsonwebtoken';
import pool from '../../../db';
const key = process.env.KEY;

const router: Router = Router();

router.post('',async (req: Request, res: Response)=>{
    let login_data: IAuth = {
        email : req.body.email,
        password : req.body.password
    };

    if(!login_data.email || !login_data.password){
        return res.status(401).send('invalid email or password');
    }

    let sql = `
        SELECT * FROM users WHERE email = ?;
    `;
    const result = await pool.execute(sql,[login_data.email]);
    if(!result[0][0]){
        return res.status(401).send('invalid login details');
    }
    await compare(login_data.password,result[0][0].password,(authenticated)=>{
        if(authenticated){
            let payload = { subject: result[0][0].user_id };
            let token = jwt.sign(payload, key);
            return res.status(200).send({ "token": token });
        }else{
            return res.status(401).send('Invalid login details');
        }
    });
})

export default router;
