import pool from '../dbConnection.js';

// Function to insert liked song into the database
export async function insertLikedSong(trackID, userID) {
    console.log('Inserting liked song into DB');
    try {
        const [rows] = await pool.query(
            `INSERT INTO TRACK_LIKED 
            (track_id, user_id, liked_at)
            VALUES (?, ?, NOW())`,
            [trackID, userID]
        );
        
        // Return true to indicate successful insertion
        return true;
    } catch (err) {
        console.error('Database error:', err.message);
        // Throw error for further handling
        throw err;
    }
}
