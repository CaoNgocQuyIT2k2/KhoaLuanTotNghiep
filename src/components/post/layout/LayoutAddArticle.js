import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Button, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { BsArrowBarLeft } from 'react-icons/bs';
import Category from '../post-format/elements/Category';
import AllTag from '../post-format/elements/AllTag';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';

const LayoutAddArticle = () => {
    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [form] = Form.useForm();
    const user = useSelector((state) => state.user?.user);
    const token = useSelector((state) => state.user?.token);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleFormSubmit = async (values) => {
        try {
            if (!user) {
                message.error('Bạn cần đăng nhập để thực hiện hành động này.');
                window.location.href = '/login';
                return;
            }

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('abstracts', values.abstracts);
            formData.append('content', content);
            formData.append('category', JSON.stringify({ id: values.category }));

            // Append tags if they exist
            if (selectedTags && selectedTags.length > 0) {
                const tagList = selectedTags.map(tagId => ({ id: tagId }));
                formData.append('tag', JSON.stringify({ tagList }));
            }
             else {
                formData.append('tag', 'null');
            }

            if (fileList.length > 0) {
                formData.append('image', fileList[0].originFileObj);
            }

            // Log form data for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            console.log("formData: " + formData);
            const response = await axios.post(
                '/api/CreateArticle',
                formData,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 200) {
                message.success('Dữ liệu đã được gửi thành công');
                window.location.href = '/';
            } else {
                message.error('Đã có lỗi xảy ra khi gửi dữ liệu');
            }
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error.message);
            message.error('Đã có lỗi xảy ra khi gửi dữ liệu');
        }
    };

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <div style={{ padding: '10px', margin: 'auto', width: '1000px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', cursor: 'pointer' }}>
                <h1 style={{ fontWeight: '600', fontSize: '20px' }}>
                    <Link href='/writter/WritterDashboard' className='back_home'>
                        <BsArrowBarLeft />
                    </Link>
                </h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ fontWeight: '600', fontSize: '20px' }}>
                    THÊM BÀI VIẾT MỚI
                </h1>
            </div>
            <Form
                form={form}
                className='container mt-5'
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 100 }}
                layout='horizontal'
                style={{ width: 900 }}
                onFinish={handleFormSubmit}
            >
                <Form.Item label='Tiêu đề' name='title' rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Mô tả' name='abstracts' rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                    <Input />
                </Form.Item>
                <Category />
                <AllTag selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

                <Form.Item label='Nội dung' name='content' rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                    <ReactQuill style={{ height: '260px' }} value={content} onChange={setContent} />
                </Form.Item>
                <Form.Item style={{ paddingTop: '30px' }} label='Upload' name='file' valuePropName='fileList' getValueFromEvent={normFile} >
                    <Upload listType='picture-card' fileList={fileList} onChange={handleFileChange}>
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item style={{ margin: 'auto', paddingBottom: '30px' }} wrapperCol={{ offset: 3 }}>
                    <Button
                        style={{ color: 'black', border: '1px solid black', padding: '0  20px', borderRadius: '5px', transition: 'background-color 0.3s', width: '100%' }}
                        type='primary'
                        htmlType='submit'
                        className='submitArticle'
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(21, 197, 30, 0.55)')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                    >
                        Hoàn tất
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LayoutAddArticle;
