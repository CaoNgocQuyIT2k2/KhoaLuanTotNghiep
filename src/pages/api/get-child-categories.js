// src/pages/api/GetChildCategories.js
import axios from 'axios';

export default async function handler(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  const { categoryId } = req.query;

  // Handle API request
  try {
    const response = await axios.get('http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080/api/v1/category/anonymous/get-child', {
      params: { categoryId }
    });
    const data = response.data;

    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      throw new Error('Unexpected status code from API');
    }
  } catch (error) {

    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
}
