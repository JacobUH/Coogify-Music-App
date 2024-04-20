import {
  selectAllArtists,
  selectAllSongs,
  selectAllUsers,
} from '../../database/queries/dbAdminQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';

export async function retrieveAllArtists(req, res) {
  try {
    const artists = await selectAllArtists();
    sendResponse(res, 200, artists);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching artists');
  }
}

export async function retrieveAllSongs(req, res) {
  try {
    const songs = await selectAllSongs();
    sendResponse(res, 200, songs);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching songs');
  }
}

export async function retrieveAllUsers(req, res) {
  try {
    const users = await selectAllUsers();
    sendResponse(res, 200, users);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching users');
  }
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sendErrorResponse(res, error, message) {
  console.error(message, error);
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}
