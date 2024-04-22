import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { removeTrackFromPlaylist } from '../../backend_util/database/queries/dbPlaylistQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { playlistID, trackID } = req.body;
      try {
        const addSong = await removeTrackFromPlaylist(playlistID, trackID);
        if (addSong !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ message: 'song removed from playlist successful' })
          );
        } else {
          errorMessage(res, 'Error removing song from playlist', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error removing song from playlist');
      }
    });
  });
}
