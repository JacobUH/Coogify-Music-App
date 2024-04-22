import { getUserFromSession } from "../../database/queries/dbAuthQueries.js";
import { insertLikedSong, removeLikedSong, isSongLiked, recordPlay, isSongActive, isAlbumActive, songActivatation, songDeactivatation, albumActivatation, albumDeactivatation  } from "../../database/queries/dbSongQueries.js";
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

export async function playedSong(req, res) {
    const { trackID } = req.body;
    try {
        const result = await recordPlay(trackID);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('played recorded');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('played not recorded');
        }
    } catch (error) {
        console.error('Error during recording play:', error);
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

export async function checkSongActive(req, res) {
    const { trackID } = req.body;
    try {
        const result = await isSongActive(trackID);
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

export async function checkAlbumActive(req, res) {
    const { albumName } = req.body;
    try {
        const result = await isAlbumActive(albumName);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('true'); // Convert boolean to string
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); // Use 200 for success
            res.end('false'); // Convert boolean to string
        }
    } catch (error) {
        console.error('Error during checking album:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}

export async function activateSong(req, res) {
    const { trackID } = req.body;
    try {
        const result = await songActivatation(trackID);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('true'); // Convert boolean to string
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); // Use 200 for success
            res.end('false'); // Convert boolean to string
        }
    } catch (error) {
        console.error('Error during checking album:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}

export async function deactivateSong(req, res) {
    const { trackID } = req.body;
    try {
        const result = await songDeactivatation(trackID);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('true'); // Convert boolean to string
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); // Use 200 for success
            res.end('false'); // Convert boolean to string
        }
    } catch (error) {
        console.error('Error during checking album:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}
 

export async function activateAlbum(req, res) {
    const { albumName } = req.body;
    try {
        const result = await albumActivatation(albumName);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('true'); // Convert boolean to string
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); // Use 200 for success
            res.end('false'); // Convert boolean to string
        }
    } catch (error) {
        console.error('Error during checking album:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}

export async function deactivateAlbum(req, res) {
    const { albumName } = req.body;
    try {
        const result = await albumDeactivatation(albumName);
        if (result) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('true'); // Convert boolean to string
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); // Use 200 for success
            res.end('false'); // Convert boolean to string
        }
    } catch (error) {
        console.error('Error during checking album:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error.');
    }
}