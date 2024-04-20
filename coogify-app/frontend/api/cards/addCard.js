import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { createCard } from '../../backend_util/database/queries/dbCardQueries.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { cardType, cardNumber, cardExpiration, cardSecurity } = req.body;
      const userID = await extractUserID(req);
      //console.log(req.body);
      try {
        const cardCreation = await createCard(
          userID,
          cardType,
          cardNumber,
          cardExpiration,
          cardSecurity
        );
        if (cardCreation !== false) {
          console.log(cardCreation);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(cardCreation));
        } else {
          errorMessage(res, 'Error inputting card', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error inputting card');
      }
    });
  });
}
