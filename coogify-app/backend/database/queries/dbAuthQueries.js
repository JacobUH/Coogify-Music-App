// Contains database queries related to user authentication and authorization, such as verifying user credentials,
// generating access tokens, and managing user sessions.

import pool from '../dbConnection.js';

export async function testQuery(id) {
  const [rows] = await pool.query(
    `
  SELECT *
  FROM ADMIN
  WHERE adminID = ?`,
    [id]
  );
  return rows;
}

export async function getUserFromSession(session_promise) {
  const session = await session_promise;

  try {
    const [rows] = await pool.query(
      `
    SELECT user_id 
    FROM SESSION 
    WHERE session_id = ? AND to_delete = FALSE
    `,
      [session]
    );
    if (rows.length > 0) {
      return rows[0].user_id;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error getting user from session:', err.message);
    return null;
  }
}

export async function makeSession(user_id_promise, session_promise) {
  const user_id = await user_id_promise;
  const session = await session_promise;
  try {
    const [rows] = await pool.query(
      `
    INSERT INTO SESSION
    (session_id, user_id)
    VALUES (?, ?)
    `,
      [session, user_id]
    );
    if (rows.length > 0) {
      console.log('created session row in db');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error creating session in db:', err.message);
    return false;
  }
}

export async function deleteSession(userPromise) {
  try {
    // Await the resolved value of the userPromise
    const user = await userPromise;

    const [rows] = await pool.query(
      `
      UPDATE SESSION
      SET to_delete = TRUE
      WHERE user_id = ?
      `,
      [user]
    );
    if (rows.affectedRows > 0) {
      console.log('deleted session rows in db');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error deleting sessions in db:', err.message);
    return false;
  }
}
