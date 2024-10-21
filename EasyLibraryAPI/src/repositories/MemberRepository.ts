import pool from '../../db';
import { IMember } from '../interfaces/IMember';

export class MemberRepository{
    getAll(){
        const sql = `SELECT * FROM members;`;
        return pool.query(sql);
    }

    getById(member_id: number){
        const sql = `
            SELECT 
                m.member_id,
                m.name, 
                m.surname, 
                m.phone_number, 
                m.email, 
                m.id_number, 
                m.status, 
                m.enabled,
                u.name as staff_name,
                u.surname as staff_surname,
                u.email as staff_email
            FROM members as m
            INNER JOIN users as u
            ON u.user_id = m.created_by
            WHERE member_id = ?;`;
        return pool.query(sql,[member_id]);
    }

    create(member: IMember){
        let sql = `
        INSERT INTO members(
            name,
            surname,
            phone_number,
            email,
            id_number,
            status,
            enabled,
            created_by)
        VALUES (?,?,?,?,?,?,?,?)
        `;
    return pool.query(sql, [
      member.name,
      member.surname,
      member.phone_number,
      member.email,
      member.id_number,
      member.status,
      member.enabled,
      member.created_by
    ]);
    }

    update(member: IMember){
        const sql = `
            UPDATE members 
            SET 
                name = ?,
                surname = ?,
                email = ?,
                phone_number = ?,
                id_number = ?,
                enabled = ?,
            WHERE 
                member_id = ?;
        `;
        return pool.query(sql,[
            member.name,
            member.surname,
            member.email,
            member.phone_number,
            member.id_number,
            member.enabled,
            member.member_id
        ]);
    }

}