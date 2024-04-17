// Import necessary modules
import fs from 'fs';
import path from 'path';
import { jsonParser, authenticate } from '../middlewares/middleware.js';
import { register, login, logout} from './specificRoutes/loginRegRoutes.js';
import { getUserCredentials, getSubCredentials } from './specificRoutes/userRoutes.js'
import { uploadPlaylist, uploadSongsWithAlbum } from './specificRoutes/uploadsRoutes.js';
import { getSong } from './specificRoutes/playSongRoutes.js';
import { addArtistName } from './specificRoutes/artistRoutes.js';
import { fetchNewestSongs, fetchTopSongs, fetchRapSongs, fetchRBSongs, fetchPopSongs, fetchUserLikedSongs, fetchKPopSongs, fetchLatinSongs, fetchAlternativeSongs, fetchClassicalSongs, fetchJazzSongs, fetchElectronicSongs, fetchCountrySongs, fetchRockSongs } from './specificRoutes/homeRoutes.js';
import { likeSong } from './specificRoutes/songRoutes.js';
import { retrieveAllArtists, retrieveAllUsers, retrieveAllSongs,} from './specificRoutes/adminRoutes.js';
import { fetchSongs, fetchAlbums } from './specificRoutes/searchRoutes.js'
import { fetchAlbumSongs } from './specificRoutes/albumRoutes.js'
import { addCard, fetchCardDetails, getPurchaseHistory, createTransaction } from './specificRoutes/cardRoutes.js';
import { uploadPlaylistEntry, fetchPlaylists, fetchPlaylistSongs, addSongToPlaylist } from './specificRoutes/playlistRoutes.js'
import { fetchUserProfile, updateProfile } from './specificRoutes/profileRoutes.js';
import { makePayment, updateSubscription, cancelSubscription, restoreSubscription} from './specificRoutes/subscriptionRoutes.js'

// Define the handlers object
const handlers = {
  api: {
    register: register, 
    login: login, 
    logout: logout, 
    user: {
      userCredentials: getUserCredentials,
      subscriptionCredentials: getSubCredentials
    },
    song: {
      likeSong: likeSong,
      addSong: (req, res) => 'addSongToPlaylist',
      removeSong: (req, res) => 'removeSongFromPlaylist',
    },
    album: fetchAlbumSongs,
    playlist: {
      uploadPlaylistEntry: uploadPlaylistEntry,
      fetchPlaylists: fetchPlaylists,
      fetchPlaylistSongs: fetchPlaylistSongs,
      addSong: addSongToPlaylist
    },
    fetch: {
      song: getSong,
      album: (req, res) => 'info of album and image url',
    },
    payment: makePayment,
    upload: {
      uploadPlaylist: uploadPlaylist,
      uploadSongs: uploadSongsWithAlbum,
    },
    search: {
      fetchSongs: fetchSongs,
      fetchAlbums: fetchAlbums
    },
    home: {
      fetchNewSongs: fetchNewestSongs,
      fetchTopSongs: fetchTopSongs,
      fetchRapSongs: fetchRapSongs,
      fetchRBSongs: fetchRBSongs,
      fetchPopSongs: fetchPopSongs,
      fetchKPopSongs: fetchKPopSongs,
      fetchLatinSongs: fetchLatinSongs,
      fetchAlternativeSongs: fetchAlternativeSongs,
      fetchClassicalSongs: fetchClassicalSongs,
      fetchJazzSongs: fetchJazzSongs,
      fetchElectronicSongs: fetchElectronicSongs,
      fetchCountrySongs: fetchCountrySongs,
      fetchRockSongs: fetchRockSongs,
      fetchUserLikedSongs: fetchUserLikedSongs,
    },
    card: {
      addCard: addCard,
      PrevTransactions: getPurchaseHistory,
      createTransaction: createTransaction,
      fetchCardDetails:fetchCardDetails,
    },
    subscription: {
      updateSubscription: updateSubscription,
      cancelSubscription: cancelSubscription,
      restoreSubscription: restoreSubscription
    },
    admin: {
      music: retrieveAllSongs,
      users: retrieveAllUsers,
      artists: retrieveAllArtists,
    },
    artist: {
      artistProfile: (req, res) => 'artistProfile',
      artistSetup: addArtistName,
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
  const currentPath = decodeURI(currentUrl.pathname);
  const currentDirectory = path.dirname(currentPath);
  const filePath = path.join(currentDirectory, '..', req.url); // Adjust the path as needed
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
  try {
    // Check if the request URL starts with '/uploads/'
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
