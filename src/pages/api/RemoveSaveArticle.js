import axios from 'axios';

export default async function RemoveSaveArticle(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const { articleId } = req.body;
      const token = req.headers.authorization; // Lấy token từ header
      console.log("token: ", articleId);

      if (!articleId) {
        res.status(400).json({ message: 'Invalid request params' });
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/v1/saved-articles/remove?articleId=${articleId}`,
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        res.status(200).json({ message: 'Xóa bài đã lưu thành công!' });
      } else {
        res.status(response.status).json({ message: 'Xóa bài đã lưu thất bại.' });
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
