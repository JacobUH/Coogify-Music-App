import pool from '../dbConnection.js';

export async function selectUserProfile(userID) {
  console.log(userID);
    try {
      const [rows] = await pool.query(
        `SELECT email, userPassword, firstName, lastName, dateOfBirth, profileImage, bio 
         FROM USER 
         WHERE userID = ?`,
        [userID]
      );
  
      console.log('profile retrieved successfully');
      return rows;
  
      }   catch (error) {
          console.error('Error retrieving profile', error);
          return false;
      }
  }
  
  // Function to update user profile data based on userID and provided data
  export async function updateUserProfile(userID, payload) {
    const updates = [];
    const values = [];
  
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });
  
    if (updates.length === 0) {
      throw new Error("No updates provided");
    }
  
    const query = `UPDATE USER SET ${updates.join(', ')} WHERE userID = ?`;
    values.push(userID);
  
    try {
      const [result] = await pool.query(query, values);
      console.log('Profile updated successfully', result);
      return true;
    } catch (error) {
      console.error('Error updating profile', error);
      throw error; // It's good practice to re-throw the error for the caller to handle.
    }
  }
  

