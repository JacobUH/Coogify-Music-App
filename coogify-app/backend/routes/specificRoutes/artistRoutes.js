import { insertArtist } from '../../database/queries/dbArtistQueries.js';
import { extractSessionId, errorMessage } from '../../util/utilFunctions.js';

export async function addArtistName(req, res) {
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
}
