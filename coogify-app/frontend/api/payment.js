import jsonParserMiddleware from '../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../backend_util/middlewares/authenticate.js';
import { extractUserID } from '../backend_util/util/utilFunctions.js';
import { insertPayment } from '../backend_util/database/queries/dbUserQueries.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      try {
        const userID = await extractUserID(req);
        await insertPayment(userID);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Payment successful');
      } catch (error) {
        console.error('Error paying:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
      }
    });
  });
}
