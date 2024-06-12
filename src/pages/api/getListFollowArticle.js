// src/pages/api/GetChildCategories.js
import axios from 'axios';

export default async function getListFollowCategory(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');


  // Handle API request
  try {
    const token = req.headers.authorization; // Extract token from Authorization header

    const response = await axios.get('http://localhost:8080/api/v1/follow-category/get-followed-articles',
    { headers: { Authorization: token } }
    );
    const data = response.data;
    console.log("🚀 ~ get follow categories data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error get follow categories:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
