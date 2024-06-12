import axios from 'axios';

export default async function handler(req, res) {
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

  if (req.method === 'GET') {
    try {
      // Lấy dữ liệu từ query string
      const { keyList } = req.query;
      console.log("keyList", keyList);

      // Kiểm tra tính hợp lệ của dữ liệu
      if (!keyList || keyList.length === 0) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
      }

      // Gọi API tìm kiếm từ server 8080 bằng phương thức GET
      const response = await axios.get(
        'http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/article/anonymous/search',
        { params: { keyList } }
      );
      const data = response.data;
      // Xử lý kết quả trả về từ server 8080
      if (response.status === 200) {
        res.status(200).json(data);
      } else {
        throw new Error('Unexpected status code from API');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
