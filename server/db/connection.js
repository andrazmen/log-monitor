const mysql = require("mysql2");

const dotenv = require("dotenv");

//dotenv.config();
/*
const conn = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  connectionLimit: 15,
});
*/
const conn = mysql.createPool(process.env.MYSQL_URL);
exports.pool = conn;
