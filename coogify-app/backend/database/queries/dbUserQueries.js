// Contains database queries related to user management, such as fetching user profiles,
// updating user information, and handling user-related operations.

import pool from '../dbConnection.js';

export async function registerUser(params) {
  const { email, userPassword, firstName, lastName, dateOfBirth } = params;
  console.log(params);
  try {
    const [rows] = await pool.query(
      `INSERT INTO USER 
    (email, userPassword, firstName, lastName, dateOfBirth)
     VALUES (?, ?, ?, ?, ?)`,
      [email, userPassword, firstName, lastName, dateOfBirth]
    );
    console.log('User inserted successfully');
  } catch (err) {
    console.error(err.message);
  }
}

export async function getUserFromEmail(email_promise) {
  const email = await email_promise;
  console.log(email);
  try {
    const [rows] = await pool.query(
      `SELECT userID
      FROM USER
      WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      console.log('Fetched user');
      return rows[0].userID;
    } else {
      // No matching email found in the database
      console.log('no email found matching in database');
      return null;
    }
  } catch (err) {
    console.error('Error fetching user:', err.message);
    return null;
  }
}
