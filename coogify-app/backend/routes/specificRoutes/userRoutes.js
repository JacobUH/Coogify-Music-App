import { selectUserCredentials, selectSubCredentials } from "../../database/queries/dbUserQueries.js";
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

export async function getUserCredentials(req, res) {
    const userID = await extractUserID(req);
    try {
         const credentials = await selectUserCredentials(userID);
         if (credentials !== false) {
             console.log(credentials);
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify(credentials));
           } else {
             errorMessage(res, 'Error fetching user credentials', 'Error');
           }
     } catch(error) {
         errorMessage(res, error, 'Error fetching credentials');
     }
 }

 export async function getSubCredentials(req, res) {
    const userID = await extractUserID(req);
    try {
         const credentials = await selectSubCredentials(userID);
         if (credentials !== false) {
             console.log(credentials);
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify(credentials));
           } else {
             errorMessage(res, 'Error fetching subscription credentials', 'Error');
           }
     } catch(error) {
         errorMessage(res, error, 'Error fetching subscription credentials');
     }
 }