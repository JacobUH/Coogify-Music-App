import pool from '../dbConnection.js';

export async function createPlaylist(userID, playlistName, playlistDescription, coverArtURL) {
    try {
        const [rows] = await pool.query(
        `INSERT INTO PLAYLIST 
        (userID, playlistName, playlistDescription, playlistArt)
        VALUES (?, ?, ?, ?)`,
        [userID, playlistName, playlistDescription, coverArtURL]
    );
    console.log('playlist created successfully');
    return true;

    }   catch (error) {
        console.error('Error creating playlist', error);
        return false;
    }
  }

  export async function selectPlaylists(userID) {
    try {
      const query = `
      SELECT p.playlistID, p.userID, p.playlistName, p.playlistArt
      FROM PLAYLIST p
      WHERE p.userID = ?
      `;
      const [rows] = await pool.query(query, [userID]);
      return rows;
    } catch (error) {
      console.error('Error getting playlists', error);
      return false;
    }
  }

  export async function selectPlaylistSongs(userID, playlistName) {
    try {
      const query = `
      SELECT p.playlistID, p.userID, p.playlistName, p.playlistDescription, p.playlistArt, t.trackID, t.songName, t.coverArtURL , t.songURL, t.duration, t.artistID, pt.dateAdded
        FROM PLAYLIST p
        LEFT JOIN PLAYLIST_TRACK pt ON p.playlistID = pt.playlistID
        LEFT JOIN TRACK t ON pt.trackID = t.trackID
        WHERE p.userID = ? AND p.playlistName = ?
      `;
      const [rows] = await pool.query(query, [userID, playlistName]);
      return rows;
    } catch (error) {
      console.error('Error getting playlist songs', error);
      return false;
    }
  }
  