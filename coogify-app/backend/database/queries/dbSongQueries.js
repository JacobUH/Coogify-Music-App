import pool from '../dbConnection.js';

// Function to insert liked song into the database
export async function insertLikedSong(trackID, userID) {
  console.log('Inserting liked song into DB');
  try {
    const [rows] = await pool.query(
      `INSERT INTO TRACK_LIKED 
            (userID, trackID, dateLiked)
            VALUES (?, ?, NOW())`,
      [userID, trackID]
    );

    // Return true to indicate successful insertion
    return true;
  } catch (err) {
    console.error('Database error:', err.message);
    // Throw error for further handling
    throw err;
  }
}

export async function updatePlaylist(
  playlistName,
  playlistDescription,
  playlistArt,
  user
) {
  console.log('Inserting liked song into DB');
  try {
    // Check if the user has a playlist
    const [existingPlaylists] = await pool.query(
      'SELECT * FROM PLAYLIST WHERE userID = ?',
      [user]
    );

    if (existingPlaylists.length === 0) {
      // Log error if user does not have a playlist
      console.error('User does not have a playlist to modify');
      return false; // Return false to indicate failure
    }

    // Update the playlist
    const [rows] = await pool.query(
      'UPDATE PLAYLIST SET playlistName = ?, playlistDescription = ?, playlistArt = ? WHERE userID = ?',
      [playlistName, playlistDescription, playlistArt, user]
    );

    // Return true to indicate successful modification
    return true;
  } catch (err) {
    console.error('Database error:', err.message);
    // Throw error for further handling
    throw err;
  }
}
