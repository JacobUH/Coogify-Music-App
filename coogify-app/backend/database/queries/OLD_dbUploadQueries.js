import pool from '../dbConnection.js';

export async function addSong(artistName, genreName, songName, songItem) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO TRACK (artistID, genreID, songName, songFile)
      VALUES ((SELECT artistID FROM ARTIST WHERE artistName = ?), 
      (SELECT genreID FROM GENRE WHERE genreName = ?), ?, ?)`,
      [artistName, genreName, songName, songItem]
    );
    console.log('Song inserted successfully');
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}
