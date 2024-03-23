import pool from '../dbConnection.js';

export async function selectNewestSongs() {
  try {
    const query = `
            SELECT t.songName, t.songURL, t.albumName, t.coverArtURL, a.artistName
            FROM TRACK t
            INNER JOIN ARTIST a ON t.artistID = a.artistID
            ORDER BY t.releaseDate DESC
            LIMIT 10
        `;
    const [rows] = await pool.query(query);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching newest songs:', error);
    return false;
  }
}
