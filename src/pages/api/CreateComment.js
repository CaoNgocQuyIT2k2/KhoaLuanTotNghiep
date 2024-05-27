import axios from 'axios';

export default async function CreateComment(req, res) {
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
      const { article, comment, parent } = req.body; // Lấy thông tin bình luận từ request body
      const token = req.headers.authorization; // Lấy token từ header Authorization

      // Kiểm tra xem request body có hợp lệ không
      if (!article || !article.id || !comment) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
      }

      // Gửi yêu cầu tạo bình luận đến API
      const response = await axios.post(
        'http://localhost:8080/api/v1/comment/create',
        { article, comment, parent },
        { headers: { Authorization: token } }
      );

      // Xử lý kết quả trả về từ API
      if (response.status === 200) {
        res.status(200).json({ message: 'Bình luận thành công!' });
      } else {
        res.status(response.status).json({ message: 'Bình luận thất bại.' });
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
