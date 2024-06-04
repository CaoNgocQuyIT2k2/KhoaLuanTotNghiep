import axios from 'axios';

export default async function EditorHandleReject(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { articleId } = req.query; // Extract article ID from query parameters
      const token = req.headers.authorization; // Extract token from Authorization header

      const response = await axios.post(
        `http://localhost:8080/api/v1/article/refuse-article?articleId=${articleId}`,
        {},
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        res.status(200).json({ message: 'Từ chối bản thảo thành công!' });
      } else {
        res.status(response.status).json({ message: 'Từ chối bản thảo thất bại.' });
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
