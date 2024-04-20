// import bcrypt from 'bcrypt';
// import * as logregq from '../database/queries/dbLoginRegQueries.js';
// import { getUserFromEmail } from '../database/queries/dbUserQueries.js';
// import { createSession } from '../Session/sessionManager.js';
// import { deleteSession } from '../database/queries/dbAuthQueries.js';
// import jsonParserMiddleware from '../middlewares/jsonParser.js';
// import hashPasswordMiddleware from '../middlewares/hashPassword.js';
// import authenticateMiddleware from '../middlewares/authenticate.js';

// export default async function handler(req, res) {
//   jsonParserMiddleware(req, res, async () => {
//     const { email, password } = req.body;

//     try {
//       const hashedPasswordFromDB = await logregq.getPasswordByEmail(email);

//       if (hashedPasswordFromDB === null) {
//         res.writeHead(401, { 'Content-Type': 'text/plain' });
//         res.end('Invalid email or password');
//         return;
//       }

//       const isPasswordMatch = await bcrypt.compare(
//         password,
//         hashedPasswordFromDB
//       );

//       if (!isPasswordMatch) {
//         res.writeHead(401, { 'Content-Type': 'text/plain' });
//         res.end('Invalid email or password');
//         return;
//       }

//       // Passwords match, user successfully authenticated
//       const user = getUserFromEmail(email);
//       await deleteSession(user);
//       const session = await createSession(user);
//       console.log('Session created:', session);

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(
//         JSON.stringify({ message: 'Login successful', sessionID: session })
//       );
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('Internal server error');
//     }
//   });
// }
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

module.exports = allowCors(handler);
