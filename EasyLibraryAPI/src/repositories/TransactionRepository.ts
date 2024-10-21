import pool from '../../db';
import { ICreateTransactionDTO } from '../interfaces/dto/ICreateTransactionDTO';
import { ITransaction } from '../interfaces/ITransaction';

export class TransactionRepository{
    getAll(){
        const sql = `
            SELECT 
                t.transaction_id,
                t.member_id,
                t.book_id,
                b.title,
                b.isbn,
                b.author,
                b.publisher,
                b.year,
                t.date_created,
                t.due_date,
                t.status,
                t.returned,
                CONCAT(u.name,' ',u.surname) as staff,
                CONCAT(m.name,' ',m.surname) as member
            FROM transactions as t
            INNER JOIN books as b
            USING(book_id)
            INNER JOIN members as m
            ON m.member_id = t.member_id
            INNER JOIN users as u
            ON t.user_id = u.user_id; 
            `;
        return pool.query(sql);
    }

    getById(transaction_id: number){
        const sql = `
            SELECT 
                t.transaction_id,
                t.member_id,
                t.user_id,
                t.book_id,
                b.title,
                b.isbn,
                b.author,
                b.publisher,
                b.year,
                t.date_created,
                t.due_date,
                t.status,
                t.returned,
                CONCAT(u.name,' ',u.surname) as staff_full_name,
                u.phone_number as staff_phone_number,
                u.email as staff_email,
                CONCAT(m.name,' ',m.surname) as member_full_name,
                m.phone_number as member_phone_number,
                m.email as member_email
            FROM transactions as t
            INNER JOIN books as b
            USING(book_id)
            INNER JOIN members as m
            ON m.member_id = t.member_id
            INNER JOIN users as u
            ON t.user_id = u.user_id
            WHERE transaction_id = ?; 
            `;
        return pool.query(sql,[transaction_id]);
    }

    getByMemberId(member_id: number){
        const sql = `
            SELECT 
                t.transaction_id,
                t.member_id,
                t.user_id,
                t.book_id,
                b.title,
                b.isbn,
                b.author,
                b.publisher,
                b.year,
                t.date_created,
                t.due_date,
                t.status,
                t.returned,
                CONCAT(u.name,' ',u.surname) as staff_full_name,
                u.phone_number as staff_phone_number,
                u.email as staff_email,
                CONCAT(m.name,' ',m.surname) as member_full_name,
                m.phone_number as member_phone_number,
                m.email as member_email
            FROM transactions as t
            INNER JOIN books as b
            USING(book_id)
            INNER JOIN members as m
            ON m.member_id = t.member_id
            INNER JOIN users as u
            ON t.user_id = u.user_id
            WHERE m.member_id = ?; 
            `;
        return pool.query(sql,[member_id]);
    }

    async create(transaction: ICreateTransactionDTO){
        const con = await pool.getConnection();
            await con.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
            await con.beginTransaction();
        try {
            // await pool.beginTransaction();
            for(let i = 0;i < transaction.book_ids.length;i++){
                let sql = `
                    INSERT INTO
                    transactions(book_id,member_id,user_id,date_created,due_date,status) 
                    VALUES(?,?,?,CURRENT_TIMESTAMP,?,?);`;
                await con.query(sql, 
                    [
                        transaction.book_ids[i],
                        transaction.member_id,
                        transaction.user_id,
                        new Date().toISOString().slice(0, 19).replace('T', ' '),
                        'checked'
                    ]);
                // const [result] = await pool.execute("SELECT LAST_INSERT_ID() as transaction_id");
            }
            await con.commit();
        } catch (err) {
          console.error(
            `Error occurred while creating question: ${err.message}`,
            err
          );
          con.rollback();
          console.info("Rollback successful");
          throw new Error(err.message);
        } finally{
            pool.releaseConnection(con);
            con.release();
        }
    }

    update(member: ITransaction){
        const sql = ``;
        return pool.query(sql,[
        ]);
    }

}