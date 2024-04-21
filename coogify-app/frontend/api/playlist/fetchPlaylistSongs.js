import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import {
  extractUserID,
  errorMessage,
} from '../../backend_util/util/utilFunctions.js';
import { selectPlaylistSongs } from '../../backend_util/database/queries/dbPlaylistQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { sessionToken, playlistName } = req.body;
      const userID = await extractUserID(req);

      try {
        const playlistSongs = await selectPlaylistSongs(userID, playlistName);
        if (playlistSongs !== false) {
          console.log(playlistSongs);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(playlistSongs));
        } else {
          errorMessage(res, 'Error fetching playlist songs', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching playlist songs');
      }
    });
  });
}
