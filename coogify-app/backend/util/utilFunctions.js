import { getUserFromSession } from '../database/queries/dbAuthQueries.js';
import { selectArtistIDfromUserID } from '../database/queries/dbArtistQueries.js';

export function errorMessage(res, theError, message) {
  console.error(`${message}: ${theError}`);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Internal server error');
}

export function extractSessionId(req) {
  // Check if the Authorization header exists
  if (req.headers && req.headers.authorization) {
    // Split the Authorization header value by space
    const parts = req.headers.authorization.split(' ');

    // Check if the Authorization header has two parts and the first part is "Bearer"
    if (parts.length === 2 && parts[0] === 'Bearer') {
      // Return the second part, which should be the session ID
      return parts[1];
    }
  }

  // If the Authorization header doesn't exist or is invalid, return null
  return null;
}

export async function extractUserID(req) {
  const session = extractSessionId(req);
  const userID = await getUserFromSession(session);
  return userID;
}

export async function extractArtistID(req) {
  const userID = extractUserID(req);
  const artistID = await selectArtistIDfromUserID(userID);
}
