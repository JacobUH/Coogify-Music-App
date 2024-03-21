import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { addSong } from '../../database/queries/dbUploadQueries.js';

// Define the base URL where files will be served
const baseURL = 'http://localhost:3001/uploads/';

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

// Define the uploadSong function
export async function uploadSong(req, res, next) {
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
      const { artistName, genreName, songName } = req.body;
      if (addSong(artistName, genreName, songName, fileURL)) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded successfully');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File upload to db failed');
      }
    }
  });
}
