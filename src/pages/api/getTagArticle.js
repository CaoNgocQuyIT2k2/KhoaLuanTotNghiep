// src/pages/api/getArtDetail.js
import axios from 'axios';

export default async function fetchTagArticle(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  const { article_id } = req.query; 
  console.log(" article_id ",article_id);
  // Handle API request
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/tag/anonymous/get-tags-of-art?articleId=${article_id}`);
    const data = response.data;
    console.log("🚀 ~ data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
