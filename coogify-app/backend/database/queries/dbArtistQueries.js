// Contains database queries related to artist management, such as fetching artist profiles,
// adding new artists, and updating artist information.

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
