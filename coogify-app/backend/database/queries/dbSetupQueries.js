import pool from '../dbConnection.js';

export async function setupUserAccount(userID, dateOfBirth) {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);
        const query = `
            UPDATE USER
            SET dateOfBirth = ?, dateCreated = ?
            WHERE userID = ?
        `;
        const [rows] = await pool.query(query, [dateOfBirth, currentDate, userID]);
        console.log('User account set up successfully');
        return rows;
    } catch (error) {
        console.error('Error setting up user account', error);
        return false;
    }
}

  
  export async function setupArtistAccount(userID, dateOfBirth) {
    try {
      const currentDate = new Date().toISOString().slice(0, 10); 
      const query = `
        UPDATE USER
        SET dateOfBirth = ?, dateCreated = ?, isArtist = ?
        WHERE userID = ?
      `;
      const [rows] = await pool.query(query, [dateOfBirth, currentDate, 1, userID]);
      console.log('Artist account set up successfully');
      return rows;
    } catch (error) {
      console.error('Error setting up artist account', error);
      return false;
    }
  }

  export async function setupAdminAccount(userID, dateOfBirth) {
    try {
      const currentDate = new Date().toISOString().slice(0, 10); 
      const query = `
        UPDATE USER
        SET dateOfBirth = ?, dateCreated = ?, isAdmin = ?
        WHERE userID = ?
      `;
      const [rows] = await pool.query(query, [dateOfBirth, currentDate, 1, userID]);
      console.log('Admin account set up successfully');
      return rows;
    } catch (error) {
      console.error('Error setting up admin account', error);
      return false;
    }
  }