// Contains database queries related to user management, such as fetching user profiles,
// updating user information, and handling user-related operations.

import pool from "../dbConnection.js";

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
    console.log("User inserted successfully");
  } catch (err) {
    console.error(err.message);
  }
}
