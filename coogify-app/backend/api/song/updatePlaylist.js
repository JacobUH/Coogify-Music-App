import { extractUserID, errorMessage } from '../../util/utilFunctions.js';
import jsonParserMiddleware from '../../middlewares/jsonParser.js';
import authenticateMiddleware from '../../middlewares/authenticate.js';
import { updatePlaylist } from '../../database/queries/dbSongQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    await authenticateMiddleware(req, res, async () => {
      const { playlistName, playlistDescription, playlistArt } = req.body;
      const user = extractUserID(req);
      if (user !== null) {
        try {
          // Call updatePlaylist method with necessary parameters
          const modified = await updatePlaylist(
            playlistName,
            playlistDescription,
            playlistArt,
            user
          );
          if (modified) {
            console.log('Success modifying playlist');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Playlist modifying successfully');
          } else {
            errorMessage(res, 'Could not modify playlist', 'Error');
          }
        } catch (error) {
          errorMessage(res, error, 'Error modifying playlist');
        }
      } else {
        errorMessage(res, 'Unable to extract sessionID', 'Error');
      }
    });
  });
}
