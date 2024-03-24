// Import necessary modules
import fs from 'fs';
import path from 'path';
import { jsonParser, authenticate } from '../middlewares/middleware.js';
import { register, login } from './specificRoutes/loginRegRoutes.js';
import {
  uploadPlaylist,
  uploadSongsWithAlbum,
} from './specificRoutes/uploadsRoutes.js';
import { getSong } from './specificRoutes/playSongRoutes.js';
import { addArtistName } from './specificRoutes/artistRoutes.js';
import {
  fetchNewestSongs,
  fetchTopSongs,
  fetchRapSongs,
  fetchRBSongs,
} from './specificRoutes/homeRoutes.js';
import { makePayment } from './specificRoutes/subscriptionRoutes.js';
import {
  retrieveAllArtists,
  retrieveAllUsers,
  retrieveAllSongs,
} from './specificRoutes/adminRoutes.js';

// CHECKLIST:
// /api/setup page

// Define the handlers object
const handlers = {
  api: {
    register: register, // need
    setup: (req, res) => 'setup',
    login: login, // need
    fetch: {
      song: getSong, // need
      album: (req, res) => 'info of album and image url',
    },
    payment: makePayment,
    upload: {
      uploadPlaylist: uploadPlaylist, // need
      uploadSongs: uploadSongsWithAlbum, // need
    },
    home: {
      fetchNewSongs: fetchNewestSongs, // need
      fetchTopSongs: fetchTopSongs, // need
      fetchRapSongs: fetchRapSongs,
      fetchRBSongs: fetchRBSongs,
      fetchUserLikedSongs: (req, res) => 'fetchUserLikedSongs',
    },
    landing: (req, res) => 'landing',
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
