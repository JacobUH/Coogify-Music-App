import pool from '../dbConnection.js';

export async function selectNewestSongs() {
  try {
    const query = `
            SELECT t.songName, t.coverArt, t.songURL, t.albumName, a.artistName
            FROM TRACK t
            INNER JOIN ARTIST a ON t.artistID = a.artistID
            ORDER BY t.releaseDate DESC
            LIMIT 10
        `;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching newest songs:', error);
    return false;
  }
}
