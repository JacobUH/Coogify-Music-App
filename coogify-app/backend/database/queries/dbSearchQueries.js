import pool from '../dbConnection.js';

export async function selectSongs() {
    try {
      const query = `
      SELECT t.trackID, t.songName, t.songURL, t.albumName, t.coverArtURL, t.isPopular, a.artistName
      FROM TRACK t
      INNER JOIN ARTIST a ON t.artistID = a.artistID
      WHERE t.activeSong = 1
      ORDER BY RAND();
          `;
      const [rows] = await pool.query(query);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error('Error fetching songs', error);
      return false;
    }
  }

  export async function selectAlbums() {
    try {
      const query = `
        SELECT t.trackID, t.songName, t.songURL, t.albumName, t.coverArtURL, t.isPopular, a.artistName
        FROM (
            SELECT DISTINCT albumName
            FROM TRACK
        ) AS unique_albums
        INNER JOIN TRACK t ON t.albumName = unique_albums.albumName
        INNER JOIN ARTIST a ON t.artistID = a.artistID
        WHERE t.activeSong = 1
        ORDER BY RAND();

          `;
      const [rows] = await pool.query(query);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error('Error fetching albums', error);
      return false;
    }
  }

  export async function selectAdminSongs() {
    try {
      const query = `
      SELECT t.trackID, t.songName, t.songURL, t.albumName, t.coverArtURL, t.isPopular, a.artistName
      FROM TRACK t
      INNER JOIN ARTIST a ON t.artistID = a.artistID
      ORDER BY RAND();
          `;
      const [rows] = await pool.query(query);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error('Error fetching songs', error);
      return false;
    }
  }

  export async function selectAdminAlbums() {
    try {
      const query = `
        SELECT t.trackID, t.songName, t.songURL, t.albumName, t.coverArtURL, t.isPopular, a.artistName
        FROM (
            SELECT DISTINCT albumName
            FROM TRACK
        ) AS unique_albums
        INNER JOIN TRACK t ON t.albumName = unique_albums.albumName
        INNER JOIN ARTIST a ON t.artistID = a.artistID
        ORDER BY RAND();

          `;
      const [rows] = await pool.query(query);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error('Error fetching albums', error);
      return false;
    }
  }

