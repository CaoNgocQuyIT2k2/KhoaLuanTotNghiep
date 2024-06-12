import axios from 'axios';

export default async function GetSavedArticle(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  
  const token = req.headers.authorization; // Extract token from Authorization header
  const { articleId } = req.query;
console.log("articleId",articleId);

  try {
    const response = await axios.get(`http://localhost:8080/api/v1/saved-articles/get-one?articleId=${articleId}`, 
      { headers: { Authorization: token } }
    );
    const data = response.data;
    console.log("🚀 ~ data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error fetching articles:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
