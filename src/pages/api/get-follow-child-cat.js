import axios from 'axios';

export default async function handler(req, res) {
  // Set up CORS headers (should be set outside of try-catch block)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  const { categoryId } = req.query;
  const token = req.headers.authorization; // Extract token from Authorization header

  console.log("Kiểm tra việc truyền article_id vào PostFormatStandard1", categoryId);

  // Handle API request
  try {
    const response = await axios.get(
      `http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/follow-category/get-followed-child-cat?categoryId=${categoryId}`,
      { headers: { Authorization: token } }
    );
    
    const data = response.data;
    console.log("🚀 ~ data:", data);

    // Send response only once
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
