import { selectUserProfile, updateUserProfile } from '../../database/queries/dbProfileQueries.js';
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

// Handler to fetch user profile data
export async function fetchUserProfile(req, res) {
  try {
    const userID = await extractUserID(req);
    const userProfile = await selectUserProfile(userID);
    if (userProfile !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(userProfile));
    } else {
      errorMessage(res, 'Error fetching user profile', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching user profile');
  }
}

// Handler to update user profile data
export async function updateProfile(req, res) {
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
    if (error.message === "No updates provided") {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: error.message }));
    } else {
      errorMessage(res, error, 'Error updating profile');
    }
  }
}
