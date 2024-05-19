// Trong tệp `middleware.js`
import Cors from 'cors';

// Khởi tạo middleware CORS
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
});

// Mã middleware để xử lý tất cả các yêu cầu API
export default function handler(req, res, next) {
  return cors(req, res, next);
}
