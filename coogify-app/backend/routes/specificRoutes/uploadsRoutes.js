import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { addSong } from '../../database/queries/dbUploadQueries.js';

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
      console.log('File uploaded succesfully');

      // save file metadata to the database
      const fileName = req.file.fileName;
      const fileSize = req.file.fileSize;
      const fileType = req.file.mimetype;
      const filePath = path.join(__dirname, '../../uploads', filename);
      // Assuming `req` is the request object and `postData` is the parsed JSON object
      const { albumName, genreName, artistName, songName, releaseDate } =
        req.body;
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
