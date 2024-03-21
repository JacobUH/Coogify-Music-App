import bcrypt from 'bcrypt';
import { sessionExists } from '../Session/sessionManager.js';

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
  const path = new URL(req.url, 'http://localhost').pathname;
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


// export async function authenticate(req, res, next) {
//   console.log('authenticating');
//   const path = new URL(req.url, 'http://localhost').pathname;
//   console.log(path);
//   // Check if the request path is not login or register
//   if (path !== '/api/login' && path !== '/api/register') {
//     console.log('not in login or register');
//     // Check if the session is valid
//     console.log(req.body);
//     try {
//       const { sessionID } = req.body; // Assuming session ID is sent in the request body
//       console.log(sessionID);
//       const exists = await sessionExists(sessionID);
//       if (!exists) {
//         unauthorized(req, res);
//         return;
//       }
//     } catch (err) {
//       unauthorized(req, res);
//       return;
//     }
//   }
//   next();
// }

// function unauthorized(req, res) {
//   res.writeHead(401, { 'Content-Type': 'text/plain' });
//   res.end('Unauthorized');
//   return;
// }
