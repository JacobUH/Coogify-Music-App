import { handleHomeRoute } from "./homeRoutes.js";
import * as register from "./userRoutes/registration.js";

const handlers = {
  api: {
    home: handleHomeRoute,
    admin: {
      modArtist: (req, res) => "modArtist",
      modUser: (req, res) => "modUser",
      viewTransactions: (req, res) => "viewTransactions",
    },
    artist: {
      artistProfile: (req, res) => "artistProfile",
    },
    user: {
      login: (req, res) => "login",
      register: register.registerUser,
      userProfile: (reg, res) => "userProfile",
    },
  },
};

// Function to handle the request
export function handleRequest(req, res) {
  const { method, url } = req;
  const [path, queryString] = url.split("?");
  const segments = path.split("/").filter(Boolean);
  console.log(segments);
  let current = handlers;

  // Traverse route structure
  for (const segment of segments) {
    if (typeof current === "object" && current.hasOwnProperty(segment)) {
      current = current[segment];
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`No handler found for ${path}`);
      return;
    }
  }

  // Check if the current object is a handler function
  if (typeof current === "function") {
    console.log(current);

    // For POST requests, parse the request body and pass the parsed data to the handler function
    if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const postData = JSON.parse(body);
          current(req, res, postData); // Pass the parsed data to the handler function
        } catch (error) {
          console.error("Error parsing request body:", error);
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Invalid JSON data");
        }
      });
    } else {
      // For GET requests, pass the query parameters to the handler function
      const params = {};
      if (queryString) {
        const queryParams = new URLSearchParams(queryString);
        for (const [key, value] of queryParams) {
          params[key] = value;
        }
      }
      current(req, res, params); // Pass the query parameters to the handler function
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`No handler function found for ${path}`);
  }
}
