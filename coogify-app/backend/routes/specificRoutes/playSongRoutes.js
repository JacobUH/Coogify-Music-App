import { selectSong } from '../../database/queries/dbFileQueries.js';

export async function getSong(req, res) {
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
}
