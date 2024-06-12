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
    const response = await axios.get(`http://localhost:8080/api/v1/VoteStar/get-average-star?articleId=${articleId}`);

    if (response.status === 200) {
      res.status(200).json({ averageStar: response.data });
    } else {
      res.status(response.status).json({ message: 'Failed to fetch average star.' });
    }
  } catch (error) {
    console.error('Error fetching average star:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
