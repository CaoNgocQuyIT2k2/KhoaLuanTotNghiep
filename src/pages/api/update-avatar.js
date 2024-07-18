import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from '@aws-sdk/client-s3';
import axios from 'axios';

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing để xử lý file upload
  },
};

export default async function handler(req, res) {
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

  // // Sử dụng middleware multer để xử lý file upload
  // upload.single('file')(req, res, async (err) => {
  //   if (err instanceof multer.MulterError) {
  //     res.status(500).json({ message: 'Error uploading file' });
  //     return;
  //   } else if (err) {
  //     res.status(500).json({ message: 'Unknown error' });
  //     return;
  //   }

    const file = req.file;
    console.log("file", file);
    const token = req.headers.authorization; // Extract token từ Authorization header

    if (!file || !token) {
      res.status(400).json({ message: 'File and authorization token are required' });
      return;
    }

    // URL của file đã tải lên trên S3
    const fileUrl = file.location;

    // Tiếp tục xử lý như trong mã gốc của bạn
    try {
      const response = await axios.post(
        'http://ec2-3-106-226-159.ap-southeast-2.compute.amazonaws.com:8080/api/v1/user/update-user-avatar', 
        { file: fileUrl },
        { headers: { Authorization: token } }
      );

      const data = response.data;
      if (response.status === 200) {
        res.status(200).json(data);
      } else {
        throw new Error('Unexpected status code from API');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response?.data?.message) {
        res.status(error.response.status).json({ message: error.response?.data?.message });
      } else {
        res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau.' });
      }
    }
  }

