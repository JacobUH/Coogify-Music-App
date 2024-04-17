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
            `SELECT c.cardID, c.cardType, c.cardNumber, c.cardExpiration, c.cardSecurity, u.firstName, u.lastName
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
            `SELECT t.transactionID, t.subscriptionID, t.transactionAmount, t.subscriptionType, s.startDate, s.endDate, u.email, u.firstName, u.LastName, c.cardType, c.cardNumber
            FROM TRANSACTION t
            INNER JOIN SUBSCRIPTION s ON t.subscriptionID = s.subscriptionID
            INNER JOIN CARD c ON s.cardID = c.cardID
            INNER JOIN USER u ON c.userID = u.userID
            WHERE u.userID = ?`,
        [userID]
        );
        console.log('history retrieved successfully');
        return rows;

    }   catch (error) {
        console.error('Error retrieving history', error);
        return false;
    }
}

export async function createTicket(userID, transactionAmount, subscriptionType) {
    try {
        const [subscriptionRows] = await pool.query(
            `SELECT s.subscriptionID
            FROM SUBSCRIPTION s
            WHERE s.userID = ?`,
            [userID]
        );

        // Check if a subscriptionID was found
        if (subscriptionRows.length > 0) {
            const subscriptionID = subscriptionRows[0].subscriptionID;

            // Insert the transaction with the retrieved subscriptionID
            await pool.query(
                `INSERT INTO TRANSACTION (subscriptionID, transactionAmount, subscriptionType)
                VALUES (?, ?, ?)`,
                [subscriptionID, transactionAmount, subscriptionType]
            );
            console.log('transaction inputted successfully');

        }   
    } catch (error) {
        console.error('Error creating transaction', error);
        return false;
    }
}