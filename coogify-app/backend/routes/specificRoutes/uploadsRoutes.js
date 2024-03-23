import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import {
  insertSong,
  insertPlaylist,
} from '../../database/queries/dbFileQueries.js';
import { extractUserID, extractArtistID } from '../../util/utilFunctions.js';
dotenv.config();

// Define the base URL where files will be served
const baseURL = `http://${process.env.MYSQL_HOST}:${process.env.SERVER_PORT}/uploads/`;

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./uploads')); // Define the destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define the filename for uploaded files
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// handles uploading for both songs and playlists
export async function uploadThing(req, res, next) {
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error: ', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('File upload failed');
    } else if (err) {
      console.error('Unknown error: ', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('File upload failed');
    } else {
      console.log('File uploaded successfully');

      // Construct the file URL by combining the base URL and the filename
      const fileURL = baseURL + req.file.originalname;

      // Save file metadata to the database
      const userID = extractUserID(req);
      const { playlistName, playlistDescription } = req.body; // if uploaded playlist
      const { genreName, songName } = req.body; // if uploaded song
      let inserted = false;
      // playlist was uploaded
      if (playlistName !== null)
        inserted = insertPlaylist(
          userID,
          playlistName,
          fileURL,
          playlistDescription
        );
      // song was uploaded
      else if (genreName !== null && songName !== null){
        const artistID = await extractArtistID(req);
        inserted = insertSong(artistID, genreName, songName, fileURL);
      }

      // if upload was successful
      if (inserted) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded successfully');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File upload to db failed');
      }
    }
  });
}

// // Define the uploadSong function
// export async function uploadSong(req, res, next) {
//   upload.single('file')(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       console.error('Multer error: ', err);
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('File upload failed');
//     } else if (err) {
//       console.error('Unknown error: ', err);
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('File upload failed');
//     } else {
//       console.log('File uploaded successfully');

//       // Construct the file URL by combining the base URL and the filename
//       const fileURL = baseURL + req.file.originalname;

//       // Save file metadata to the database
//       const { artistName, genreName, songName } = req.body;
//       if (insertSong(artistName, genreName, songName, fileURL)) {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('File uploaded successfully');
//       } else {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('File upload to db failed');
//       }
//     }
//   });
// }