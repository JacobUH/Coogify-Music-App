import { VercelRequest, VercelResponse } from "@vercel/node";
import { extractUserID } from "../util/utilFunctions";
import { insertPayment } from "../database/queries/dbUserQueries";

export default async function handler(req, res) {
  try {
    const userID = await extractUserID(req);
    await insertPayment(userID);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Payment successful");
  } catch (error) {
    console.error("Error paying:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal server error");
  }
}
