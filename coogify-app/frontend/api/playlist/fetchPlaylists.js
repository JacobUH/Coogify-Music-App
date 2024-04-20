import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import {
  extractUserID,
  errorMessage,
} from '../../../backend/util/utilFunctions.js';
import { selectPlaylists } from '../../backend_util/database/queries/dbPlaylistQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = await extractUserID(req);
      try {
        const playlists = await selectPlaylists(userID);
        if (playlists !== false) {
          console.log(playlists);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(playlists));
        } else {
          errorMessage(res, 'Error fetching playlists', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching playlists');
      }
    });
  });
}
