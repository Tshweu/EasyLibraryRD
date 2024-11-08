import pool from "../../db";
import { IBook } from "../interfaces/IBook";
import { IMember } from "../interfaces/IMember";
import { DateTime } from "luxon";

export class BookRepository {
  async getAll() {
    try {
      const sql = `SELECT * FROM books;`;
      const books = await pool.query(sql);
      return books;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(book_id: number) {
    try {
      const sql = `
            SELECT 
              book_id,
              title,
              isbn,
              year,
              publisher,
              author,
              books.status, 
              book_condition,
              member_id, 
              name,
              surname,
              phone_number,
              email
            FROM books
            LEFT OUTER JOIN members
            USING (member_id)
            WHERE book_id = ?;
        `;
      const [book] = await pool.query(sql, [book_id]);
      return book[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(book: IBook) {
    try {
      let sql = `
            INSERT INTO 
            books(title,isbn,publisher,year,author,status,book_condition,date) 
            VALUES (?,?,?,?,?,?,?,?);`;
      const [created_book] = await pool.query(sql, [
        book.title,
        book.isbn,
        book.publisher,
        book.year,
        book.author,
        book.status,
        book.book_condition,
        DateTime.now().setZone("Africa/Johannesburg").toISO(),
      ]);
      return created_book[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(book: IBook) {
    try {
      const sql = `
            UPDATE books 
            SET 
                title = ?,
                isbn = ?,
                author = ?,
                publisher = ?,
                year = ?,
                status = ?,
                book_condition = ?
            WHERE
                book_id = ?;
        `;
      const [updated_book] = await pool.query(sql, [
        book.title,
        book.isbn,
        book.author,
        book.publisher,
        book.year,
        book.status,
        book.book_condition,
        book.book_id,
      ]);
      return updated_book;
    } catch (err) {
      throw new Error(err);
    }
  }
}
