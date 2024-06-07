// pages/api/vote-star.js
import axios from 'axios';

export default async function ReactArticle(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Authorization'
  };

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { article, typeReact } = req.body;
      const token = req.headers.authorization;

      // Kiểm tra body của request
      if (!article || !article.id || !typeReact) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/api/v1/react-emotion/react',
        { article, typeReact },
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        res.status(200).json({ message: 'Đánh giá thành công!' });
      } else {
        res.status(response.status).json({ message: 'Đánh giá thất bại.' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        res.status(403).json({ message: 'Unauthorized' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
