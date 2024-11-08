import { QueryResult, RowDataPacket } from "mysql2";
import pool from "../../db";
import { ICreateTransactionDTO } from "../interfaces/dto/ICreateTransactionDTO";
import { ITransaction } from "../interfaces/ITransaction";
import { DateTime } from "luxon";

export class TransactionRepository {
  async getAll(){
    try {
      const sql = `
            SELECT 
                t.transaction_id,
                t.member_id,
                t.total_books,
                t.date_created,
                t.due_date,
                t.status,
                u.name as staff_name,
                u.surname as staff_surname,
                u.phone_number as staff_phone,
                u.email as staff_email,
                u.id_number as staff_id_number,
                m.name as member_name,
                m.surname as member_surname,
                m.phone_number as member_phone_number,
                m.email as member_email,
                m.id_number as member_id_number
            FROM transactions as t
            INNER JOIN members as m
            ON m.member_id = t.member_id
            INNER JOIN users as u
            ON t.user_id = u.user_id; 
            `;
      const [transactions] = await pool.query(sql);
      return transactions as [];
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(transaction_id: number) {
    try {
      const sql = `
            SELECT 
                t.transaction_id,
                t.member_id,
                t.user_id,
                b.title,
                b.isbn,
                b.author,
                b.publisher,
                b.year,
                t.date_created,
                t.due_date,
                t.status,
                tb.book_id,
                tb.returned,
                tb.date_returned,
                u.name as staff_name,
                u.surname as staff_surname,
                u.phone_number as staff_phone_number,
                u.email as staff_email,
                m.name as member_name,
                m.surname as member_surname,
                m.phone_number as member_phone_number,
                m.email as member_email
            FROM transactions as t
            INNER JOIN transaction_books as tb
            USING(transaction_id)
            INNER JOIN books as b
            USING(book_id)
            INNER JOIN members as m
            ON m.member_id = t.member_id
            INNER JOIN users as u
            ON t.user_id = u.user_id
            WHERE transaction_id = ?; 
            `;
        const [transactions] = await pool.query(sql, [transaction_id]);
        return transactions as [];
    } catch (error) {

    }
    
  }

  getByMemberId(member_id: number) {
    const sql = `
            SELECT 
                t.transaction_id,
                t.member_id,
                t.user_id,
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
    return pool.query(sql, [member_id]);
  }

  async create(transaction: ICreateTransactionDTO) {
    const con = await pool.getConnection();
    await con.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await con.beginTransaction();
    try {
      let sql = `
                    INSERT INTO
                    transactions(member_id,user_id,due_date,status,date_created,total_books) 
                    VALUES(?,?,?,?,CURRENT_TIMESTAMP,?);`;
      console.log(DateTime.now());
      //if weekday is > 1 add 6 days
      //make function
      await con.query(sql, [
        transaction.member_id,
        transaction.user_id,
        DateTime.now().setZone("Africa/Johannesburg").plus({ days: 7 }).toISO(),
        "checked",
        transaction.book_ids.length,
      ]);
      const [transaction_id] = await con.query("SELECT LAST_INSERT_ID() as id");
      console.log(transaction_id[0]);

      for (let i = 0; i < transaction.book_ids.length; i++) {
        let sql = `
                INSERT INTO
                transaction_books(transaction_id,book_id) 
                VALUES(?,?);`;
        await con.query(sql, [transaction_id[0].id, transaction.book_ids[i]]);
      }
      await con.commit();
    } catch (err) {
      console.error(`Error occurred while checking out: ${err.message}`, err);
      con.rollback();
      console.info("Rollback successful");
      throw new Error(err.message);
    } finally {
      pool.releaseConnection(con);
      con.release();
    }
  }

  update(member: ITransaction) {
    const sql = ``;
    return pool.query(sql, []);
  }

  async returnBooks(transaction){
    const books = [];
    const con = await pool.getConnection();
    await con.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    await con.beginTransaction();
    const date = DateTime.now().setTimeZone('');
    try {

      for(let i = 0; i < books.length;i++){
        let sql = `
          UPDATE transaction_books
          SET 
            returned = ?,
            returned_date = ?
          WHERE 
            transaction_id = ?
          AND 
            book_id = ?;
        `
        con.query(sql,[true,date,0,0]);
      }

      //update transaction status
      //partial or fully completed
      

    } catch (err) {
      
    }
  }
}
