import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { selectUserProfile } from '../../backend_util/database/queries/dbProfileQueries.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      try {
        const userID = await extractUserID(req);
        const userProfile = await selectUserProfile(userID);
        if (userProfile !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(userProfile));
        } else {
          errorMessage(res, 'Error fetching user profile', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching user profile');
      }
    });
  });
}
