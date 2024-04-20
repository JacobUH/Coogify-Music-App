import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { errorMessage } from '../../backend_util/util/utilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { updateUserProfile } from '../../backend_util/database/queries/dbProfileQueries.js';


export async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      try {
        const userID = await extractUserID(req);
        // You need to get the updates without including the userID from the request body
        const updates = req.body;

        const isArtist = req.body.isArtist;
        const result = await updateUserProfile(userID, updates, isArtist);

        // Now we pass only the updates, not the userID since it's already a separate variable
        // const result = await updateUserProfile(userID, updates);
        if (result) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Profile updated successfully' }));
        } else {
          errorMessage(res, 'Failed to update profile', 'Error');
        }
      } catch (error) {
        // If the error is due to no updates provided, you can send a different status code
        if (error.message === 'No updates provided') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: error.message }));
        } else {
          errorMessage(res, error, 'Error updating profile');
        }
      }
    });
  });
}
