import { selectSong } from '../../database/queries/dbFileQueries.js';
import jsonParserMiddleware from '../../middlewares/jsonParser.js';
import hashPasswordMiddleware from '../../middlewares/hashPassword.js';
import authenticateMiddleware from '../../middlewares/authenticate.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    await authenticateMiddleware(req, res, async () => {
      const { songName } = req.body;
      try {
        const songDetails = await selectSong(songName);
        if (songDetails) {
          console.log(songDetails);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ message: 'song fetch success', song: songDetails })
          );
        } else {
          console.error('Error fetching song:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal server error');
        }
      } catch (error) {
        console.error('Error fetching song:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
      }
    });
  });
}
