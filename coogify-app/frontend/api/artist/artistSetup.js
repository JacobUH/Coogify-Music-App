import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractSessionId } from '../../backend_util/util/utilFunctions.js';
import { insertArtist } from '../../backend_util/database/queries/dbArtistQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { artistName } = req.body;
      const sessionID = extractSessionId(req);
      if (sessionID !== null) {
        try {
          const inserted = await insertArtist(sessionID, artistName);
          if (inserted) {
            console.log('Success inserting artist');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Artist inserted successfully');
          } else {
            errorMessage(res, 'Could not add artistName', 'Error');
          }
        } catch (error) {
          errorMessage(res, error, 'Error adding artistName');
        }
      } else {
        errorMessage(res, 'Unable to extract sessionID', 'Error');
      }
    });
  });
}
