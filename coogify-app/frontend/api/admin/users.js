import jsonParserMiddleware from '../../backend_util/middlewares/jsonParser.js';
import authenticateMiddleware from '../../backend_util/middlewares/authenticate.js';
import { selectAllUsers } from '../../backend_util/database/queries/dbAdminQueries.js';

export default async function handler(req, res) {
  jsonParserMiddleware(req, res, async () => {
    authenticateMiddleware(req, res, async () => {
      try {
        const users = await selectAllUsers();
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error }));
      }
    });
  });
}
