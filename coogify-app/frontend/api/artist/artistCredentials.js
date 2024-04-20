import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { getArtistCreds } from '../../backend_util/database/queries/dbArtistQueries.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = await extractUserID(req);
      if (userID !== null) {
        try {
          const artistCreds = await getArtistCreds(userID);
          if (artistCreds) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(artistCreds));
          } else {
            errorMessage(res, 'Could not get artist creds', 'Error');
          }
        } catch (error) {
          errorMessage(res, error, 'Error getting artist creds');
        }
      } else {
        errorMessage(res, 'Unable to get artist creds', 'Error');
      }
    });
  });
}
