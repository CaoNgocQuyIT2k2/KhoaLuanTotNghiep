import axios from 'axios';
import FormData from 'form-data';

export default async function CreateArticle(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, abstracts, content, category, tag } = req.body;
            const token = req.headers.authorization;

            if (!title || !abstracts || !content || !category) {
                res.status(400).json({ message: 'Invalid request body' });
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('abstracts', abstracts);
            formData.append('content', content);
            formData.append('category', category);

            if (tag) {
                formData.append('tag', tag);
            }

            if (req.file) {
                const allowedTypes = ['image/jpeg', 'image/png'];
                if (!allowedTypes.includes(req.file.mimetype)) {
                    res.status(400).json({ message: 'Invalid file type. Only JPEG and PNG are allowed.' });
                    return;
                }
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (req.file.size > maxSize) {
                    res.status(400).json({ message: 'File size exceeds the limit of 5MB.' });
                    return;
                }
                formData.append('image', req.file.buffer, req.file.originalname);
            }

            const response = await axios.post(
                'http://ec2-18-143-143-173.ap-southeast-1.compute.amazonaws.com:8080/api/v1/article/create',
                formData,
                { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } }
            );
            const data = response.data;
            if (response.status === 200) {
                res.status(200).json(data);
              } else {
                throw new Error('Unexpected status code from API');
              }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 403) {
                res.status(403).json({ message: 'Unauthorized' });
            } else {
                res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
            }
        }
    } else {
        res.status(405).json({ message: 'Phương thức không được phép' });
    }
}
