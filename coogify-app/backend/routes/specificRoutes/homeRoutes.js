import {
  selectNewestSongs,
  selectTopSongs,
  selectUserLikedSongs,
  selectSongsByGenre,
  selectNotifications,
  insertReadNotifications,
} from '../../database/queries/dbHomeQueries.js';
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

export async function fetchNewestSongs(req, res) {
  const { count } = req.body;
  try {
    var songs;
    if (count === undefined) {
      console.log('undefined count');
      songs = await selectNewestSongs(10);
    } else {
      songs = await selectNewestSongs(count);
    }
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching newest songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching newest songs');
  }
}

export async function fetchTopSongs(req, res) {
  const { count } = req.body;
  try {
    var songs;
    if (count === undefined) {
      console.log('undefined count');
      songs = await selectTopSongs(10);
    } else {
      songs = await selectTopSongs(count);
    }
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching top songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching top songs');
  }
}

export async function fetchUserLikedSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectUserLikedSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching your liked songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching your liked songs');
  }
}

export async function fetchHomeSongs(req, res) {
  const { genre, count } = req.body;
  console.log('recieved genre');
  if (genre !== undefined) {
    try {
      var songs;
      if (count === undefined) {
        console.log('undefined count');
        songs = await selectSongsByGenre(genre, 10);
      } else {
        songs = await selectSongsByGenre(genre, count);
      }
      if (songs !== false) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(songs));
      } else {
        errorMessage(res, 'Error fetching rap songs', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error fetching rap songs');
    }
  } else {
    errorMessage(res, 'Genre is not defined: ', genre);
  }
}

export async function getNotifications(req, res) {
  try {
    const userID = await extractUserID(req);
    const notifications = await selectNotifications(userID);

    if (notifications !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(notifications));
    } else {
      errorMessage(res, 'Error fetching notifications', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching notifications');
  }
}

// TODO
export async function readNotifications(req, res) {
  console.log(
    'in route ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
  );
  try {
    const userID = await extractUserID(req);
    const notifications = await insertReadNotifications(userID);

    if (notifications !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(notifications));
    } else {
      errorMessage(res, 'Error fetching notifications', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching notifications');
  }
}
