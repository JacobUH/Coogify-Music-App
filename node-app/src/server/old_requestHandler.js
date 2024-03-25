import { handleHomeRoute } from "../routes/homeRoutes.js";
import { handleLoginRoute } from "../routes/loginRoutes.js";
import { handleSignUpRoute } from "../routes/signUpRoutes.js";
import * as userQrs from "../database/queries/dbUserQueries.js";
// Function to handle incoming requests
export async function handleRequest(req, res) {
  // Extract the request method and URL
  const { method, url } = req;

  // Route the request based on the URL and method
  console.log(url);
  switch (url) {
    case "/api/home":
      if (method === "GET") {
        console.log("in home");
        handleHomeRoute(req, res);
      } else {
        // Method not allowed for this route
        sendResponse(res, 405, "Method Not Allowed");
      }
      break;
    case "/api/login":
      if (method === "POST") {
        handleLoginRoute(req, res);
      } else {
        // Method not allowed for this route
        sendResponse(res, 405, "Method Not Allowed");
      }
      break;
    case "/api/signup":
      if (method === "POST") {
        handleSignUpRoute(req, res);
      } else {
        // Method not allowed for this route
        sendResponse(res, 405, "Method Not Allowed");
      }
      break;
    default:
      // Route not found
      console.log("not found");
      sendResponse(res, 404, "Not Found");
  }
}

// Helper function to send response with status code and message
function sendResponse(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.end(message);
}
