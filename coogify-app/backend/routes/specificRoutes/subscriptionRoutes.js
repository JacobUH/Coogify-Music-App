// subscribe -- Subscribe: /api/subscriptions/subscribe
// cancelSubscription -- Cancel Subscription: /api/subscriptions/cancel
import { extractUserID } from '../../util/utilFunctions.js';
import { insertPayment } from '../../database/queries/dbUserQueries.js';

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
