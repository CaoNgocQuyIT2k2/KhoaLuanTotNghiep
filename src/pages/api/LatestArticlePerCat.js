// pages/api/top6ReactArticle.js
import axios from 'axios';

export default async function fetchLatestArticlePerCat(req, res) {
  try {
    // Thiết lập CORS header
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

    // Xử lý yêu cầu API
    const response = await axios.get("http://localhost:8080/api/v1/article/anonymous/get-latest-per-parent-cat");
    const data = response.data;
    console.log("🚀 ~ data:", data);
    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      throw new Error('Unexpected status code from API');
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

