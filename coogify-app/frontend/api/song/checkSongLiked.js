import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { isSongLiked } from '../../backend_util/database/queries/dbSongQueries.js';
import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { trackID } = req.body;
      const userID = await extractUserID(req);
      try {
        const result = await isSongLiked(trackID, userID);
        if (result) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('true'); // Convert boolean to string
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' }); // Use 200 for success
          res.end('false'); // Convert boolean to string
        }
      } catch (error) {
        console.error('Error during checking song:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
      }
    });
  });
}
