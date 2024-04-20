import multer from 'multer';
import { baseURL, storage, upload } from '../../util/uploadUtilFunctions.js';
import { extractArtistID } from '../../util/utilFunctions.js'; // Removed unnecessary import
import { insertSongWithCover } from '../../database/queries/dbFileQueries.js';
import jsonParserMiddleware from '../../middlewares/jsonParser.js';
import authenticateMiddleware from '../../middlewares/authenticate.js';
import path from 'path'; // Added import for path module

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      console.log(req.body);
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

          console.log('MP3 Files:', mp3Files);
          console.log('Image File:', imageFile);

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

          console.log('MP3 File URLs:', mp3FileURLs);
          console.log('Song Names:', songNames);

          // Save file metadata to the database
          const { genreName, albumName } = req.body;

          let inserted = false;

          const artistID = await extractArtistID(req);
          console.log('Artist ID:', artistID);

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
    });
  });
}
