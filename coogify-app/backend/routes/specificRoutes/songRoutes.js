import { getUserFromSession } from "../../database/queries/dbAuthQueries.js";
import { insertLikedSong, removeLikedSong, isSongLiked } from "../../database/queries/dbSongQueries.js";
import { extractUserID } from "../../util/utilFunctions.js";

export async function likeSong(req, res) {
    const { trackID, sessionToken } = req.body;
    const userID = await getUserFromSession(sessionToken);
    try {
        const result = await insertLikedSong(trackID, userID);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Song added to liked songs');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Song could not be added to liked songs');
        }
    } catch (error) {
        console.error('Error during liking song:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}

export async function unlikeSong(req, res) {
    const { trackID } = req.body;
    const userID = await extractUserID(req);
    try {
        const result = await removeLikedSong(trackID, userID);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Song removed from liked songs');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Song could not be removed from liked songs');
        }
    } catch (error) {
        console.error('Error during unliking song:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}

export async function checkSongLiked(req, res) {
    const { trackID } = req.body;
    const userID = await extractUserID(req);
    try {
        const result = await isSongLiked(trackID, userID);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('true'); // Convert boolean to string
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); // Use 200 for success
            res.end('false'); // Convert boolean to string
        }
    } catch (error) {
        console.error('Error during checking song:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}
