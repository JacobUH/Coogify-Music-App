// Contains database queries related to artist management, such as fetching artist profiles,
// adding new artists, and updating artist information.

import pool from '../dbConnection.js';

export async function insertArtist(sessionID, artistName) {
  try {
    // Retrieve user ID associated with the session ID
    const [rows] = await pool.query(
      'SELECT user_id FROM SESSION WHERE session_id = ?',
      [sessionID]
    );

    // Check if session ID exists
    if (rows.length === 0) {
      console.error('Session ID not found');
      return false;
    }

    // Extract user ID
    const userID = rows[0].user_id;

    // Insert artist into the ARTIST table
    const [insertResult] = await pool.query(
      'INSERT INTO ARTIST (userID, artistName) VALUES (?, ?)',
      [userID, artistName] // Change 'New Artist' to the desired artist name
    );

    // Check if artist insertion was successful
    if (insertResult.affectedRows !== 1) {
      console.error('Failed to insert artist');
      return false;
    }

    console.log('Artist inserted successfully');
    return true;
  } catch (error) {
    console.error('Error inserting artist:', error);
    return false;
  }
}

export async function selectArtistIDfromUserID(userID) {
  try {
    const [rows] = await pool.query(
      `SELECT artistID FROM ARTIST WHERE userID = ?`,
      [userID]
    );
    if (rows.length > 0) {
      return true; // Return true if artist is found
    } else {
      console.log(`No artist found for userID ${userID}`);
      return false; // Return false if no artist is found for the userID
    }
  } catch (error) {
    console.error('Error selecting artistID:', error);
    return false;
  }
}
