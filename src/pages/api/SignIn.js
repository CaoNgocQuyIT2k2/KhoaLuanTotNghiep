import axios from 'axios';

export default async function handler(req, res) {
  // Set up headers for CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Extract user credentials from the request body
      const { email, password } = req.body;

      // Send POST request to the external API
      const response = await axios.post(
        'http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/auth/sign-in',
        { email, password }
      );

      // Process the response from the external API
      const data = response.data;
      console.log("🚀 ~ data:", data.user);

      // Ensure that the response contains a token
      if (response.status === 200) {
        res.status(200).json(data);
      } else {
        throw new Error('Unexpected status code from API');
      }
      // Return the token in the response
      res.status(200).json({ token: data.token, user: data.user });
    } catch (error) {
      console.error("Error:", error.message || error);

      // Determine the status code based on the error
      const statusCode = error.response ? error.response.status : 500;
      res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
