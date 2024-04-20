import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { selectAlbums } from '../../backend_util/database/queries/dbSearchQueries.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      try {
        const albums = await selectAlbums();
        if (albums !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(albums));
        } else {
          errorMessage(res, 'Error fetching albums', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching albums');
      }
    });
  });
}
