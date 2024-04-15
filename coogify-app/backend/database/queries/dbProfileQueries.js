import pool from '../dbConnection.js';

export async function selectUserProfile(userID) {
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
  export async function updateUserProfile(userID,  email, userPassword, firstName, lastName, dateOfBirth, profileImage, bio) {
    try {
      const result = await pool.query(
        `UPDATE USER 
         SET email = ?, userPassword = ?, firstName = ?, lastName = ?, dateOfBirth = ?, profileImage = ?, bio = ? 
         WHERE userID = ?`,
        [email, userPassword, firstName, lastName, dateOfBirth, profileImage, bio, userID]
      );
  
      console.log('profile retrieved successfully');
      return true;
  
      }   catch (error) {
          console.error('Error retrieving profile', error);
          return false;
      }
  }