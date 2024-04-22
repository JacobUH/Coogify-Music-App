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

    // Extract the userID
    const userID = rows.insertId;

    // Insert a row into the SUBSCRIPTION table
    await pool.query(
      `INSERT INTO SUBSCRIPTION 
       (userID, subscriptionType, subcriptionActive, renewDate)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [userID, 'Paid', 0] // Fix the column name from 'subcriptionActive' to 'subscriptionActive'
    );

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
      return hashedPassword; 
    } else {
      // No matching email found in the database
      return null; 
    }
  } catch (err) {
    console.error('Error fetching password:', err.message);
    return null;
  }
}

// export async function registerUser(email, userPassword, fName, lName, dob) {
//   try {
//     const [rows] = await pool.query(
//       `INSERT INTO USER
//     (email, userPassword, firstName, lastName, dateOfBirth)
//      VALUES (?, ?, ?, ?, ?)`,
//       [email, userPassword, fName, lName, dob]
//     );
//     console.log('User inserted successfully');
//     return true;
//   } catch (err) {
//     console.error(err.message);
//     return false;
//   }
// }
