import { insertArtist, getArtistCreds, getArtistTopSongs, createArtistReport, getArtistAlbums, getAllArtistAlbums, getArtistSongs, getAlbumsBack } from '../../database/queries/dbArtistQueries.js';
import { extractSessionId, errorMessage, extractUserID } from '../../util/utilFunctions.js';

export async function addArtistName(req, res) {
  const { artistName } = req.body;
  const sessionID = extractSessionId(req);
  if (sessionID !== null) {
    try {
      const inserted = await insertArtist(sessionID, artistName);
      if (inserted) {
        console.log('Success inserting artist');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Artist inserted successfully');
      } else {
        errorMessage(res, 'Could not add artistName', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error adding artistName');
    }
  } else {
    errorMessage(res, 'Unable to extract sessionID', 'Error');
  }
}

export async function artistCredentials(req, res) {
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const artistCreds = await getArtistCreds(userID);
      if (artistCreds) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistCreds));      
      } else {
        errorMessage(res, 'Could not get artist creds', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting artist creds');
    }
  } else {
    errorMessage(res, 'Unable to get artist creds', 'Error');
  }
}

export async function artistTopSongs(req, res) {
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const artistSongs = await getArtistTopSongs(userID);
      if (artistSongs) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistSongs));      
      } else {
        errorMessage(res, 'Could not get artist top songs', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting artist top songs');
    }
  } else {
    errorMessage(res, 'Unable to get artist top songs', 'Error');
  }
}

export async function artistReport(req, res) {
  const {albumName, songName, genreName, status, minPlays, maxPlays, minLikes, maxLikes, releaseStart, releaseEnd} = req.body;
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const artistSongs = await createArtistReport(userID, albumName, songName, genreName, status, minPlays, maxPlays, minLikes, maxLikes, releaseStart, releaseEnd);
      if (artistSongs) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistSongs));      
      } else {
        errorMessage(res, 'Could not get the selected artist songs', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting the selected artist songs');
    }
  } else {
    errorMessage(res, 'Unable to get the selected artist songs', 'Error');
  }
}

export async function artistAlbums(req, res) {
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const artistAlbums = await getArtistAlbums(userID);
      if (artistAlbums) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistAlbums));      
      } else {
        errorMessage(res, 'Could not get artist albums', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting artist albums');
    }
  } else {
    errorMessage(res, 'Unable to get artist albums', 'Error');
  }
}


export async function artistAllAlbums(req, res) {
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const artistAllAlbums = await getAllArtistAlbums(userID);
      if (artistAllAlbums) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistAllAlbums));      
      } else {
        errorMessage(res, 'Could not get all artist albums', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting all artist albums');
    }
  } else {
    errorMessage(res, 'Unable to get all artist albums', 'Error');
  }
}


export async function artistSongsFromAlbum(req, res) {
  const { albumName } = req.body;
  if (albumName !== null) {
    try {
      const artistSongs = await getArtistSongs(albumName);
      if (artistSongs) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(artistSongs));      
      } else {
        errorMessage(res, 'Could not get artist songs from album', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting artist songs from album');
    }
  } else {
    errorMessage(res, 'Unable to get artist songs from albums', 'Error');
  }
}


export async function addDeletedMusic(req, res) {
  const userID = await extractUserID(req);
  if (userID !== null) {
    try {
      const addAlbumsBack = await getAlbumsBack(userID);
      if (addAlbumsBack) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
      } else {
        errorMessage(res, 'Could not get albums back', 'Error');
      }
    } catch (error) {
      errorMessage(res, error, 'Error getting albums back');
    }
  } else {
    errorMessage(res, 'Unable to get albums back', 'Error');
  }
}