import { selectCredentials } from "../../database/queries/dbUserQueries.js";
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

export async function getCredentials(req, res) {
    const userID = await extractUserID(req);
    try {
         const credentials = await selectCredentials(userID);
         if (credentials !== false) {
             console.log(credentials);
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify(credentials));
           } else {
             errorMessage(res, 'Error fetching credentials', 'Error');
           }
     } catch(error) {
         errorMessage(res, error, 'Error fetching credentials');
     }
 }