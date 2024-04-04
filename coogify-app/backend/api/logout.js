import bcrypt from 'bcrypt';
import * as logregq from '../database/queries/dbLoginRegQueries.js';
import { hashPassword } from '../util/utilFunctions.js';
import { getUserFromEmail } from '../database/queries/dbUserQueries.js';
import { createSession } from '../Session/sessionManager.js';
import { deleteSession } from '../database/queries/dbAuthQueries.js';
import jsonParserMiddleware from '../middlewares/jsonParser.js';
import hashPasswordMiddleware from '../middlewares/hashPassword.js';
import authenticateMiddleware from '../middlewares/authenticate.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res);
  hashPasswordMiddleware(req, res);
  authenticateMiddleware(req, res);
  console.log('this is inside the req: ', req);
  try {
    // If user is missing, return an error response
    if (!req) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Session token is required.');
      console.log('Session token is required.');
      return;
    }

    // Delete the session associated with the provided session token
    const deletedSession = await deleteSession(extractUserID(req));

    if (deletedSession) {
      // If the session is successfully deleted, send a success response
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Logout successful');
    } else {
      // If the session does not exist or any other error occurs, send an error response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Session not found or already expired.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error.');
  }
}
