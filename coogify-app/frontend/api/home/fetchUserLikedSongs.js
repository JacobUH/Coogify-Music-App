import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { selectUserLikedSongs } from '../../backend_util/database/queries/dbHomeQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      try {
        const userID = await extractUserID(req);
        const songs = await selectUserLikedSongs(userID);
        if (songs !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(songs));
        } else {
          errorMessage(res, 'Error fetching your liked songs', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching your liked songs');
      }
    });
  });
}
