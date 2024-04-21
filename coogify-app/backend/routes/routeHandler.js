// Import necessary modules
import fs from 'fs';
import path from 'path';
import { jsonParser, authenticate } from '../middlewares/middleware.js';
import { userSetup, artistSetup  } from './specificRoutes/setupRoutes.js'
import { register, login, logout} from './specificRoutes/loginRegRoutes.js';
import { getUserCredentials, getSubCredentials } from './specificRoutes/userRoutes.js'
import { uploadPlaylist, uploadSongsWithAlbum,  } from './specificRoutes/uploadsRoutes.js';
import { getSong } from './specificRoutes/playSongRoutes.js';
import { addArtistName, artistCredentials, artistTopSongs, artistReport, artistAlbums, artistAllAlbums, artistSongsFromAlbum, addDeletedMusic } from './specificRoutes/artistRoutes.js';
import { fetchNewestSongs, fetchTopSongs, fetchHomeSongs, fetchUserLikedSongs } from './specificRoutes/homeRoutes.js';
import { likeSong, unlikeSong, checkSongLiked } from './specificRoutes/songRoutes.js';
import { retrieveAllArtists, retrieveAllUsers, retrieveAllSongs, adminLogin,} from './specificRoutes/adminRoutes.js';
import { fetchSongs, fetchAlbums } from './specificRoutes/searchRoutes.js'
import { fetchAlbumSongs } from './specificRoutes/albumRoutes.js'
import { addCard, fetchCardDetails, getPurchaseHistory, createTransaction } from './specificRoutes/cardRoutes.js';
import { uploadPlaylistEntry, deletePlaylistEntry, fetchPlaylists, fetchPlaylistSongs, addSongToPlaylist, selectAddSongPlaylist, removeSongFromPlaylist } from './specificRoutes/playlistRoutes.js'
import { fetchUserProfile, updateProfile } from './specificRoutes/profileRoutes.js';
import { makePayment, updateSubscription, cancelSubscription, restoreSubscription} from './specificRoutes/subscriptionRoutes.js'
import { updateAlbumName, deleteSong, deleteAlbum } from './specificRoutes/updateRoutes.js'


// Define the handlers object
const handlers = {
  api: {
    register: register, 
    login: login, 
    logout: logout, 
    setup: {
      userSetup: userSetup,
      artistSetup: artistSetup,
    },
    user: {
      userCredentials: getUserCredentials,
      subscriptionCredentials: getSubCredentials,
    },
    song: {
      likeSong: likeSong,
      unlikeSong: unlikeSong,
      checkSongLiked: checkSongLiked,
    },
    album: fetchAlbumSongs,
    update: {
      updateAlbumName: updateAlbumName,
      deleteSong: deleteSong,
      deleteAlbum: deleteAlbum
    },
    playlist: {
      uploadPlaylistEntry: uploadPlaylistEntry,
      deletePlaylistEntry: deletePlaylistEntry,
      fetchPlaylists: fetchPlaylists,
      fetchPlaylistSongs: fetchPlaylistSongs,
      addSong: addSongToPlaylist,
      selectAddSong: selectAddSongPlaylist,
      removeSong: removeSongFromPlaylist,
    },
    fetch: {
      song: getSong,
    },
    payment: makePayment,
    upload: {
      uploadPlaylist: uploadPlaylist,
      uploadSongs: uploadSongsWithAlbum,
    },
    search: {
      fetchSongs: fetchSongs,
      fetchAlbums: fetchAlbums,
    },
    home: {
      fetchNewSongs: fetchNewestSongs, // GET
      fetchTopSongs: fetchTopSongs, // GET
      fetchSongs: fetchHomeSongs, // POST
      fetchUserLikedSongs: fetchUserLikedSongs, // GET
    },
    card: {
      addCard: addCard,
      PrevTransactions: getPurchaseHistory,
      createTransaction: createTransaction,
      fetchCardDetails: fetchCardDetails,
    },
    subscription: {
      updateSubscription: updateSubscription,
      cancelSubscription: cancelSubscription,
      restoreSubscription: restoreSubscription,
    },
    admin: {
      adminLogin: adminLogin,
      music: retrieveAllSongs,
      users: retrieveAllUsers,
      artists: retrieveAllArtists,
    },
    artist: {
      artistSetup: addArtistName,
      artistCredentials: artistCredentials,
      artistTopSongs: artistTopSongs,
      artistReport: artistReport,
      artistAlbums: artistAlbums,
      artistAllAlbums: artistAllAlbums,
      artistSongsFromAlbum: artistSongsFromAlbum,
      addDeletedMusic: addDeletedMusic

    },
    notifications: {
      daysToPay: (req, res) => 'pay',
    },
    profile: {
      fetchProfile: fetchUserProfile,
      updateProfile: updateProfile,
    },
  },
};

// Function to handle file serving
function serveFile(req, res) {
  const currentUrl = new URL(import.meta.url);
  console.log('current URL', currentUrl);
  const currentPath = decodeURI(currentUrl.pathname);
  const currentDirectory = path.dirname(currentPath);
  const decodedUrl = decodeURIComponent(req.url); // Decode URI component to replace %20 with spaces
  const filePath = path.join(currentDirectory, '..', decodedUrl); // Adjust the path as needed
  console.log('serving filepath: ', filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
}

// Function to handle the request
export async function handleRequest(req, res) {
  console.log('in routehandler');
  console.log(req.url);
  try {
    // AWS Healthcheck url
    if (req.url.startsWith('/api/healthCheck')) {
      res.writeHead(200);
      res.end();
      return;
    }
    // Check if the request URL starts with '/uploads/'
    console.log(req.url);
    if (req.url.startsWith('/uploads/')) {
      serveFile(req, res);
      return;
    }

    // Your existing request handling logic
    await jsonParser(req, res, async () => {
      await authenticate(req, res, async () => {
        const { method, url } = req;
        const [path, queryString] = url.split('?');
        const segments = path.split('/').filter(Boolean);
        let current = handlers;

        // Traverse route structure
        for (const segment of segments) {
          if (typeof current === 'object' && current.hasOwnProperty(segment)) {
            current = current[segment];
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`No handler found for ${path}`);
            return;
          }
        }

        // Check if the current object is a handler function
        if (typeof current === 'function') {
          if (method === 'POST') {
            current(req, res);
          } else {
            const params = {};
            if (queryString) {
              const queryParams = new URLSearchParams(queryString);
              for (const [key, value] of queryParams) {
                params[key] = value;
              }
            }
            current(req, res, params);
          }
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end(`No handler function found for ${path}`);
        }
      });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
}
