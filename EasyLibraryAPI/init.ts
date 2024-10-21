import mysql, { Connection, createConnection } from "mysql2/promise";
import { hashPassword } from "./src/helpers/encrypt";
import dotenv from 'dotenv';

dotenv.config();

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
//Create Tables
//Insert demo data
async function createTables() {
  try{
  const con: Connection = await createConnection({
    host: db_host,
    user: db_user,
    password: db_password,
    multipleStatements: true,
  });
  const password = await hashPassword('john');
  let sql = `
DROP DATABASE IF EXISTS easy_library;
CREATE DATABASE easy_library;
CREATE TABLE easy_library.users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(20) NOT NULL,
    surname VARCHAR(20) NOT NULL,
    phone_number VARCHAR(10),
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL,
    enabled BOOLEAN NOT NULL,
    id_number VARCHAR(13),
    created_by INT,
    UNIQUE(email),
    UNIQUE(phone_number),
    UNIQUE(id_number)
);
CREATE TABLE easy_library.members(
	member_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	surname VARCHAR(20) NOT NULL,
	phone_number VARCHAR(10) NOT NULL,
	email VARCHAR(50) NOT NULL,
	id_number VARCHAR(13) NOT NULL,
	status VARCHAR(20) NOT NULL,
	enabled BOOLEAN NOT NULL,
	created_by INT NOT NULL,
	FOREIGN KEY (created_by) REFERENCES users(user_id),
	UNIQUE(phone_number),
	UNIQUE(id_number),
	UNIQUE(email)
);
CREATE TABLE easy_library.books(
	book_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	isbn VARCHAR(20) NOT NULL,
	publisher VARCHAR(20) NOT NULL,
	author VARCHAR(50) NOT NULL,
	status VARCHAR(50) NOT NULL,
  book_condition VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  date DATETIME NOT NULL,
	member_id INT,
	FOREIGN KEY (member_id) REFERENCES members(member_id)
);
CREATE TABLE easy_library.transactions(
	transaction_id INT AUTO_INCREMENT PRIMARY KEY,
	book_id INT NOT NULL,
	member_id INT NOT NULL,
	user_id INT NOT NULL,
	date_created DATETIME NOT NULL,
	due_date DATETIME NOT NULL,
	status VARCHAR(20),
	returned BOOLEAN DEFAULT 0 NOT NULL);
CREATE TABLE easy_library.audit_trail_actions(
	action_id INT PRIMARY KEY,
	description VARCHAR(255) NOT NULL,
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(description)
);
CREATE TABLE easy_library.transaction_audit_trail(
	audit_id INT AUTO_INCREMENT PRIMARY KEY,
	transaction_id INT NOT NULL,
	member_id INT NOT NULL,
	user_id INT NOT NULL,
	action_id INT NOT NULL,
	FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
	FOREIGN KEY (member_id) REFERENCES members(member_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (action_id) REFERENCES audit_trail_actions(action_id)
);
CREATE TABLE easy_library.fines(
  fine_id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  member_id INT NOT NULL,
  date_created DATETIME NOT NULL,
  date_paid DATETIME NOT NULL,
  description VARCHAR(255) NOT NULL,
  status VARCHAR(20),
  amount DECIMAL(10,2),
  transaction_id INT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(book_id),
  FOREIGN KEY (member_id) REFERENCES members(member_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);
INSERT INTO easy_library.audit_trail_actions(action_id,description) 
VALUES ('1','books checked out'), 
(2,'books returned'), 
(3,'partial book return'), 
(4,'book overdue');
INSERT INTO easy_library.users 
(name,surname,phone_number,id_number,email,status,enabled,created_by,password) 
VALUES ('john','doe','0123654456','9827827383821','john@gmail.com','active',1,1,'${password}');
ALTER TABLE easy_library.users ADD CONSTRAINT fk_user_ufk FOREIGN KEY (created_by) REFERENCES users(user_id);
`;


  await con.query(sql);
  con.end();
  console.log('done');
}catch(err){
  console.log(err.message);
}

}

createTables();


