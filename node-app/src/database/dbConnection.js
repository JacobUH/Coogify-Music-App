import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// create connection pool
const pool = mysql
  .createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export default pool;
