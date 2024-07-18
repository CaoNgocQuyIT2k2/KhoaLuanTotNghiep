import axios from 'axios';

export default async function handler(req, res) {
  // Set up CORS headers (should be set outside of try-catch block)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  const { categoryId } = req.query;
  const token = req.headers.authorization; // Extract token from Authorization header



  // Handle API request
  try {
    const response = await axios.get(
      `http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080/api/v1/follow-category/get-followed-child-cat?categoryId=${categoryId}`,
      { headers: { Authorization: token } }
    );
    
    const data = response.data;


    // Send response only once
    res.status(200).json(data);
  } catch (error) {

    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
}
