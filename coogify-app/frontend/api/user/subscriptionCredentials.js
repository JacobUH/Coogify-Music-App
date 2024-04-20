import { selectSubCredentials } from '../../backend_util/database/queries/dbUserQueries.js';
import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import {
  errorMessage,
  extractUserID,
} from '../../backend_util/utilFunctions.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = await extractUserID(req);
      try {
        const credentials = await selectSubCredentials(userID);
        if (credentials !== false) {
          // console.log(credentials);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(credentials));
        } else {
          errorMessage(res, 'Error fetching subscription credentials', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching subscription credentials');
      }
    });
  });
}
