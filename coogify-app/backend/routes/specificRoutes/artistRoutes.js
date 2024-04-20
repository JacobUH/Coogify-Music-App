import { insertArtist, getArtistCreds, getArtistTopSongs } from '../../database/queries/dbArtistQueries.js';
import { extractSessionId, errorMessage, extractUserID } from '../../util/utilFunctions.js';

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

export async function artistCredentials(req, res) {
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const artistCreds = await getArtistCreds(userID);
      if (artistCreds) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistCreds));      
      } else {
        errorMessage(res, 'Could not get artist creds', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting artist creds');
    }
  } else {
    errorMessage(res, 'Unable to get artist creds', 'Error');
  }
}

export async function artistTopSongs(req, res) {
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const artistSongs = await getArtistTopSongs(userID);
      if (artistSongs) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistSongs));      
      } else {
        errorMessage(res, 'Could not get artist top songs', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting artist top songs');
    }
  } else {
    errorMessage(res, 'Unable to get artist top songs', 'Error');
  }
}