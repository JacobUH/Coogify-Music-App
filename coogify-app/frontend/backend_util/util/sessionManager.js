import crypto from 'crypto';
import {
  deleteSession,
  getUserFromSession,
  makeSession,
} from '../database/queries/dbAuthQueries.js';

function generateSessionId() {
  // Generate 16 bytes of random data
  const randomBytes = crypto.randomBytes(16);
  // Convert random bytes to a hexadecimal string
  const sessionId = randomBytes.toString('hex');
  return sessionId;
}

export async function createSession(user_id) {
  const session = await generateSessionId();
  if (makeSession(user_id, session)) return session;
  else return null;
}

export async function destroySession(user) {
  if (deleteSession(user)) return true;
  return false;
}

export async function sessionExists(session) {
  const user = await getUserFromSession(session);
  if (user !== null) return true;
  else return false;
}
