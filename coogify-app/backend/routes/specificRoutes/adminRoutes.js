import {
  selectAllArtists,
  selectAllSongs,
  selectAllUsers,
} from '../../database/queries/dbAdminQueries.js';

export async function retrieveAllArtists(req, res) {
  try {
    const artists = await selectAllArtists();
    res.status(200).json(artists);
  } catch (error) {
    errorMessage(res, error, 'Error fetching artists');
  }
}

export async function retrieveAllSongs(req, res) {
  try {
    const songs = await selectAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    errorMessage(res, error, 'Error fetching songs');
  }
}

export async function retrieveAllUsers(req, res) {
  try {
    const users = await selectAllUsers();
    res.status(200).json(users);
  } catch (error) {
    errorMessage(res, error, 'Error fetching users');
  }
}
