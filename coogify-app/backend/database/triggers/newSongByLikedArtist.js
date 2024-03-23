import pool from '../dbConnection.js';

export async function createNewSongNotificationTrigger() {
  try {
    const query = `
        -- Create a trigger named new_song_notification
        CREATE TRIGGER new_song_notification
        AFTER INSERT ON TRACK
        FOR EACH ROW
        BEGIN
            -- Check if the artist is an artist and get artist's name
            INSERT INTO NOTIFICATIONS (message, trackID, userID)
            SELECT CONCAT((SELECT artistName FROM ARTIST WHERE artistID = NEW.artistID), ' just uploaded this song: ', NEW.songName), NEW.trackID, tl.userID
            FROM TRACK_LIKED tl
            INNER JOIN TRACK t ON tl.trackID = t.trackID
            WHERE t.artistID = NEW.artistID
            AND tl.userID != NEW.artistID
            GROUP BY tl.userID;
        END;
        `;
    await pool.query(query);
    console.log('Trigger created successfully');
    return true;
  } catch (error) {
    console.error('Error creating trigger:', error);
    return false;
  }
}
