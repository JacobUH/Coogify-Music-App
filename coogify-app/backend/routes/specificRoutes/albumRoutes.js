import { selectAlbumSongs } from '../../database/queries/dbAlbumQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';

export async function fetchAlbumSongs(req, res) {
  const { albumName } = req.body;
  //console.log(req.body);
  try {
    const albumSongs = await selectAlbumSongs(albumName);
    if (albumSongs !== false) {
      console.log(albumSongs);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(albumSongs));
    } else {
      errorMessage(res, 'Error fetching newest songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching albums songs');
  }
}
