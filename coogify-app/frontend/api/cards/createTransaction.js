import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { createTicket } from '../../backend_util/database/queries/dbCardQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { transactionAmount, subscriptionType } = req.body;
      const userID = await extractUserID(req);
      try {
        const createTransaction = await createTicket(
          userID,
          transactionAmount,
          subscriptionType
        );
        if (createTransaction !== false) {
          console.log(createTransaction);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(createTransaction));
        } else {
          errorMessage(res, 'Error creating transaction', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error creating transaction');
      }
    });
  });
}
