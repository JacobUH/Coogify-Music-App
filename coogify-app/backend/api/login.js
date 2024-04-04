import bcrypt from "bcrypt";
import * as logregq from "../database/queries/dbLoginRegQueries.js";
import { hashPassword } from "../util/utilFunctions.js";
import { getUserFromEmail } from "../database/queries/dbUserQueries.js";
import { createSession } from "../Session/sessionManager.js";
import { deleteSession } from "../database/queries/dbAuthQueries.js";
import jsonParserMiddleware from  "../middlewares/jsonParser.js";
import hashPasswordMiddleware from "../middlewares/hashPassword.js";
import authenticateMiddleware from "../middlewares/authenticate.js";

export default async function handler(req, res) {
  jsonParserMiddleware(req, res);
  hashPasswordMiddleware(req, res);
  authenticateMiddleware(req, res);
  const { email, password } = req.body;

  try {
    // Retrieve hashed password from the database based on the provided email
    const hashedPasswordFromDB = await logregq.getPasswordByEmail(email);

    // If no hashed password found or any other error, return error response
    if (hashedPasswordFromDB === null) {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Invalid email or password");
      return;
    }

    // Compare the provided password with the hashed password from the database
    const hashedInput = await hashPassword(password);
    const isPasswordMatch = bcrypt.compare(hashedInput, hashedPasswordFromDB);

    if (!isPasswordMatch) {
      // If passwords do not match, return error response
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Invalid email or password");
      return;
    }

    // Passwords match, user successfully authenticated
    try {
      deleteSession(getUserFromEmail(email));
      const session = await createSession(getUserFromEmail(email));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Login successful", sessionID: session })
      );
    } catch (err) {
      console.error("failed to update session during login");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal server error");
  }
}
