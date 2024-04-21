export default async function jsonParserMiddleware(request, response, next) {
  try {
    if (request.headers['content-type'] === 'application/json') {
      let body = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });

      request.on('end', () => {
        try {
          request.body = JSON.parse(body); // Parse the JSON data and assign it to req.body
          next(); // Call the next middleware or route handler
        } catch (error) {
          console.error('Error parsing JSON:', error);
          response.status(400).send('Invalid JSON data');
        }
      });
    } else {
      // If content type is not JSON, continue to the next middleware or route handler
      next();
    }
  } catch (error) {
    console.error('Error in jsonParser:', error);
    // Call the error handling middleware
    response.status(500).send('Internal Server Error');
  }
}
