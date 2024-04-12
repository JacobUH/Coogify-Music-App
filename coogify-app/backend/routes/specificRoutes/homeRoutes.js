import { selectNewestSongs, selectTopSongs, selectRapSongs, selectRBSongs, selectPopSongs, selectUserLikedSongs } from '../../database/queries/dbHomeQueries.js';
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

export async function fetchNewestSongs(req, res) {
  try {
    const songs = await selectNewestSongs();
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
  try {
    const songs = await selectTopSongs();
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

export async function fetchRapSongs(req, res) {
  try {
    const songs = await selectRapSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching rap songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching rap songs');
  }
}

export async function fetchRBSongs(req, res) {
  try {
    const songs = await selectRBSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching r&b songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching r&b songs');
  }
}

export async function fetchPopSongs(req, res) {
  try {
    const songs = await selectPopSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching pop songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching pop songs');
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