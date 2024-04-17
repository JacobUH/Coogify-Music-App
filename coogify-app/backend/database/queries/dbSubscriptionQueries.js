import pool from '../dbConnection.js';

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

export async function cancelUserSub(userID){
    try {
        const sql = `
            UPDATE SUBSCRIPTION
            SET endDate = renewDate
            WHERE userID = ?
        `;
        await pool.query(sql, [userID]);
        return true;
    } catch (error) {
        console.error('Error cancelling subscription in database', error);
        return false;
    }
}

export async function restoreUserSub(userID){
    try {
        
        
        const sql = `
            UPDATE SUBSCRIPTION
            SET endDate = NULL
            WHERE userID = ?
        `;
        await pool.query(sql, [userID]);
        return true;
    } catch (error) {
        console.error('Error restoring subscription in database', error);
        return false;
    }
}