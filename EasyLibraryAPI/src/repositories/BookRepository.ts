import pool from '../../db';
import { IBook } from '../interfaces/IBook';
import { IMember } from '../interfaces/IMember';

export class BookRepository{
    getAll(){
        const sql = `SELECT * FROM books;`;
        return pool.query(sql);
    }

    getById(book_id: number) {
        const sql = `
            SELECT * FROM books
            LEFT OUTER JOIN members
            USING (member_id)
            WHERE book_id = ?;
        `;
        return pool.query(sql,[book_id]);
    }

    create(book: IBook){
        let sql = `
            INSERT INTO 
            books(title,isbn,publisher,year,author,status,book_condition,date) 
            VALUES (?,?,?,?,?,?,?,NOW());`;
        return pool.query(sql, [
          book.title,
          book.isbn,
          book.publisher,
          book.year,
          book.author,
          book.status,
          book.book_condition,
          book.date,
        ]);
    }

    update(book: IBook){
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
        return pool.query(sql,[
            book.title,
            book.isbn,
            book.author,
            book.publisher,
            book.year,
            book.status,
            book.book_condition,
            book.book_id,
        ]);
    }

}