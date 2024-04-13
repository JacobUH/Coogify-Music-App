import { selectNewestSongs, selectTopSongs, selectRapSongs, selectRBSongs, selectPopSongs, selectUserLikedSongs, selectKPopSongs, selectLatinSongs, selectAlternativeSongs, selectClassicalSongs, selectJazzSongs, selectElectronicSongs, selectCountrySongs, selectHipHopSongs, selectRockSongs} from '../../database/queries/dbHomeQueries.js';
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

export async function fetchNewestSongs(req, res) {
  try {
    const songs = await selectNewestSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching newest songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching newest songs');
  }
}

export async function fetchTopSongs(req, res) {
  try {
    const songs = await selectTopSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching top songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching top songs');
  }
}

export async function fetchRapSongs(req, res) {
  try {
    const songs = await selectRapSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching rap songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching rap songs');
  }
}

export async function fetchRBSongs(req, res) {
  try {
    const songs = await selectRBSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching r&b songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching r&b songs');
  }
}

export async function fetchPopSongs(req, res) {
  try {
    const songs = await selectPopSongs();
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching pop songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching pop songs');
  }
}

export async function fetchUserLikedSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectUserLikedSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching your liked songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching your liked songs');
  }
}

export async function fetchKPopSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectKPopSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching kpop songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching kpop songs');
  }
}

export async function fetchLatinSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectLatinSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching latin songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching latin songs');
  }
}

export async function fetchAlternativeSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectAlternativeSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching alternative songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching alternative songs');
  }
}

export async function fetchClassicalSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectClassicalSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching classical songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching classical songs');
  }
}

export async function fetchJazzSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectJazzSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching Jazz songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching Jazz songs');
  }
}

export async function fetchElectronicSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectElectronicSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching Electronic songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching Electronic songs');
  }
}

export async function fetchCountrySongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectCountrySongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching Country songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching Country songs');
  }
}

export async function fetchHipHopSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectHipHopSongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching hip hop songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching hip hop songs');
  }
}

export async function fetchRockSongs(req, res) {
  try {
    const userID = await extractUserID(req);
    const songs = await selectCountrySongs(userID);
    if (songs !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(songs));
    } else {
      errorMessage(res, 'Error fetching Rock songs', 'Error');
    }
  } catch (error) {
    errorMessage(res, error, 'Error fetching Rock songs');
  }
}
