// src/pages/api/GetArtDetail.js
import axios from 'axios';

export default async function fetchArticleDetail(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  const { article_id } = req.query;
  console.log("Kiểm tra việc truyền article_id vào PostFormatStandard1",article_id);
  // Handle API request
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/article/anonymous/get-detail-art?articleId=${article_id}`);
    const data = response.data;
    console.log("🚀 ~ data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
