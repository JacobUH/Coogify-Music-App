import pool from '../dbConnection.js';

// Function to insert liked song into the database
export async function insertLikedSong(trackID, userID) {
  console.log('Inserting liked song into DB');
  try {
    await pool.query(
      `INSERT INTO TRACK_LIKED 
            (userID, trackID, dateLiked)
            VALUES (?, ?, NOW())`,
      [userID, trackID]
    );

    // Update the likes count for the track in the TRACK table
    await pool.query(
      `UPDATE TRACK
      SET likes = (
          SELECT COUNT(*)
          FROM TRACK_LIKED
          WHERE trackID = ?
      )
      WHERE trackID = ?`,
      [trackID, trackID]
    );

    // Return true to indicate successful insertion
    return true;
  } catch (err) {
    console.error('Database error:', err.message);
    // Throw error for further handling
    throw err;
  }
}

export async function removeLikedSong(trackID, userID) {
  console.log('Removing liked song into DB');
  try {
    await pool.query(
      `DELETE FROM TRACK_LIKED
      WHERE trackID = ? AND userID = ?`,
      [trackID, userID]
    );
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
