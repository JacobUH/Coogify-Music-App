import { createCard, getCardDetails, retrievePurchaseHistory, updateUserSub } from "../../database/queries/dbCardQueries.js";
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

export async function addCard(req, res) {
  const { cardType, cardNumber, cardExpiration, cardSecurity }  = req.body;
  const userID = await extractUserID(req);
    //console.log(req.body);
    try {
        const cardCreation = await createCard(userID, cardType, cardNumber, cardExpiration, cardSecurity);
        if (cardCreation !== false) {
            console.log(cardCreation);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(cardCreation));
          } else {
            errorMessage(res, 'Error inputting card', 'Error');
          }
    } catch(error) {
        errorMessage(res, error, 'Error inputting card');

    }   
}

export async function fetchCardDetails(req, res) {
  const userID = await extractUserID(req); //authorization
      try {
        const receiveInformation = await getCardDetails(userID);
        if (receiveInformation !== false) {
            console.log(receiveInformation);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(receiveInformation));
          } else {
            errorMessage(res, 'Error fetching card details', 'Error');
          }
      } 

      catch(error) {
          errorMessage(res, error, 'Error fetching card details');
      }    
}

export async function getPurchaseHistory(req, res) {
    const userID = await extractUserID(req); //authorization
      //console.log(req.body);
      try {
        const receiveInformation = await retrievePurchaseHistory(userID);
        if (receiveInformation !== false) {
            console.log(receiveInformation);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(receiveInformation));
          } else {
            errorMessage(res, 'Error receiving purchase history', 'Error');
          }
    } catch(error) {
        errorMessage(res, error, 'Error receiving purchase history');
    
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
