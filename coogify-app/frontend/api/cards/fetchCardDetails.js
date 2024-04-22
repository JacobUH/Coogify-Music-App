import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { getCardDetails } from '../../backend_util/database/queries/dbCardQueries.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const userID = await extractUserID(req);
      try {
        const receiveInformation = await getCardDetails(userID);
        if (receiveInformation !== false) {
          console.log(receiveInformation);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(receiveInformation));
        } else {
          errorMessage(res, 'Error fetching card details', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching card details');
      }
    });
  });
}
