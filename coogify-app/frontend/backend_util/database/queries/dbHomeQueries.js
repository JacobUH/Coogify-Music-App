import pool from '../dbConnection.js';

export async function selectNewestSongs(count) {
  try {
    const query = `
    SELECT t.trackID, t.songName, t.songURL, t.albumName, t.coverArtURL, t.isPopular, a.artistName
    FROM TRACK t
    INNER JOIN ARTIST a ON t.artistID = a.artistID
    ORDER BY t.trackID DESC
    LIMIT ?
        `;
    const [rows] = await pool.query(query, [count]);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching newest songs:', error);
    return false;
  }
}

export async function selectTopSongs(count) {
  try {
    const query = `
      SELECT t.trackID, t.songName, t.songURL, t.albumName, t.coverArtURL, t.isPopular, a.artistName,
             COUNT(tl.trackLikedID) AS likeCount
      FROM TRACK t
      INNER JOIN ARTIST a ON t.artistID = a.artistID
      LEFT JOIN TRACK_LIKED tl ON t.trackID = tl.trackID
      GROUP BY t.trackID
      ORDER BY likeCount DESC
      LIMIT ?
    `;
    const [rows] = await pool.query(query, [count]);
    //console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching top songs:', error);
    return false;
  }
}

export async function selectUserLikedSongs(userID) {
  try{
    const query = `
    SELECT tl.trackID, t.artistID, t.genreID, t.albumName, t.songName, t.songURL, t.coverArtURL, t.duration, t.releaseDate, a.artistName
    FROM TRACK_LIKED tl
    INNER JOIN TRACK t ON tl.trackID = t.trackID
    INNER JOIN ARTIST a ON t.artistID = a.artistID
    WHERE tl.userID = ?;
    `;
    const [rows] = await pool.query(query, [userID]);
    //console.log(rows);
    return rows;
  } catch (error){
    console.error('Error fetching your liked songs:', error);
    return false;
  }
}

export async function selectSongsByGenre(genre, count) {
  try {
    const query = `
    SELECT t.trackID, t.songName, t.songURL, t.albumName, t.coverArtURL, t.isPopular, a.artistName
    FROM TRACK t
    INNER JOIN ARTIST a ON t.artistID = a.artistID
    INNER JOIN GENRE g ON t.genreID = g.genreID
    WHERE g.genreName = ?
    ORDER BY RAND()
    LIMIT ?;    
    `;
    const [rows] = await pool.query(query, [genre, count]);
    //console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching Rock songs:', error);
    return false;
  }
}