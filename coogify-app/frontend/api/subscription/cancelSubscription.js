import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { cancelUserSub } from '../../backend_util/database/queries/dbSubscriptionQueries.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = await extractUserID(req);
      try {
        const cancelSubscription = await cancelUserSub(userID);
        if (cancelSubscription !== false) {
          console.log(cancelSubscription);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ message: 'subscription cancelled successfully' })
          );
        } else {
          errorMessage(res, 'Error cancelling subscription', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error cancelling subscription');
      }
    });
  });
}
