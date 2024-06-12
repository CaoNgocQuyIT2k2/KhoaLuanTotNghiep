// src/pages/api/GetChildCategories.js
import axios from 'axios';

export default async function fetchChildCategories(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  const { categoryId } = req.query;

  // Handle API request
  try {
    const response = await axios.get('http://localhost:8080/api/v1/category/anonymous/get-child', {
      params: { categoryId }
    });
    const data = response.data;
    console.log("🚀 ~ child categories data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error fetching child categories:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
