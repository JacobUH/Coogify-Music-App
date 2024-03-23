import http from 'http';
import { handleRequest } from '../routes/routeHandler.js';
// import { handleRequest } from "./requestHandler.js";

// Function to initialize the server
export default function initializeServer() {
  // Create a custom HTTP server
  const server = http.createServer((req, res) => {
    // Pass the request and response objects to the request handler
    // Allow requests from the specified origin
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    // Allow specific headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type',);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      // Respond to preflight request
      res.writeHead(200);
      res.end();
      return;
    }

    handleRequest(req, res);
  });

  return server;
}
