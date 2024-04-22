import { createCard, getCardDetails, retrievePurchaseHistory, createTicket, changeCard } from "../../database/queries/dbCardQueries.js";
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

  export async function createTransaction(req, res) {
    const { transactionAmount, subscriptionType } = req.body;
    const userID = await extractUserID(req);
      try {
        const createTransaction = await createTicket(userID, transactionAmount, subscriptionType);
        if (createTransaction !== false) {
            console.log(createTransaction);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(createTransaction));
          } else {
            errorMessage(res, 'Error creating transaction', 'Error');
          }
    } catch(error) {
        errorMessage(res, error, 'Error creating transaction');
    
    }    
  } 


  export async function updateCard(req, res) {
    const { cardID, cardType, cardNumber, cardExpiration, cardSecurity }  = req.body;
      try {
          const cardUpdate = await changeCard(cardID, cardType, cardNumber, cardExpiration, cardSecurity);
          if (cardUpdate !== false) {
              console.log(cardUpdate);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(cardUpdate));
            } else {
              errorMessage(res, 'Error inputting card', 'Error');
            }
      } catch(error) {
          errorMessage(res, error, 'Error inputting card');
  
      }   
  }
  