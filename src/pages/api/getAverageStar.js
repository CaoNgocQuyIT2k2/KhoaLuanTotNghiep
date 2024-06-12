import axios from "axios";

export default async function GetAverageStar(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { articleId } = req.query;
  console.log("articleId: " + articleId);
  if (!articleId) {
    res.status(400).json({ message: 'articleId is required' });
    return;
  }

  try {
    const response = await axios.get(`http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/vote-star/get-average-star?articleId=${articleId}`);
    const data = response.data;
    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      throw new Error('Unexpected status code from API');
    }
  } catch (error) {
    console.error('Error fetching average star:', error);
    console.log("Lấy thất bại sao trung bình");
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
