import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, parentId } = req.body;
      const { categoryId } = req.query;
      const token = req.headers.authorization;




      // Construct the request body
      const requestBody = {
        name: name,
      };

      // Kiểm tra nếu có parentId thì thêm vào requestBody
      if (parentId) {
        requestBody.parent = { id: parentId };
      }



      // Send request to update tag API
      const response = await axios.post(
        `http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/category/update?categoryId=${categoryId}`,
        requestBody,
        { headers: { Authorization: token } }
      );
      const data = response.data;
      // Handle response from API
      if (response.status === 200) {
        res.status(200).json(data);
      } else {
        throw new Error('Unexpected status code from API');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        res.status(403).json({ message: 'Bạn cần đăng nhập để thực hiện chức năng này'});
      } else {
        res.status(500).json({ message: 'Lỗi hệ thống' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
