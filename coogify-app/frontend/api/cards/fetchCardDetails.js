import { fetchCardDetails } from '../../database/queries/dbCardQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';
import jsonParserMiddleware from '../middlewares/jsonParser.js';
import hashPasswordMiddleware from '../middlewares/hashPassword.js';
import authenticateMiddleware from '../middlewares/authenticate.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    await authenticateMiddleware(req, res, async () => {
      try {
        const songs = await fetchCardDetails();
        if (songs !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(songs));
        } else {
          errorMessage(res, 'Error fetching card details', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching card details');
      }
    });
  });
}