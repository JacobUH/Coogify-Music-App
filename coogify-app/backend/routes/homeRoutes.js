import { testQuery } from '../database/queries/dbAdminQueries.js';

// Function to handle the home route
export function handleHomeRoute(req, res, params) {
  // Set the response content type to JSON
  const { id } = params;
  res.setHeader('Content-Type', 'application/json');
  try {
    // Call the testQuery function to retrieve data from the database
    testQuery(id).then((data) => {
      // Send the retrieved data as JSON response
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    });
  } catch (error) {
    // Handle errors if any
    console.error('Error retrieving data from the database:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
