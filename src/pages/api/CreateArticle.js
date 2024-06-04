// Trong API CreateArticle
import axios from 'axios';
import FormData from 'form-data';

export default async function CreateArticle(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const { title, abstracts, content, category, tag, image } = req.body;
            const token = req.headers.authorization;
          
            if (!title || !abstracts || !content || !category || !tag || !image) {
                res.status(400).json({ message: 'Invalid request body' });
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('abstracts', abstracts);
            formData.append('content', content);
            formData.append('category', JSON.stringify(category));
            formData.append('tag', tag);

            // Check for the file in the request
            if (image) {
                formData.append('image', image[0]);
            }

            const response = await axios.post(
                'http://localhost:8080/api/v1/article/create',
                formData,
                { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 200) {
                res.status(200).json({ message: 'Bài viết được tạo thành công!' });
            } else {
                res.status(response.status).json({ message: 'Tạo bài viết thất bại.' });
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
