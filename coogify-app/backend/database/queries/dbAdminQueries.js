// Contains database queries related to administrator functions, such as managing system settings,
// performing administrative tasks, and accessing administrative data.

import pool from '../dbConnection.js';

export async function selectAllSongs() {
  const [rows] = await pool.query(`
  SELECT t.trackID, t.artistID, a.artistName, t.genreID, g.genreName, t.albumName, t.songName, t.duration, t.releaseDate, t.likes, t.plays
  FROM TRACK t
  INNER JOIN ARTIST a on t.artistID = a.artistID
  INNER JOIN GENRE g on t.genreID = g.genreID
  `);
  console.log(rows);
  return rows;
}

export async function selectAllUsers() {
  const [rows] = await pool.query(
    `SELECT userID, email, userPassword, firstName, lastName, dateOfBirth, isArtist, isAdmin, dateCreated
     FROM USER`);
  return rows;
}

export async function selectAllArtists() {
  const [rows] = await pool.query(`
  SELECT a.artistID, a.userID, u.email, a.artistName, u.firstName, u.lastName
  FROM ARTIST a
  INNER JOIN USER u on a.userID = u.userID
  `);
  return rows;
}
