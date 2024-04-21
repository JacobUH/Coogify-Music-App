import * as logregq from '../../database/queries/dbLoginRegQueries.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../middlewares/middleware.js';
import { createSession, destroySession } from '../../util/sessionManager.js';
import { getUserFromEmail } from '../../database/queries/dbUserQueries.js';
import { extractUserID } from '../../util/utilFunctions.js';

export async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;
  if (
    email === undefined ||
    password === undefined ||
    firstName === undefined ||
    lastName === undefined
  ) {
    console.log(
      `one or more parameters are undefined: [${email}, ${password}, ${firstName}, ${lastName}]`
    );
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'One or more parameters are missing.' }));
    return;
  }
  const hPassword = await hashPassword(password);

  try {
    const registered = await logregq.registerUser(
      email,
      hPassword,
      firstName,
      lastName
    );
    if (registered) {
      const session = await createSession(getUserFromEmail(email));
      const hashedPasswordFromDB = await logregq.getPasswordByEmail(email);
      console.log('db hashed password: ', hashedPasswordFromDB);
      console.log('og hashed password: ', hPassword);
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: 'User registered successfully.',
          sessionID: session,
        })
      );
    } else {
      res.statusCode = 409;
      res.end(
        JSON.stringify({
          error: 'Email already exists for another account.',
        })
      );
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

// Function to handle user login
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const hashedPasswordFromDB = await logregq.getPasswordByEmail(email);

    if (hashedPasswordFromDB === null) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Invalid email or password');
      return;
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      hashedPasswordFromDB
    );

    if (!isPasswordMatch) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Invalid email or password');
      return;
    }

    // Passwords match, user successfully authenticated
    const user = getUserFromEmail(email);
    // await destroySession(user);
    const session = await createSession(user);
    console.log('Session created:', session);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'Login successful', sessionID: session })
    );
  } catch (error) {
    console.error('Error during login:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
}

export async function logout(req, res) {
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
    const deletedSession = await destroySession(extractUserID(req));

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
