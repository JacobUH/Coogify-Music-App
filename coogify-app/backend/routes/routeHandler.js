// Import necessary modules
import fs from 'fs';
import path from 'path';
import { jsonParser, authenticate } from '../middlewares/middleware.js';
import { register, login } from './specificRoutes/loginRegRoutes.js';
import { uploadThing } from './specificRoutes/uploadsRoutes.js';
import { getSong } from './specificRoutes/playSongRoutes.js';
import { addArtistName } from './specificRoutes/artistRoutes.js';
import { fetchNewestSongs } from './specificRoutes/homeRoutes.js';

// Define the handlers object
const handlers = {
  api: {
    register: register,
    setup: (req, res) => 'setup',
    login: login,
    fetch: {
      song: getSong,
      album: (req, res) => 'info of album and image url',
    },
    upload: {
      uploadSingle: uploadThing,
      uploadMultiple: (req, res) => 'uploadAlbum',
    },
    home: {
      fetchNewSongs: fetchNewestSongs,
      fetchTopSongs: (req, res) => 'fetchTopSongs',
      fetchUserLikedSongs: (req, res) => 'fetchUserLikedSongs',
    },
    landing: (req, res) => 'landing',
    admin: {
      modArtist: (req, res) => 'modArtist',
      modUser: (req, res) => 'modUser',
      viewTransactions: (req, res) => 'viewTransactions',
    },
    artist: {
      artistProfile: (req, res) => 'artistProfile',
      artistSetup: addArtistName,
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

// // requestHandler.js
// import { jsonParser, authenticate } from '../middlewares/middleware.js';
// import { register, login } from './specificRoutes/loginRegRoutes.js';
// import { uploadSong } from './specificRoutes/uploadsRoutes.js';
// const handlers = {
//   api: {
//     register: register,
//     setup: (req, res) => 'setup',
//     login: login,
//     upload: {
//       uploadSong: uploadSong,
//       uploadAlbum: (req, res) => 'uploadAlbum',
//     },
//     home: {
//       fetchNewSongs: (req, res) => 'fetchNewSongs',
//       fetchTopSongs: (req, res) => 'fetchTopSongs',
//       fetchUserLikedSongs: (req, res) => 'fetchUserLikedSongs',
//     },
//     landing: (req, res) => 'landing',
//     admin: {
//       modArtist: (req, res) => 'modArtist',
//       modUser: (req, res) => 'modUser',
//       viewTransactions: (req, res) => 'viewTransactions',
//     },
//     artist: {
//       artistProfile: (req, res) => 'artistProfile',
//     },
//   },
// };

// // Function to handle the request
// export async function handleRequest(req, res) {
//   try {
//     // Call the jsonParser middleware to parse JSON request body
//     await jsonParser(req, res, async () => {
//       // Call the authenticate before further processing
//       await authenticate(req, res, async () => {
//         const { method, url } = req;
//         const [path, queryString] = url.split('?');
//         const segments = path.split('/').filter(Boolean);
//         console.log(segments);
//         let current = handlers;

//         // Traverse route structure
//         for (const segment of segments) {
//           if (typeof current === 'object' && current.hasOwnProperty(segment)) {
//             current = current[segment];
//           } else {
//             res.writeHead(404, { 'Content-Type': 'text/plain' });
//             res.end(`No handler found for ${path}`);
//             return;
//           }
//         }

//         // Check if the current object is a handler function
//         if (typeof current === 'function') {
//           console.log(current);

//           // For POST requests, pass the parsed data directly to the handler function
//           if (method === 'POST') {
//             // req.body is already populated by jsonParser middleware
//             current(req, res); // Pass the request and response objects directly
//           } else {
//             // For GET requests, pass the query parameters to the handler function
//             const params = {};
//             if (queryString) {
//               const queryParams = new URLSearchParams(queryString);
//               for (const [key, value] of queryParams) {
//                 params[key] = value;
//               }
//             }
//             current(req, res, params); // Pass the query parameters to the handler function
//           }
//         } else {
//           res.writeHead(404, { 'Content-Type': 'text/plain' });
//           res.end(`No handler function found for ${path}`);
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Error handling request:', error);
//     res.writeHead(500, { 'Content-Type': 'text/plain' });
//     res.end('Internal server error');
//   }
// }
