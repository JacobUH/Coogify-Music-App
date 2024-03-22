import pool from '../dbConnection.js';

export async function insertSong(artistID, genreName, songName, songItem) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO TRACK (artistID, genreID, songName, songURL)
      VALUES (?, (SELECT genreID FROM GENRE WHERE genreName = ?), ?, ?)`,
      [artistID, genreName, songName, songItem]
    );
    console.log('Song inserted successfully');
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

export async function selectSong(songName) {
  try {
    const [rows] = await pool.query(
      `SELECT A.artistName, T.albumName, T.songName, T.releaseDate, T.songURL
      FROM TRACK T
      INNER JOIN ARTIST A ON T.artistID = A.artistID
      WHERE T.songName = ?`,
      [songName]
    );
    if (rows.length > 0) {
      return {
        artistName: rows[0].artistName || null,
        albumName: rows[0].albumName || null,
        songName: rows[0].songName || null,
        releaseDate: rows[0].releaseDate || null,
        songURL: rows[0].songURL || null,
      };
    } else {
      console.error('No song found with the specified name');
      return null;
    }
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

export async function insertPlaylist(
  userID,
  playlistName,
  playlistArtURL,
  playlistDescription
) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO PLAYLIST 
      (userID, playlistName, playlistArt, playlistDescription)
       VALUES (?, ?, ?, ?)`,
      [userID, playlistName, playlistArtURL, playlistDescription]
    );
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}
