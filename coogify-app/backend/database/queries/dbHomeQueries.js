import pool from '../dbConnection.js';

export async function selectNewestSongs() {
  try {
    const query = `
    SELECT t.songName, t.songURL, t.albumName, t.coverArtURL, a.artistName
    FROM TRACK t
    INNER JOIN ARTIST a ON t.artistID = a.artistID
    ORDER BY t.trackID DESC
    LIMIT 10
        `;
    const [rows] = await pool.query(query);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching newest songs:', error);
    return false;
  }
}

export async function selectTopSongs() {
  try {
    const query = `
      SELECT t.songName, t.songURL, t.albumName, t.coverArtURL, a.artistName,
             COUNT(tl.trackLikedID) AS likeCount
      FROM TRACK t
      INNER JOIN ARTIST a ON t.artistID = a.artistID
      LEFT JOIN TRACK_LIKED tl ON t.trackID = tl.trackID
      GROUP BY t.trackID
      ORDER BY likeCount DESC
      LIMIT 10
    `;
    const [rows] = await pool.query(query);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching top songs:', error);
    return false;
  }
}

export async function selectRapSongs() {
  try {
    const query = `
    SELECT t.songName, t.songURL, t.albumName, t.coverArtURL, a.artistName
    FROM TRACK t
    INNER JOIN ARTIST a ON t.artistID = a.artistID
    INNER JOIN GENRE g ON t.genreID = g.genreID
    WHERE g.genreName = 'Hip Hop'
    ORDER BY RAND()
    LIMIT 10;    
    `;
    const [rows] = await pool.query(query);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching rap songs:', error);
    return false;
  }
}

export async function selectRBSongs() {
  try {
    const query = `
    SELECT t.songName, t.songURL, t.albumName, t.coverArtURL, a.artistName
    FROM TRACK t
    INNER JOIN ARTIST a ON t.artistID = a.artistID
    INNER JOIN GENRE g ON t.genreID = g.genreID
    WHERE g.genreName = 'R&B'
    ORDER BY RAND()
    LIMIT 10;    
    `;
    const [rows] = await pool.query(query);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching r&b songs:', error);
    return false;
  }
}