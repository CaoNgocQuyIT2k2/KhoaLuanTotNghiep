import axios from 'axios';

export default async function handler(req, res) {
  // Thiết lập CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Xử lý yêu cầu API
  try {
    const token = req.headers.authorization; // Lấy token từ header Authorization
    console.log("token", token);

    const response = await axios.get('http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080/api/v1/pending/get-all-pending',
    { headers: { Authorization: token } }
    );
    const data = response.data;
    console.log("data", data);
    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      throw new Error('Unexpected status code from API');
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
}
