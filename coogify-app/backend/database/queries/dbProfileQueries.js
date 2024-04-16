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
// Function to update user profile data based on userID and provided data
export async function updateUserProfile(userID, payload) {
  const fieldsToUpdate = Object.entries(payload)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key} = ?`);

  if (fieldsToUpdate.length === 0) {
    throw new Error("No updates provided");
  }

  const valuesToUpdate = Object.values(payload).filter(value => value !== undefined);
  
  const query = `UPDATE USER SET ${fieldsToUpdate.join(', ')} WHERE userID = ?`;
  
  try {
    await pool.query(query, [...valuesToUpdate, userID]);
    console.log('Profile updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating profile', error);
    return false;
  }
}

  
  