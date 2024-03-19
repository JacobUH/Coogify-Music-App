import pool from '../dbConnection.js';

export async function registerUser(email, userPassword, fName, lName, dob) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO USER 
    (email, userPassword, firstName, lastName, dateOfBirth)
     VALUES (?, ?, ?, ?, ?)`,
      [email, userPassword, fName, lName, dob]
    );
    console.log('User inserted successfully');
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}
