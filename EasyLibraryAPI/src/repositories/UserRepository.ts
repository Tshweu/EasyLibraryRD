import pool from "../../db";
import { IStaffUser } from "../interfaces/IStaffUser";
import { IUser } from "../interfaces/IUser";

export class UserRepository {
  getAll() {
    const sql = `SELECT 
            name,
            surname,
            phone_number,
            email,id_number,
            status,enabled,
            created_by 
            FROM users`;
    return pool.query(sql);
  }

  getById(user_id: number) {
    const sql = `SELECT 
            name,
            surname,
            phone_number,
            email,
            id_number,
            status,
            enabled,
            created_by
            FROM users
            WHERE user_id = ?`;
    return pool.query(sql, [user_id]);
  }

  create(new_user: IStaffUser) {
    let sql = `
      INSERT INTO users(
        name,
        surname,
        phone_number,
        email,
        id_number,
        status,
        enabled,
        created_by,
        password)
      VALUES (?,?,?,?,?,?,?,?,?);
    `;
    return pool.query(sql, [
      new_user.name,
      new_user.surname,
      new_user.phone_number,
      new_user.email,
      new_user.id_number,
      new_user.status,
      new_user.enabled,
      new_user.created_by,
      new_user.password,
    ]);
  }

  update(user: IStaffUser) {
    const sql = `
            UPDATE users 
            SET 
                name = ?,
                surname = ?, 
                phone_number = ?,
                email = ?,
                id_number = ?,
                status = ?,
                enabled = ?
            WHERE 
                user_id = ?
            `;
            console.log(user);
    return pool.query(sql, [
      user.name,
      user.surname,
      user.phone_number,
      user.email,
      user.id_number,
      user.status,
      user.enabled,
      user.user_id,
    ]);
  }
}
