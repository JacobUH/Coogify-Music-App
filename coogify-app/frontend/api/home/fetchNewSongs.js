import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { selectNewestSongs } from '../../backend_util/database/queries/dbHomeQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { count } = req.body;
      try {
        var songs;
        if (count === undefined) {
          console.log('undefined count');
          songs = await selectNewestSongs(10);
        } else {
          songs = await selectNewestSongs(count);
        }
        if (songs !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(songs));
        } else {
          errorMessage(res, 'Error fetching newest songs', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching newest songs');
      }
    });
  });
}
