import pool from '../dbConnection.js';

export async function newAlbumNameUpdate(userID, newAlbumName, albumName) {
    try {
      const [rows] = await pool.query(
        `
        UPDATE TRACK
        JOIN ARTIST ON TRACK.artistID = ARTIST.artistID
        SET TRACK.albumName = ?
        WHERE ARTIST.userID = ? AND TRACK.albumName = ?
        `,
        [newAlbumName, userID, albumName]
    );
    
      console.log('album name updated successfully');
      return rows.affectedRows; // Return the number of affected rows    
    } catch (error) {
      console.error('Error updating album name', error);
      return false;
    }
  }

  export async function deletingSong(trackID) {
    try {
      const [rows] = await pool.query(
        `
        UPDATE TRACK
        SET TRACK.activeSong = 0 
        WHERE TRACK.trackID = ?
        `,
        [trackID]
    );
    
      console.log('song marked to delete');
      return rows.affectedRows; // Return the number of affected rows    
    } catch (error) {
      console.error('Error deleting song', error);
      return false;
    }
  }

  export async function deletingAlbum(albumName) {
    try {
      const [rows] = await pool.query(
        `
        UPDATE TRACK
        SET TRACK.activeSong = 0 
        WHERE TRACK.albumName = ?
        `,
        [albumName]
    );
    
      console.log('album marked to delete');
      return rows.affectedRows; // Return the number of affected rows    
    } catch (error) {
      console.error('Error deleting album, error');
      return false;
    }
  }

  export async function songUpdating(songName, trackID) {
    console.log("this is the trackID: ", trackID, " and songName: ", songName);
    try {
      const [rows] = await pool.query (
        `
        UPDATE TRACK
        SET songName = ?
        WHERE trackID = ?
        `,
        [songName, trackID]
      );

      console.log('song name changed');
      return rows;
    } catch (error) {
      console.error('Error changing song name');
      return false;
    }
  }