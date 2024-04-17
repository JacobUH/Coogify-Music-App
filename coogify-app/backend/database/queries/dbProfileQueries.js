import pool from '../dbConnection.js';

export async function selectUserProfile(userID) {
  try {
    const [rows] = await pool.query(
      `SELECT u.email, u.userPassword, u.firstName, u.lastName, u.dateOfBirth, u.profileImage, u.bio, u.isArtist, a.artistName
       FROM USER u
       LEFT JOIN ARTIST a ON u.userID = a.userID
       WHERE u.userID = ?`,
      [userID]
    );
  
    console.log('profile retrieved successfully');
    return rows[0]; // Assuming that there will always be one or no user profile per userID.
  } catch (error) {
    console.error('Error retrieving profile', error);
    return false;
  }
}

  
  // Function to update user profile data based on userID and provided data
  export async function updateUserProfile(userID, payload) {
    const userUpdates = [];
    const userValues = [];
    const artistUpdates = [];
    const artistValues = [];
  
    // Separate updates for user and artist
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined) {
        if (key === 'artistName') {
          artistUpdates.push(`${key} = ?`);
          artistValues.push(value);
        } else {
          userUpdates.push(`${key} = ?`);
          userValues.push(value);
        }
      }
    }
  
    if (userUpdates.length === 0 && artistUpdates.length === 0) {
      throw new Error("No updates provided");
    }
  
    try {
      await pool.query('START TRANSACTION');
  
      // Update USER table
      if (userUpdates.length > 0) {
        const userQuery = `UPDATE USER SET ${userUpdates.join(', ')} WHERE userID = ?`;
        userValues.push(userID);
        await pool.query(userQuery, userValues);
      }
  
      // Update ARTIST table if there are artist updates
      if (artistUpdates.length > 0) {
        const artistQuery = `UPDATE ARTIST SET ${artistUpdates.join(', ')} WHERE userID = ?`;
        artistValues.push(userID);
        await pool.query(artistQuery, artistValues);
      }
  
      await pool.query('COMMIT');
      return true;
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  }
  
  
  

