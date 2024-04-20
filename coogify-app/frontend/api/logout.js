import { deleteSession } from '../backend_util/database/queries/dbAuthQueries.js';
import jsonParserMiddleware from '../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../backend_util/middlewares/authenticate.js';

export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
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
    });
  });
}
