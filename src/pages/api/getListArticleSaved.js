// src/pages/api/GetChildCategories.js
import axios from 'axios';

export default async function GetListArticleSaved(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');


  // Handle API request
  try {
    const token = req.headers.authorization; // Extract token from Authorization header

    const response = await axios.get('http://localhost:8080/api/v1/saved-articles/get-list',
    { headers: { Authorization: token } }
    );
    const data = response.data;
    console.log("🚀 ~ saved article data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error save article:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
