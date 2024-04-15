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
    const {email, userPassword, firstName, lastName, dateOfBirth, profileImage, bio}  = req.body;
    const result = await updateUserProfile(userID, email, userPassword, firstName, lastName, dateOfBirth, profileImage, bio);
    if (result !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Profile updated successfully' }));
    } else {
      errorMessage(res, 'Error updating profile', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error updating profile');
  }
}
