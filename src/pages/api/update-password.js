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
      const { oldPassword, newPassword, reEnterPassword } = req.body;
      const token = req.headers.authorization;


      // Validate request body
      if (!oldPassword || !newPassword || !reEnterPassword) {
        res.status(400).json({ message: 'Hãy điền đủ vào những ô còn trống' });
        return;
      }

      // Send request to update password API
      const response = await axios.post(
        `http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080/api/v1/user/update-password`,
        { oldPassword, newPassword, reEnterPassword },
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
      // Log detailed error from backend
      console.error('Error updating password:', error.message);
      if (error.response) {
        console.error('Backend response data:', error.response.data);
        res.status(error.response.status).json({ message: error.response.data });
      } else {
        console.error('No response received from backend');
        res.status(500).json({ message: 'Lỗi hệ thống' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
