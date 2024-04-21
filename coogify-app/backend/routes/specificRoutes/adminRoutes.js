import * as logregq from '../../database/queries/dbLoginRegQueries.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../middlewares/middleware.js';
import { createSession, destroySession } from '../../Session/sessionManager.js';
import {
  getUserFromEmail,
  checkAdminVerification,
} from '../../database/queries/dbUserQueries.js';
import { extractUserID } from '../../util/utilFunctions.js';
import {
  selectAllArtists,
  selectAllSongs,
  selectAllUsers,
} from '../../database/queries/dbAdminQueries.js';
import { errorMessage } from '../../util/utilFunctions.js';

export async function retrieveAllArtists(req, res) {
  try {
    const artists = await selectAllArtists();
    sendResponse(res, 200, artists);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching artists');
  }
}

export async function retrieveAllSongs(req, res) {
  try {
    const songs = await selectAllSongs();
    sendResponse(res, 200, songs);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching songs');
  }
}

export async function retrieveAllUsers(req, res) {
  try {
    const users = await selectAllUsers();
    sendResponse(res, 200, users);
  } catch (error) {
    sendErrorResponse(res, error, 'Error fetching users');
  }
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function sendErrorResponse(res, error, message) {
  console.error(message, error);
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}

export async function adminLogin(req, res) {
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

    // Get user ID and await the result
    const userID = await getUserFromEmail(email);
    console.log('user ID', userID);
    if (!userID) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('User not found');
      return;
    }

    // Verify if the user is an admin and await the result

    const isAdmin = await checkAdminVerification(userID);
    console.log('is Admin: ', isAdmin);
    if (isAdmin) {
      // await destroySession(userID);
      const session = await createSession(userID);
      console.log('Session created:', session);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ message: 'Login successful', sessionID: session })
      );
      return;
    } else {
      console.log('User is not an admin');
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('You do not have admin privileges');
      return;
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
}
