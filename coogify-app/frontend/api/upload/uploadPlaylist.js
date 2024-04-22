import multer from 'multer';
import dotenv from 'dotenv';
import {
  baseURL,
  storage,
  upload,
} from '../../backend_util/util/uploadUtilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { insertPlaylist } from '../../backend_util/database/queries/dbFileQueries.js';
import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';

dotenv.config();

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
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
    });
  });
}
