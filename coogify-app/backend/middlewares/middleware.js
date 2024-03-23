import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { sessionExists } from '../Session/sessionManager.js';
import { getUserFromSession } from '../database/queries/dbAuthQueries.js';
dotenv.config();


export async function jsonParser(req, res, next) {
  try {
    if (req.headers['content-type'] === 'application/json') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          req.body = JSON.parse(body); // Parse the JSON data and assign it to req.body
          next(); // Call the next middleware or route handler
        } catch (error) {
          console.error('Error parsing JSON:', error);
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid JSON data');
        }
      });
    } else {
      // If content type is not JSON, continue to the next middleware or route handler
      next();
    }
  } catch (error) {
    console.error('Error in jsonParser:', error);
    // Call the error handling middleware
    next(error);
  }
}

export async function hashPasswordMiddleware(req, res, next) {
  try {
    // Check if the request method is POST and if JSON data exists
    if (
      req.method === 'POST' &&
      req.headers['content-type'] === 'application/json' &&
      req.body.password
    ) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
      req.body.password = hashedPassword; // Update the password field with the hashed password
    }
    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in hashPasswordMiddleware:', error);
    // Call the error handling middleware
    next(error);
  }
}

export async function hashPassword(password) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword; // Return the hashed password
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

export async function authenticate(req, res, next) {
  console.log('authenticating');
  const path = new URL(req.url, `http://${process.env.MYSQL_HOST}`).pathname;
  console.log(path);

  // Check if the request path is not login or register
  if (path !== '/api/login' && path !== '/api/register') {
    console.log('not in login or register');

    // Check if the Authorization header is present
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      unauthorized(req, res);
      return;
    }

    // Extract the sessionID from the Authorization header
    const [, sessionID] = authHeader.split(' ');

    // Check if the session is valid
    try {
      const exists = await sessionExists(sessionID);
      if (!exists) {
        unauthorized(req, res);
        return;
      }
    } catch (err) {
      unauthorized(req, res);
      return;
    }
  }

  next();
}

function unauthorized(req, res) {
  res.writeHead(401, { 'Content-Type': 'text/plain' });
  res.end('Unauthorized');
}

// export function errorMessage(res, theError, message) {
//   console.error(`${message}: ${theError}`);
//   res.writeHead(500, { 'Content-Type': 'text/plain' });
//   res.end('Internal server error');
// }

// export function extractSessionId(req) {
//   // Check if the Authorization header exists
//   if (req.headers && req.headers.authorization) {
//     // Split the Authorization header value by space
//     const parts = req.headers.authorization.split(' ');

//     // Check if the Authorization header has two parts and the first part is "Bearer"
//     if (parts.length === 2 && parts[0] === 'Bearer') {
//       // Return the second part, which should be the session ID
//       return parts[1];
//     }
//   }

//   // If the Authorization header doesn't exist or is invalid, return null
//   return null;
// }

// export async function extractUserID(req) {
//   const session = extractSessionId(req);
//   const userID = await getUserFromSession(session);
//   return userID;
// }
