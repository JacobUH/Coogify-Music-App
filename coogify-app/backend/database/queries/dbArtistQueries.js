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

    // Start a transaction
    await pool.query('START TRANSACTION');

    // Insert artist into the ARTIST table
    const [insertResult] = await pool.query(
      'INSERT INTO ARTIST (userID, artistName) VALUES (?, ?)',
      [userID, artistName]
    );

    // Check if artist insertion was successful
    if (insertResult.affectedRows !== 1) {
      console.error('Failed to insert artist');
      await pool.query('ROLLBACK'); // Rollback transaction
      return false;
    }

    // Update isArtist in USER table
    await pool.query('UPDATE USER SET isArtist = 1 WHERE userID = ?', [userID]);

    // Commit transaction
    await pool.query('COMMIT');

    console.log('Artist inserted successfully');
    return true;
  } catch (error) {
    console.error('Error inserting artist:', error);
    await pool.query('ROLLBACK'); // Rollback transaction on error
    return false;
  }
}

export async function selectArtistIDfromUserID(userID) {
  try {
    const [rows] = await pool.query(
      `SELECT artistID FROM ARTIST WHERE userID = ?`,
      [userID]
    );
    console.log("artistID", rows);
    if (rows.length >= 0) {
      return rows[0].artistID; // Return the artistID if found
    } else {
      console.log(`No artist found for userID ${userID}`);
      return null; // Return null if no artist is found for the userID
    }
  } catch (error) {
    console.error('Error selecting artistID:', error);
    throw error; // Rethrow the error to be handled in the calling function
  }
}

export async function getArtistCreds(userID) {
  console.log(userID);
  try {
    // Retrieve user ID associated with the session ID
      const query= `
      SELECT a.artistID, a.artistName, SUM(t.likes) AS totalLikes, SUM(t.plays) AS totalPlays
      FROM ARTIST a
      LEFT JOIN TRACK t ON a.artistID = t.artistID
      WHERE a.userID = ?
      GROUP BY a.artistID, a.artistName
      `;
      const [rows] = await pool.query(query,[userID]);
      console.log('artist credentials retrieved successfully');

      return rows;
    } catch (err) {
      console.error(err.message);
    }
  }

export async function getArtistTopSongs(userID) {
  console.log(userID);

  try {
    const [rows] = await pool.query(`
    SELECT trackID, songName, songURL, albumName, coverArtURL, duration, likes, plays
    FROM TRACK 
    JOIN ARTIST ON TRACK.artistID = ARTIST.artistID
    WHERE ARTIST.userID = ?
    ORDER BY plays DESC 
    LIMIT 5
    
    `, 
    [userID]
  );
    return rows;
  } catch (err) {
    console.error('Error executing database query:', err);
    throw new Error('Error fetching artist top songs (query)');
  }
}

// Jacob was here :)
// tuples that belong to the userID where the ARTIST userID = TRACK userID
// tuples with albumName (in TRACK), songName (in TRACK), genreName (is in GENRE), status (in TRACK), 
//  tuples with minPlays < plays < maxPlays (in TRACK), minLike < likes < maxLikes (in TRACK), releaseStart < releaseDate < releaseEnd (in TRACK)
export async function createArtistReport(userID, albumName, songName, genreName, status, minPlays, maxPlays, minLikes, maxLikes, releaseStart, releaseEnd) {
  console.log(userID);

  try {
    let queryParams = [userID];
    let whereConditions = 'WHERE ARTIST.userID = ?';

    // Album
    if (albumName) {
      whereConditions += ' AND TRACK.albumName = ?';
      queryParams.push(albumName);
    }

    // Song
    if (songName) {
      whereConditions += ' AND TRACK.songName = ?';
      queryParams.push(songName);
    }

    // Genre
    if (genreName) {
      whereConditions += ' AND GENRE.genreName = ?';
      queryParams.push(genreName);
    }

    // Song Active
    if (status) {
      if (status === "1"){
        whereConditions += ' AND TRACK.activeSong = ?';
        queryParams.push(1);
      } else {
        whereConditions += ' AND TRACK.activeSong = ?';
        queryParams.push(0);
      }
    }

    // Plays
    if (minPlays && !maxPlays) {
      whereConditions += ' AND TRACK.plays >= ?';
      queryParams.push(minPlays);
    }

    if (!minPlays && maxPlays) {
      whereConditions += ' AND TRACK.plays <= ?';
      queryParams.push(maxPlays);
    }

    if (minPlays && maxPlays) {
      whereConditions += ' AND TRACK.plays BETWEEN ? AND ?';
      queryParams.push(minPlays, maxPlays);
    }
    
    // Likes
    if (minLikes && !maxLikes) {
      whereConditions += ' AND TRACK.likes >= ?';
      queryParams.push(minLikes);
    }

    if (!minLikes && maxLikes) {
      whereConditions += ' AND TRACK.likes <= ?';
      queryParams.push(maxLikes);
    }

    if (minLikes && maxLikes) {
      whereConditions += ' AND TRACK.likes BETWEEN ? AND ?';
      queryParams.push(minLikes, maxLikes);
    }

    // Date
    if (releaseStart && !releaseEnd) {
      whereConditions += ' AND TRACK.releaseDate >= ?';
      queryParams.push(releaseStart);
    }

    if (!releaseStart && releaseEnd) {
      whereConditions += ' AND TRACK.releaseDate <= ?';
      queryParams.push(releaseEnd);
    }

    if (releaseStart && releaseEnd) {
      whereConditions += ' AND TRACK.releaseDate BETWEEN ? AND ?';
      queryParams.push(releaseStart, releaseEnd);
    }

    // Ordering
    let orderByClause = ''; // Initialize the ORDER BY clause

    if (minLikes && maxLikes) {
      orderByClause = ' ORDER BY TRACK.plays DESC, TRACK.likes DESC';
    } else if (minLikes) {
      orderByClause = ' ORDER BY TRACK.plays DESC';
    } else if (maxLikes) {
      orderByClause = ' ORDER BY TRACK.likes DESC';
    }


    const [rows] = await pool.query(`
      SELECT TRACK.albumName, TRACK.songName, TRACK.plays, TRACK.likes, GENRE.genreName, TRACK.releaseDate,  
      (SELECT COUNT(playlistID) FROM PLAYLIST_TRACK WHERE trackID = TRACK.trackID) AS totalPlaylists
      FROM ARTIST
      JOIN TRACK ON ARTIST.artistID = TRACK.artistID
      JOIN GENRE ON TRACK.genreID = GENRE.genreID
      ${whereConditions}
      ${orderByClause}

    `, queryParams);

    console.log(rows);
    return rows;
  } catch (err) {
    console.error('Error executing artist report:', err);
    throw new Error('Error creating artist report (query)');
  }
}


export async function getArtistAlbums(userID) {
  console.log(userID);
  try {
    // Retrieve user ID associated with the session ID
      const query= `
      SELECT DISTINCT albumName, coverArtURL
      FROM TRACK 
      JOIN ARTIST ON TRACK.artistID = ARTIST.artistID
      WHERE ARTIST.userID = ?
      `;
      const [rows] = await pool.query(query,[userID]);
      console.log('artist albums retrieved successfully');

      return rows;
    } catch (err) {
      console.error(err.message);
    }
  }

  export async function getArtistSongs(albumName) {
    console.log(albumName);
    try {
      // Retrieve user ID associated with the session ID
        const query= `
        SELECT trackID, songName, albumName
        FROM TRACK 
        WHERE TRACK.albumName = ?
        `;
        const [rows] = await pool.query(query,[albumName]);
        console.log('artist songs from album retrieved successfully');
  
        return rows;
      } catch (err) {
        console.error(err.message);
      }
    }

    /*
     SELECT TRACK.albumName, TRACK.songName, TRACK.plays, TRACK.likes, GENRE.genreName,TRACK.releaseDate
    FROM ARTIST
    JOIN TRACK ON ARTIST.artistID = TRACK.artistID
    JOIN GENRE ON TRACK.genreID = GENRE.genreID
    WHERE ARTIST.userID = ? 
    */