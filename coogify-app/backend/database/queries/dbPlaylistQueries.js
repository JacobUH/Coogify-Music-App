import pool from '../dbConnection.js';

export async function createPlaylist(userID, playlistName, playlistDescription, coverArtURL) {
    try {
        // Check if the playlist already exists
        const [existingPlaylistRows] = await pool.query(
          'SELECT * FROM PLAYLIST WHERE userID = ? AND playlistName = ?',
          [userID, playlistName]
      );

      if (existingPlaylistRows.length > 0) {
          // If the playlist already exists, return an error response
          return
      }
      
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
  
export async function deletePlaylist(userID, playlistID) {
  try {
    // Step 1: Delete playlist tracks from PLAYLIST_TRACK
    await pool.query(
      `DELETE FROM PLAYLIST_TRACK WHERE playlistID = ?`,
      [playlistID]
    );

    // Step 2: Delete playlist from PLAYLIST
    await pool.query(
      `DELETE FROM PLAYLIST WHERE playlistID = ? AND userID = ?`,
      [playlistID, userID]
    );

    // If no errors occurred, playlist and its tracks are deleted successfully
    console.log(`Playlist with ID: ${playlistID} deleted successfully.`);
  } catch (err) {
    console.error('Error deleting playlist:', err.message);
    throw err;
  }
}


  export async function selectPlaylists(userID) {
    try {
      const query = `
      SELECT p.playlistID, p.userID, u.firstName, u.lastName, p.playlistName, p.playlistArt
      FROM PLAYLIST p
      INNER JOIN USER u on p.userID = u.userID
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
      SELECT p.playlistID, p.userID, u.firstName,u.lastName, p.playlistName, p.playlistDescription, p.playlistArt, t.trackID, t.albumName, t.songName, t.coverArtURL , t.songURL, t.duration, a.artistName, pt.dateAdded
        FROM PLAYLIST p
        LEFT JOIN PLAYLIST_TRACK pt ON p.playlistID = pt.playlistID
        LEFT JOIN TRACK t ON pt.trackID = t.trackID
        LEFT JOIN ARTIST a ON t.artistID = a.artistID
        LEFT JOIN USER u ON p.userID = u.userID
        WHERE p.userID = ? AND p.playlistName = ?
      `;
      const [rows] = await pool.query(query, [userID, playlistName]);
      return rows;
    } catch (error) {
      console.error('Error getting playlist songs', error);
      return false;
    }
  }
  
  const currentDate = new Date(); // Get current date
  const year = currentDate.getFullYear(); // Get current year
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get current month (add 1 because month index starts from 0)
  const day = String(currentDate.getDate()).padStart(2, '0'); // Get current day
  const formattedDate = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD

  export async function addTrackToPlaylist(playlistID, trackID){
    try {
      const [rows] = await pool.query(
        `INSERT INTO PLAYLIST_TRACK 
        (playlistID, trackID, dateAdded)
        VALUES (?, ?, ?)`,
        [playlistID, trackID, formattedDate]
    );
    console.log('song added to playlist successfully');
    return true;
    } catch (error) {
      console.error('Error adding song to playlist')
      return false;
    }
  }

  export async function removeTrackFromPlaylist(playlistID, trackID) {
    try {
      const [rows] = await pool.query(
        `DELETE FROM PLAYLIST_TRACK 
         WHERE playlistID = ? AND trackID = ?`,
        [playlistID, trackID]
      );
      console.log('Track removed from playlist successfully');
      return true;
    } catch (error) {
      console.error('Error removing track from playlist:', error);
      return false;
    }
  }
  