import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

// // Get the directory name using import.meta.url
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// // Specify the path to the .env file
// const envPath = path.resolve(__dirname, '..', '..', '.env');
// dotenv.config({ path: envPath });

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
