// Contains database queries related to administrator functions, such as managing system settings,
// performing administrative tasks, and accessing administrative data.

import pool from '../dbConnection.js';

export async function selectAllSongs() {
  const [rows] = await pool.query(`
  SELECT t.trackID, t.artistID, a.artistName, t.genreID, g.genreName, t.albumName, t.songName, t.duration, t.releaseDate, t.likes, t.plays
  FROM TRACK t
  INNER JOIN ARTIST a on t.artistID = a.artistID
  INNER JOIN GENRE g on t.genreID = g.genreID
  `);
  console.log(rows);
  return rows;
}

export async function selectAllUsers() {
  const [rows] = await pool.query(
    `SELECT userID, email, userPassword, firstName, lastName, dateOfBirth, isArtist, isAdmin, dateCreated
     FROM USER`);
  return rows;
}

export async function selectAllArtists() {
  const [rows] = await pool.query(`
  SELECT a.artistID, a.userID, u.email, a.artistName, u.firstName, u.lastName
  FROM ARTIST a
  INNER JOIN USER u on a.userID = u.userID
  `);
  return rows;
}

export async function createAdminUserReport(role, subscription, startDate, endDate, minTransaction, maxTransaction ) {
  try {
    let whereConditions = '';
    let queryParams = [];

    // User Role
if (role) {
  let isArtist = 0;
  let isAdmin = 0;
  if (role === "Artist") {
    isArtist = 1;
  } else if (role === "Admin") {
    isAdmin = 1;
  }
  whereConditions += 'AND USER.isArtist = ? AND USER.isAdmin = ? ';
  queryParams.push(isArtist, isAdmin);
}


    // Subscription Type
    if (subscription) {
      whereConditions += 'AND SUBSCRIPTION.subscriptionType = ? ';
      queryParams.push(subscription);
    }

    // Date Created
    if (startDate && !endDate){
      whereConditions += 'AND USER.dateCreated >= ?'
      queryParams.push(startDate);
    }
    if (!startDate && endDate){
      whereConditions += 'AND USER.dateCreated <= ?'
      queryParams.push(endDate);
    }
    if (startDate && endDate){
      whereConditions += 'AND USER.dateCreated BETWEEN ? AND ?'
      queryParams.push(startDate, endDate);
    }

    // Transaction Total
    if (minTransaction && !maxTransaction){
      whereConditions += 'AND totalTransactionsAmount >= ?'
      queryParams.push(parseInt(minTransaction));
    }
    if (!minTransaction && maxTransaction){
      whereConditions += 'AND totalTransactionsAmount >= ?'
      queryParams.push(parseInt(maxTransaction));
    }
    if (minTransaction && maxTransaction){
      whereConditions += 'AND totalTransactionsAmount BETWEEN ? AND ?'
  queryParams.push(parseInt(minTransaction), parseInt(maxTransaction));
    }

    const [rows] = await pool.query(`
    SELECT
    CASE
        WHEN USER.isArtist = 1 AND USER.isAdmin = 0 THEN 'Artist'
        WHEN USER.isArtist = 0 AND USER.isAdmin = 1 THEN 'Admin'
        ELSE 'Listener'
    END AS role,
    CONCAT(USER.firstName, ' ', USER.lastName) AS fullName,
    USER.email, SUBSCRIPTION.subscriptionType, USER.dateCreated,
    (
      SELECT SUM(transactionAmount)
      FROM TRANSACTION
      JOIN SUBSCRIPTION ON TRANSACTION.subscriptionID = SUBSCRIPTION.subscriptionID
      WHERE SUBSCRIPTION.userID = USER.userID
    ) AS totalTransactionsAmount,      
    (
      SELECT COUNT(playlistID)
      FROM PLAYLIST
      WHERE PLAYLIST.userID = USER.userID
    ) AS totalPlaylistIDs,
    (
      SELECT COUNT(session_id)
      FROM SESSION
      WHERE SESSION.user_id = USER.userID
    ) AS totalSessionIDs
    FROM USER
    JOIN SUBSCRIPTION ON USER.userID = SUBSCRIPTION.userID
    ${whereConditions}
  `, queryParams);

    console.log(rows);
    return rows;
  } catch (err) {
    console.error('Error executing admin user metric report:', err);
    throw new Error('Error creating admin user metric report (query)');
  }
}


export async function createAdminFinanceReport(minTotalRev, maxTotalRev, startDate, endDate) {
  try {
    const [rows] = await pool.query(`
      SELECT
        DATE_FORMAT(revenue_query.tDate, '%Y-%m-%d') AS date,
        revenue_query.TotalRevenue AS totalRevenue,
        COUNT(DISTINCT s.session_id) AS totalSessions,
        COUNT(DISTINCT u.userID) AS totalAccounts,
        COUNT(DISTINCT tl.trackLikedID) AS totalLikes
      FROM (
        SELECT DATE(t.tDate) AS tDate, SUM(t.transactionAmount) AS TotalRevenue
        FROM TRANSACTION t
        GROUP BY DATE(t.tDate)
      ) AS revenue_query
      LEFT JOIN SESSION s ON DATE(revenue_query.tDate) = DATE(s.created_at)
      LEFT JOIN USER u ON DATE(revenue_query.tDate) = DATE(u.dateCreated)
      LEFT JOIN TRACK_LIKED tl ON DATE(revenue_query.tDate) = DATE(tl.dateLiked)
      GROUP BY revenue_query.tDate, revenue_query.TotalRevenue;
    `);

    console.log(rows);
    return rows;
  } catch (err) {
    console.error('Error executing admin daily performance report:', err);
    throw new Error('Error creating admin daily performance report (query)');
  }
}
