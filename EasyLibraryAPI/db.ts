import mysql from 'mysql2/promise';

let con = mysql.createPool({
    host: "localhost",
    user: "vps",
    password: "dev@vintage",
    database: "easytest",
    multipleStatements: false
});

export default con;