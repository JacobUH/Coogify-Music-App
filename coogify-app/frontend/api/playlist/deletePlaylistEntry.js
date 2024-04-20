import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { deletePlaylist } from '../../backend_util/database/queries/dbPlaylistQueries.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { playlistID } = req.body;
      const userID = await extractUserID(req);

      try {
        const playlistDeletion = await deletePlaylist(userID, playlistID);
        if (playlistDeletion !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'playlist deletion successful' }));
        } else {
          errorMessage(res, 'Error deleting playlists', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error deleting playlist songs');
      }
    });
  });
}
