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
