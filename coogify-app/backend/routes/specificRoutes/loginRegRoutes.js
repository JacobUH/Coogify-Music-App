import * as logregq from '../../database/queries/dbLoginRegQueries.js';

export async function register(req, res, params) {
  console.log(params);
  const { firstName, lastName, email, password } = params;
  if (
    email === undefined ||
    password === undefined ||
    firstName === undefined ||
    lastName === undefined
  ) {
    console.log(
      `one or more parameters are undefined: [${email}, ${password}, ${firstName}, ${lastName}]`
    );
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'One or more parameters are missing.' }));
    return;
  }

  try {
    if (logregq.registerUser(email, password, firstName, lastName)) {
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'User registered successfully.' }));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Failed to register user.' }));
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
