import http from "http";
import { handleRequest } from "../routes/routeHandler.js";
// import { handleRequest } from "./requestHandler.js";

// Function to initialize the server
export default function initializeServer() {
  // Create a custom HTTP server
  const server = http.createServer((req, res) => {
    // Pass the request and response objects to the request handler
    handleRequest(req, res);
  });

  return server;
}
