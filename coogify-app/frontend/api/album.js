import { selectAlbumSongs } from '../backend_util/database/queries/dbAlbumQueries.js';
import { errorMessage } from '../backend_util/util/utilFunctions';
import jsonParserMiddleware from '../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../backend_util/middlewares/authenticate.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      const { albumName } = req.body;
      //console.log(req.body);
      try {
        const albumSongs = await selectAlbumSongs(albumName);
        if (albumSongs !== false) {
          console.log(albumSongs);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(albumSongs));
        } else {
          errorMessage(res, 'Error fetching newest songs', 'Error');
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching albums songs');
      }
    });
  });
}
