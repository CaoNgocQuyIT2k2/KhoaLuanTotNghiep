// pages/api/getLatestDantri.js
import axios from 'axios';

export default async function getInfoMyself(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Handle API request
  try {
    const token = req.headers.authorization; // Extract token from Authorization header
    console.log("token: " + token);
    const response = await axios.get("http://localhost:8080/api/v1/user/get-my-infor",
    { headers: { Authorization: token } }
    );
    const data = response.data;
    console.log("🚀 ~ data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
