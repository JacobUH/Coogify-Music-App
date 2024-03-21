import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { addSong } from '../../database/queries/dbUploadQueries.js';


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

      // Construct the file path
      const filePath = path.resolve('./uploads', req.file.originalname);

      // Save file metadata to the database
      const { artistName, genreName, songName } = req.body;
      if (addSong(artistName, genreName, songName, filePath)) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded successfully');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File upload to db failed');
      }
    }
  });
}

// // Define storage configuration for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve('./uploads')); // Define the destination directory for file uploads
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Define the filename for uploaded files
//   },
// });

// // Initialize multer with the storage configuration
// const upload = multer({ storage: storage });

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

//       // save file metadata to the database
//       const fileName = req.file.fileName;
//       const fileSize = req.file.fileSize;
//       const fileType = req.file.mimetype;
//       const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get directory name using import.meta.url
//       const filePath = path.join(__dirname, '../uploads', fileName); // Correcting the path

//       // Assuming `req` is the request object and `postData` is the parsed JSON object
//       const { albumName, genreName, artistName, songName, releaseDate } =
//         req.body;
//       if (addSong(artistName, genreName, songName, filePath)) {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('File uploaded successfully');
//       } else {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('File upload to db failed');
//       }
//     }
//   });
// }
