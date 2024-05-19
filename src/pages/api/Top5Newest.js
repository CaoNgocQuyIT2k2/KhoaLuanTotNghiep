// pages/api/top6ReactArticle.js
import axios from 'axios';


export default async function fetchTop5Newest(req, res) {
  // Thiết lập CORS header
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Xử lý yêu cầu API
  try {
    const response = await axios.get("http://localhost:8080/api/v1/article/anonymous/get-top5-newest");
    const data = response.data;
    console.log("🚀 ~ data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}