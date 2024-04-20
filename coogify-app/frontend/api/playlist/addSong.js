import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { addTrackToPlaylist } from '../../backend_util/database/queries/dbPlaylistQueries.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { playlistID, trackID } = req.body;
      try {
        const addSong = await addTrackToPlaylist(playlistID, trackID);
        if (addSong !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ message: 'song added to playlist successful' })
          );
        } else {
          errorMessage(res, 'Error adding song to playlist', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error adding song to playlist');
      }
    });
  });
}
