import { setupUserAccount, setupArtistAccount, setupAdminAccount } from "../../database/queries/dbSetupQueries.js";
import { extractUserID } from "../../util/utilFunctions.js";

export async function userSetup(req, res) {
    const { dateOfBirth }  = req.body;
    const userID = await extractUserID(req);
    try {
        const userCreation = await setupUserAccount(userID, dateOfBirth);
        if (userCreation !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({ message: 'listener created successfully'})
            );  
          } else {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'invalid.' }));
          }
    } catch(error) {
        errorMessage(res, error, 'Error finishing listener setup');

    }
}

export async function artistSetup(req, res) {
    const { dateOfBirth }  = req.body;
    const userID = await extractUserID(req);
    try {
        const artistCreation = await setupArtistAccount(userID, dateOfBirth);
        if (artistCreation !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({ message: 'artist created successfully'})
            );  
          } else {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'invalid.' }));
          }
    } catch(error) {
        errorMessage(res, error, 'Error finishing artist setup');

    }
}

export async function adminSetup(req, res) {
  const { dateOfBirth }  = req.body;
  const userID = await extractUserID(req);
  try {
      const adminCreation = await setupAdminAccount(userID, dateOfBirth);
      if (adminCreation !== false) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({ message: 'admin created successfully'})
          );  
        } else {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'invalid.' }));
        }
  } catch(error) {
      errorMessage(res, error, 'Error finishing admin setup');

  }
}