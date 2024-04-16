// Contains database queries related to user management, such as fetching user profiles,
// updating user information, and handling user-related operations.

import pool from '../dbConnection.js';

export async function registerUser(params) {
  const { email, userPassword, firstName, lastName, dateOfBirth } = params;
  console.log(params);
  try {
    await pool.query(
      `INSERT INTO USER 
       (email, userPassword, firstName, lastName, dateOfBirth)
       VALUES (?, ?, ?, ?, ?)`,
      [email, userPassword, firstName, lastName, dateOfBirth]
    );
    console.log('User inserted successfully');

    // Get the userID of the newly inserted user
    const [userRows] = await pool.query(
      `SELECT userID FROM USER WHERE email = ?`,
      [email]
    );
    const userID = userRows[0].userID;

    // Insert a row into the SUBSCRIPTION table
    await pool.query(
      `INSERT INTO SUBSCRIPTION 
       (userID, subscriptionType, subscriptionActive, renewDate)
       VALUES (?, 'Paid', 0, CURRENT_DATE())`,
      [userID]
    );

    console.log('Subscription inserted successfully');
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

export async function insertPayment(userID_promise) {
  try {
    const userID = await userID_promise;

    // Update renewDate and set subscriptionActive to 1
    await pool.query(
      `UPDATE SUBSCRIPTION 
       SET renewDate = DATE_ADD(renewDate, INTERVAL 1 MONTH), subcriptionActive = 1 
       WHERE userID = ?`,
      [userID]
    );

    console.log('Payment inserted successfully');
  } catch (err) {
    console.error(err.message);
  }
}

export async function selectCredentials(userID){
  try {
    const query = `
    SELECT userID, email, firstName, lastName, isArtist, isAdmin, dateCreated
    FROM USER
    WHERE userID = ?
    `;
    const [rows] = await pool.query(query, [userID]);
    console.log('user credentials retrieved successfully');
    return rows;
  } catch (err){
    console.error(err.message);
  }
}
