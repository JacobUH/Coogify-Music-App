// Contains database queries related to user authentication and authorization, such as verifying user credentials,
// generating access tokens, and managing user sessions.

import pool from "../dbConnection.js";

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
