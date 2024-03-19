// Contains database queries related to administrator functions, such as managing system settings,
// performing administrative tasks, and accessing administrative data.

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

