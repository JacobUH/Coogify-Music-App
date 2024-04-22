import { errorMessage } from '../backend_util/util/utilFunctions';
import jsonParserMiddleware from '../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../backend_util/middlewares/authenticate.js';
import { extractUserID } from '../backend_util/util/utilFunctions';
import { selectNotifications } from '../backend_util/database/queries/dbHomeQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = extractUserID(req);
      try {
        const notifications = await selectNotifications(userID);
        if (notifications !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(notifications));
        } else {
          errorMessage(res, 'Error fetching notifications', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching notifications');
      }
    });
  });
}
