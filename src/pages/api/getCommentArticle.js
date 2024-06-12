import axios from 'axios';

export default async function fetchCommentArticle(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    // Handle CORS pre-flight request
    res.status(200).end();
    return;
  }

  const { articleId } = req.query; 
  
  // Handle API request
  try {
    const response = await axios.get(`http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/comment/anonymous/get-parent-comments?articleId=${articleId}`);
    const data = response.data;
    console.log("Data fetched:", data);
    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      throw new Error('Unexpected status code from API');
    }
  } catch (error) {
    console.log("Error fetching data:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
