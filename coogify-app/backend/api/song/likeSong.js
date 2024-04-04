import { getUserFromSession } from '../../database/queries/dbAuthQueries.js';
import { insertLikedSong } from '../../database/queries/dbSongQueries.js';

export default async function handler(req, res) {
  console.log('hello');
  const { trackID, sessionToken } = req.body;
  const userID = await getUserFromSession(sessionToken);
  console.log('userID: ', userID);
  try {
    const result = await insertLikedSong(trackID, userID);
    if (result) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Song added to liked songs');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Song could not be added to liked songs');
    }
  } catch (error) {
    console.error('Error during liking song:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error.');
  }
}
