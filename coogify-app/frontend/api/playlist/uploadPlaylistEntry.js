import {
  extractUserID,
  errorMessage,
} from '../../backend_util/util/utilFunctions.js';
import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { createPlaylist } from '../../backend_util/database/queries/dbSongQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    await authenticateMiddleware(req, res, async () => {
      const { playlistName, playlistDescription, coverArtURL } = req.body;
      const userID = await extractUserID(req);

      try {
        const playlistCreation = await createPlaylist(
          userID,
          playlistName,
          playlistDescription,
          coverArtURL
        );
        if (playlistCreation !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'playlist creation successful' }));
        } else {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Already Have Playlist Name.' }));
        }
      } catch (error) {
        errorMessage(res, error, 'Error fetching playlist songs');
      }
    });
  });
}
