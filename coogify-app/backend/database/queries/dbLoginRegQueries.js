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

export async function getPasswordByEmail(email) {
  try {
    const [rows] = await pool.query(
      `SELECT userPassword FROM USER WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      const hashedPassword = rows[0].userPassword;
      console.log('Fetched Password');
      return hashedPassword; // Return the hashed password
    } else {
      // No matching email found in the database
      return null; // Or you can throw an error if you prefer
    }
  } catch (err) {
    console.error('Error fetching password:', err.message);
    return null; // Or you can throw an error if you prefer
  }
}

