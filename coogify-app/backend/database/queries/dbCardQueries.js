import pool from '../dbConnection.js';

export async function createCard(userID, cardType, cardNumber, cardExpiration, cardSecurity) {
    try {
        const [rows] = await pool.query(
        `INSERT INTO CARD 
        (userID, cardType, cardNumber, cardExpiration, cardSecurity)
        VALUES (?, ?, ?, ?, ?)`,
        [userID, cardType, cardNumber, cardExpiration, cardSecurity]
    );
    console.log('card created successfully');
    return true;

    }   catch (error) {
        console.error('Error creating card', error);
        return false;
    }
}



export async function getCardDetails(userID) {
    try {
        const [rows] = await pool.query(
            `SELECT c.cardType, c.cardNumber, c.cardExpiration, c.cardSecurity, u.firstName, u.lastName
             FROM CARD c
             INNER JOIN USER u ON c.userID = u.userID
             WHERE c.userID = ?`, 
             [userID]
        );

        console.log('Card details retrieved successfully');
        return rows;

    } catch (error) {
        console.error('Error fetching card details', error);
        return false;
    }
}



export async function retrievePurchaseHistory(userID) {
    try {
        const [rows] = await pool.query(
        `SELECT subscriptionType, startDate
         FROM subscription
         WHERE userID = ?`,
        [userID]
    );
    console.log('history retrieved successfully');
    return rows;

    }   catch (error) {
        console.error('Error retrieving history', error);
        return false;
    }
}