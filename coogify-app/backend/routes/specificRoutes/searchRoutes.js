import {
  selectSongs,
  selectAlbums,
  selectAdminSongs,
  selectAdminAlbums,
} from '../../database/queries/dbSearchQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';


export async function fetchSongs(req, res) {
  try {
    const songs = await selectSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching songs');
  }
}

export async function fetchAlbums(req, res) {
  try {
    const albums = await selectAlbums();
    if (albums !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(albums));
    } else {
      errorMessage(res, 'Error fetching albums', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching albums');
  }
}

export async function fetchAdminSongs(req, res) {
  try {
    const songs = await selectAdminSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching admin songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching admin songs');
  }
}

export async function fetchAdminAlbums(req, res) {
  try {
    const albums = await selectAdminAlbums();
    if (albums !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(albums));
    } else {
      errorMessage(res, 'Error fetching admin albums', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching admin albums');
  }
}
