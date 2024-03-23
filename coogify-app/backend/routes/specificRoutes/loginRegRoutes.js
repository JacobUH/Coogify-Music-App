import * as logregq from '../../database/queries/dbLoginRegQueries.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../middlewares/middleware.js';
import { createSession } from '../../Session/sessionManager.js';
import { getUserFromEmail } from '../../database/queries/dbUserQueries.js';
import { deleteSession } from '../../database/queries/dbAuthQueries.js';

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

  try {
    const registered = await logregq.registerUser(
      email,
      password,
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
