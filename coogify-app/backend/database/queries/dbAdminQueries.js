// Contains database queries related to administrator functions, such as managing system settings,
// performing administrative tasks, and accessing administrative data.

import pool from '../dbConnection.js';

export async function selectAllSongs() {
  const [rows] = await pool.query(`SELECT * FROM TRACK`);
  console.log(rows);
  return rows;
}

export async function selectAllUsers() {
  const [rows] = await pool.query(`SELECT * FROM USER`);
  return rows;
}

export async function selectAllArtists() {
  const [rows] = await pool.query(`SELECT * FROM ARTIST`);
  return rows;
}
