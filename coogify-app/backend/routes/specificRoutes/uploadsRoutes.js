import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import {
  insertSongWithCover,
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

export async function uploadThing(req, res, next) {
  upload.fields([{ name: 'file', maxCount: 2 }])(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error: ', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('File upload failed');
    } else if (err) {
      console.error('Unknown error: ', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('File upload failed');
    } else {
      console.log('Files uploaded successfully');

      // Get the URLs of the uploaded files
      const fileURLs = req.files['file'].map(
        (file) => baseURL + file.originalname
      );

      // Save file metadata to the database
      const userID = extractUserID(req);
      const { playlistName, playlistDescription } = req.body; // if uploading a playlist
      const { genreName, songName } = req.body; // if uploading a song

      let inserted = false;

      // Check if a song was uploaded
      if (genreName && songName) {
        // Extract artist ID
        const artistID = await extractArtistID(req);
        console.log(artistID);

        // Insert song with cover art and mp3 file URLs
        inserted = await insertSongWithCover(
          artistID,
          genreName,
          songName,
          fileURLs[0],
          fileURLs[1]
        );
      }
      // Check if a playlist was uploaded
      else if (playlistName) {
        // Insert playlist with cover art URL
        inserted = await insertPlaylist(
          userID,
          playlistName,
          fileURLs[0],
          playlistDescription
        );
      }

      // if upload was successful
      if (inserted) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Files uploaded successfully');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File upload to db failed');
      }
    }
  });
}

// handles uploading for both songs and playlists
// export async function uploadThing(req, res, next) {
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
//       const userID = extractUserID(req);
//       const { playlistName, playlistDescription } = req.body; // if uploaded playlist
//       const { genreName, songName } = req.body; // if uploaded song
//       let inserted = false;
//       // playlist was uploaded
//       if (playlistName !== null)
//         inserted = await insertPlaylist(
//           userID,
//           playlistName,
//           fileURL,
//           playlistDescription
//         );
//       // song was uploaded
//       else if (genreName !== null && songName !== null){
//         const artistID = await extractArtistID(req);
//         inserted = await insertSong(artistID, genreName, songName, fileURL);
//       }
//       // if upload was successful
//       if (inserted) {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('File uploaded successfully');
//       } else {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('File upload to db failed');
//       }
//     }
//   });
// }
