const mysql = require('mysql')
const { hashPassword } = require('./routes/helpers/encrypt');
var con = mysql.createConnection({
    host: "localhost",
    user: "vps",
    password: "dev@vintage",
    multipleStatements: true
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Create Tables
//Insert demo data
function createTables() {
  //Drop if it exists

  let sql = `
        DROP DATABASE IF EXISTS easy_library;
        CREATE DATABASE easy_library; 
        CREATE TABLE easy_library.users(
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            name VARCHAR(20) NOT NULL,
            surname VARCHAR(20) NOT NULL,
            phone_number VARCHAR(10),
            password VARCHAR(55) NOT NULL,
            status VARCHAR(10) NOT NULL,
            enabled BOOLEAN NOT NULL,
            UNIQUE(username),
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
            status VARCHAR(10) NOT NULL,
            enabled BOOLEAN NOT NULL,
            created_by INT NOT NULL,
            FOREIGN KEY user_id REFERENCES users(user_id),
            UNIQUE(phone_number),
            UNIQUE(id_number),
            UNIQUE(email)
        );

        
        INSERT INTO easy_library.users (username,password) VALUES ('john@gmail.com',?)

    `;

  con.query(sql,[hashPassword('test')], (err, result) => {
    if(err) throw err;
    console.log('init');
  });

//  sql = `INSERT INTO users (username,password) VALUES ("john@gmail.com","ZoneLaws")`;
//  sql = 'INSERT INTO questions () VALUES ()';
}

createTables();

con.end();