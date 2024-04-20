import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { restoreUserSub } from '../../backend_util/database/queries/dbSubscriptionQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = await extractUserID(req);
      try {
        const restoreSubscription = await restoreUserSub(userID);
        if (restoreSubscription !== false) {
          console.log(restoreSubscription);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ message: 'subscription restored successfully' })
          );
        } else {
          errorMessage(res, 'Error restoring subscription', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error restoring subscription');
      }
    });
  });
}
