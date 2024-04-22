import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { removeLikedSong } from '../../backend_util/database/queries/dbSongQueries.js';
import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { trackID } = req.body;
      const userID = await extractUserID(req);
      try {
        const result = await removeLikedSong(trackID, userID);
        if (result) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Song removed from liked songs');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Song could not be removed from liked songs');
        }
      } catch (error) {
        console.error('Error during unliking song:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
      }
    });
  });
}
