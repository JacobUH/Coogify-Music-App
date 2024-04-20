import multer from 'multer';
import {
  baseURL,
  storage,
  upload,
} from '../../backend_util/util/uploadUtilFunctions.js';
import { extractUserID } from '../../backend_util/util/utilFunctions.js';
import { insertPlaylist } from '../../backend_util/database/queries/dbFileQueries.js';
import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../middlewares/authenticate.js';
import backendBaseUrl from '../../src/apiConfig.js';

dotenv.config();

// Define the base URL where files will be served
const baseURL = backendBaseUrl;

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
