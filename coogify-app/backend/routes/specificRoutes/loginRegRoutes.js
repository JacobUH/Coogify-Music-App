import * as logregq from '../../database/queries/dbLoginRegQueries.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../middlewares/middleware.js';
import { createSession, destroySession } from '../../Session/sessionManager.js';
import { getUserFromEmail } from '../../database/queries/dbUserQueries.js';

export async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const hashedInput = await hashPassword(password);
  if (
    email === undefined ||
    hashedInput === undefined ||
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

  try {
    const registered = await logregq.registerUser(
      email,
      hashedInput,
      firstName,
      lastName
    );
    if (registered) {
      const session = await createSession(getUserFromEmail(email));
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: 'User registered successfully.',
          sessionID: session,
        })
      );
    } else {
      res.statusCode = 409;
      res.end(JSON.stringify({ error: 'Email already exists for another account.' }));
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
    // Retrieve hashed password from the database based on the provided email
    const hashedPasswordFromDB = await logregq.getPasswordByEmail(email);

    // If no hashed password found or any other error, return error response
    if (hashedPasswordFromDB === null) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Invalid email or password');
      return;
    }

    // Compare the provided password with the hashed password from the database
    const hashedInput = await hashPassword(password);
    const isPasswordMatch = bcrypt.compare(hashedInput, hashedPasswordFromDB);

    if (!isPasswordMatch) {
      // If passwords do not match, return error response
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Invalid email or password');
      return;
    }

    // Passwords match, user successfully authenticated
    try {
      deleteSession(getUserFromEmail(email));
      const session = await createSession(getUserFromEmail(email));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ message: 'Login successful', sessionID: session })
      );
    } catch (err) {
      console.error('failed to update session during login');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
}

export async function logout(req, res) {
  try {
    // Extract the session token from the request body
    console.log(req);
    const { sessionToken } = req.body;

    // If user is missing, return an error response
    if (!sessionToken) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Session token is required.');
      return;
    }

    // Delete the session associated with the provided session token
    const deletedSession = await deleteSession(extractUserID(sessionToken));

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

