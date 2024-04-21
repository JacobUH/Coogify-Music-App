// authenticateMiddleware.js
import { sessionExists } from '../util/sessionManager.js';

export default async function authenticateMiddleware(request, response, next) {
  console.log('authenticating');
  const path = new URL(request.url, `http://${process.env.MYSQL_HOST}`)
    .pathname;
  console.log(path);

  // Check if the request path is not login or register
  if (path !== '/api/login' && path !== '/api/register') {
    console.log('not in login or register');

    // Check if the Authorization header is present
    const authHeader = request.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
      unauthorized(response);
      return;
    }

    // Extract the sessionID from the Authorization header
    const [, sessionID] = authHeader.split(' ');

    // Check if the session is valid
    try {
      const exists = await sessionExists(sessionID);
      if (!exists) {
        unauthorized(response);
        return;
      }
    } catch (err) {
      unauthorized(response);
      return;
    }
  }
  next(); // Proceed to the next middleware or route handler
}

function unauthorized(response) {
  response.status(401).send('Unauthorized');
}
