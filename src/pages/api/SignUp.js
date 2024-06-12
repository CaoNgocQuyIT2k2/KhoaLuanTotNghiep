import axios from 'axios';

export default async function handler(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept'
  };

  if (req.method === 'POST') {
    try {
      // Lấy thông tin người dùng từ request body
      const { firstname, lastname, email, password, dob } = req.body;

      // Gửi request POST đến API khác
      const response = await axios.post(
        'http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/auth/sign-up',
        { firstname, lastname, email, password, dob }, // Truyền dữ liệu từ req.body
        { headers }
      );

      // Xử lý phản hồi từ API khác
      const data = response.data;
      console.log("🚀 ~ data:", data);

      // Trả về kết quả
      if (response.status === 200) {
        res.status(200).json(data);
      } else {
        throw new Error('Unexpected status code from API');
      };
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.data && error.response.data.message === 'Request failed with status code 500') {
        return res.status(400).json({ error: 'Email đã tồn tại' });
      }

      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
