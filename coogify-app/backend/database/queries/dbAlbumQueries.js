import pool from '../dbConnection.js';

export async function selectAlbumSongs(albumName) {
    try {
        const query = `
        SELECT t.trackID, t.genreID, g.genreName, t.artistID, a.artistName, t.albumName, t.songName, t.coverArtURL, t.duration, t.releaseDate, t.songURL, t.likes, t.plays
        FROM TRACK t
        INNER JOIN ARTIST a on t.artistID = a.artistID
        INNER JOIN GENRE g on t.genreID = g.genreID
        WHERE albumName = ? AND t.activeSong = 1
        `;
        const [rows] = await pool.query(query, [albumName]);
       // console.log(rows);
        return rows;
    }   catch (error) {
        console.error('Error getting album songs', error);
        return false;
    }
  }