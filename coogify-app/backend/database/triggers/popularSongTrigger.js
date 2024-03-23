import pool from '../dbConnection.js';

export async function createPopularSongTrigger() {
  const createTriggerQuery = `

    CREATE TRIGGER mark_popular_song
    AFTER UPDATE ON TRACK_LIKED
    FOR EACH ROW
    BEGIN
        -- Update the TRACK table to mark songs as popular based on the number of likes
        UPDATE TRACK t
        SET t.isPopular = CASE
            WHEN (SELECT COUNT(*) FROM TRACK_LIKED tl WHERE tl.trackID = t.trackID) >= 100 THEN 1
            ELSE 0
        END
        WHERE t.trackID = NEW.trackID;
    END;
 ;
  `;

  try {
    await pool.query(createTriggerQuery);
    console.log('Popular song trigger created successfully');
    return true;
  } catch (error) {
    console.error('Error creating popular song trigger:', error);
    return false;
  }
}
