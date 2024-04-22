import fs from 'fs';
import path from 'path';

// for serving files in uploads folder
export default async function handler(req, res) {
  const currentUrl = new URL(import.meta.url);
  const currentPath = decodeURI(currentUrl.pathname);
  const currentDirectory = path.dirname(currentPath);
  const decodedUrl = decodeURIComponent(req.url); // Decode URI component to replace %20 with spaces
  const filePath = path.join(currentDirectory, '..', decodedUrl); // Adjust the path as needed
  console.log('filepath: ', filePath);
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
