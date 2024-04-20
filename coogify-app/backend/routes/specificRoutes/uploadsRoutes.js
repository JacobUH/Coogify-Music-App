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

export async function uploadPlaylist(req, res) {
  upload.single('imageFile')(req, res, async (err) => {
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

      // Get the URL of the uploaded image file
      const imageFile = req.file;

      // Check if required file is uploaded
      if (!imageFile) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please upload an image file');
        return;
      }

      // Get other fields from the request body
      const { playlistName, playlistDescription } = req.body;

      // Save file metadata to the database
      const userID = extractUserID(req);

      // Insert playlist with cover art URL
      const inserted = await insertPlaylist(
        userID,
        playlistName,
        baseURL + encodeURIComponent(imageFile.originalname), // Use the image file URL
        playlistDescription
      );

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

export async function uploadSongsWithAlbum(req, res, next) {
  upload.fields([
    { name: 'mp3Files', maxCount: 50 },
    { name: 'imageFile', maxCount: 1 },
  ])(req, res, async (err) => {
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
      const mp3Files = req.files['mp3Files'];
      const imageFile = req.files['imageFile'][0];

      // Check if required files are uploaded
      if (!mp3Files || !mp3Files.length || !imageFile) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please upload at least one MP3 file and one image file');
        return;
      }

      // Map uploaded MP3 files to their URLs and extract song names
      const mp3FileURLs = mp3Files.map(
        (file) => baseURL + encodeURIComponent(file.originalname)
      );
      const songNames = mp3Files.map(
        (file) => path.parse(file.originalname).name
      ); // Extract song names from file names

      // Save file metadata to the database
      const { genreName, albumName } = req.body;

      let inserted = false;

      const artistID = await extractArtistID(req);
      console.log(artistID);

      // Prepend baseURL to image file name
      const imageURL = baseURL + encodeURIComponent(imageFile.originalname);

      // Loop through each song and insert it with the album cover
      for (let i = 0; i < mp3FileURLs.length; i++) {
        inserted = await insertSongWithCover(
          artistID,
          albumName,
          genreName,
          songNames[i],
          mp3FileURLs[i],
          imageURL // Use full URL of the image file
        );

        // Break the loop if insertion fails for any song
        if (!inserted) {
          break;
        }
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
