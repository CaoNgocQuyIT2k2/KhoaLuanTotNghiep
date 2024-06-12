import multer from 'multer';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads'; // Thư mục lưu trữ file tải lên
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing để xử lý file upload
  },
};

export default async function updateAvatar(req, res) {
  // Cấu hình CORS headers cho tất cả các phản hồi
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    // Xử lý preflight request
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  // Sử dụng middleware multer để xử lý file upload
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ message: 'Error uploading file' });
      return;
    } else if (err) {
      res.status(500).json({ message: 'Unknown error' });
      return;
    }

    const file = req.file;
    const token = req.headers.authorization; // Extract token từ Authorization header
    console.log("token: " + token);
    if (!file || !token) {
      res.status(400).json({ message: 'File and authorization token are required' });
      return;
    }

    const filePath = file.path; // Đường dẫn tới file tải lên

    // Tiếp tục xử lý như trong mã gốc của bạn
    try {
      const response = await axios.post('http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/user/update-user-avatar', 
        { file: fs.createReadStream(filePath) },
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: token } }
      );
      const data = response.data;
      if (response.status === 200) {
        res.status(200).json(data);
      } else {
        throw new Error('Unexpected status code from API');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        res.status(error.response.status).json({ message: error.response.data.message });
      } else {
        res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau.' });
      }
    }
  });
}
