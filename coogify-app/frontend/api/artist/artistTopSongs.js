import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { getArtistTopSongs } from '../../backend_util/database/queries/dbArtistQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = await extractUserID(req);
      if (userID !== null) {
        try {
          const artistSongs = await getArtistTopSongs(userID);
          if (artistSongs) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(artistSongs));
          } else {
            errorMessage(res, 'Could not get artist top songs', 'Error');
          }
        } catch (error) {
          errorMessage(res, error, 'Error getting artist top songs');
        }
      } else {
        errorMessage(res, 'Unable to get artist top songs', 'Error');
      }
    });
  });
}
