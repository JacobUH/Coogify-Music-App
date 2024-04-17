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

export async function updateUserSub(userID, cardID, subscriptionType){
    try {
        const currentDate = new Date();
        const renewDate = new Date();
        renewDate.setMonth(renewDate.getMonth() + 1);
        
        const sql = `
            UPDATE SUBSCRIPTION
            SET cardID = ?, subscriptionType = ?, subcriptionActive = 1, startDate = ?, renewDate = ?
            WHERE userID = ?
        `;
        await pool.query(sql, [cardID, subscriptionType, currentDate, renewDate, userID]);
        return true;
    } catch (error) {
        console.error('Error updating subscription in database', error);
        return false;
    }
}