// subscribe -- Subscribe: /api/subscriptions/subscribe
// cancelSubscription -- Cancel Subscription: /api/subscriptions/cancel
import { extractUserID } from '../../util/utilFunctions.js';
import { insertPayment } from '../../database/queries/dbUserQueries.js';
import { updateUserSub, cancelUserSub, restoreUserSub } from '../../database/queries/dbSubscriptionQueries.js';

export async function makePayment(req, res) {
  try {
    const userID = await extractUserID(req);
    await insertPayment(userID);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Payment successful');
  } catch (error) {
    console.error('Error paying:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
}

export async function updateSubscription(req, res) {
  const { cardID, subscriptionType } = req.body;
  const userID = await extractUserID(req); //authorization
  try {
    const updateSubscription = await updateUserSub(userID, cardID, subscriptionType);
    if (updateSubscription !== false) {
        console.log(updateSubscription);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ message: 'subscription updated successfully'})
        );  
      } else {
        errorMessage(res, 'Error updating subscription', 'Error');
      }
  } catch(error) {
      errorMessage(res, error, 'Error updating subscription');

  }    
}

export async function cancelSubscription(req, res) {
  const userID = await extractUserID(req);
  try {
    const cancelSubscription = await cancelUserSub(userID);
    if (cancelSubscription !== false) {
        console.log(cancelSubscription);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ message: 'subscription cancelled successfully'})
        );  
      } else {
        errorMessage(res, 'Error cancelling subscription', 'Error');
      }
  } catch(error) {
      errorMessage(res, error, 'Error cancelling subscription');

  }    
}

export async function restoreSubscription(req, res) {
  const userID = await extractUserID(req); 
  try {
    const restoreSubscription = await restoreUserSub(userID);
    if (restoreSubscription !== false) {
        console.log(restoreSubscription);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ message: 'subscription restored successfully'})
        );  
      } else {
        errorMessage(res, 'Error restoring subscription', 'Error');
      }
  } catch(error) {
      errorMessage(res, error, 'Error restoring subscription');

  }    
}