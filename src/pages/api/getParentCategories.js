// src/pages/api/GetParentCategories.js
import axios from 'axios';

export default async function fetchParentCategories(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Handle API request
  try {
    const response = await axios.get('http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/category/anonymous/get-all-parent');
    const data = response.data;
    console.log("🚀 ~ parent categories data:", data);
    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      throw new Error('Unexpected status code from API');
    }
  } catch (error) {
    console.log("🚀 ~ error fetching parent categories:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
