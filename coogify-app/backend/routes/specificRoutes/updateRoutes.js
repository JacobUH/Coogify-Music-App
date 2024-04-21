import { errorMessage, extractUserID } from "../../util/utilFunctions.js";
import { newAlbumNameUpdate, deletingSong, deletingAlbum } from '../../database/queries/dbUpdateQueries.js'

export async function updateAlbumName(req, res) {
    const { newAlbumName, albumName }  = req.body;
    const userID = await extractUserID(req);

    try {
        const updateAlbumName = await newAlbumNameUpdate(userID, newAlbumName, albumName);
        if (updateAlbumName !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({ message: 'album rename successful'})
            );  
          } else {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'issue with commonality for album name.' }));
          }
    } catch(error) {
        errorMessage(res, error, 'Error updating album name');

    }
}

export async function deleteSong(req, res) {
    const { trackID }  = req.body;
    try {
        const songDelete = await deletingSong(trackID);
        if (songDelete !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({ message: 'album deleted successfully'})
            );  
          } else {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'issue with deleting album.' }));
          }
    } catch(error) {
        errorMessage(res, error, 'Error deleteing album');

    }
}


export async function deleteAlbum(req, res) {
    const { albumName }  = req.body;
    try {
        const AlbumDelete = await deletingAlbum(albumName);
        if (AlbumDelete !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({ message: 'album rename successful'})
            );  
          } else {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'issue with commonality for album name.' }));
          }
    } catch(error) {
        errorMessage(res, error, 'Error updating album name');

    }
}
