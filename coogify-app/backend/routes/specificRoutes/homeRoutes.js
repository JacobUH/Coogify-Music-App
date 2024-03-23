import { selectNewestSongs } from '../../database/queries/dbHomeQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';

export async function fetchNewestSongs(req, res) {
  try {
    const songs = await selectNewestSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      console.log('made it in fetchNewestSongs');
      errorMessage(res, 'Error fetching newest songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching newest songs');
  }
}
