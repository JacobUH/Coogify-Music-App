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