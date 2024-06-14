import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  const { categoryId } = req.query;
  const token = req.headers.authorization; // Extract token from Authorization header


  if (!categoryId) {
    return res.status(400).json({ message: 'categoryId is required' });
  }

  try {
    const response = await axios.get(`http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/article/get-saved-by-cat?categoryId=${categoryId}`,
      { headers: { Authorization: token } }
    );
    const data = response.data;

    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      throw new Error('Unexpected status code from API');
    }
  } catch (error) {

    res.status(500).json({ message: 'Internal Server Error' });
  }
}
