import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { updateUserSub } from '../../backend_util/database/queries/dbSubscriptionQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { cardID, subscriptionType } = req.body;
      const userID = await extractUserID(req); //authorization
      try {
        const updateSubscription = await updateUserSub(
          userID,
          cardID,
          subscriptionType
        );
        if (updateSubscription !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ message: 'subscription updated successfully' })
          );
        } else {
          errorMessage(res, 'Error updating subscription', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error updating subscription');
      }
    });
  });
}
