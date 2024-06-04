import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/getAllCategories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      });
  }, []);

  const categoryOptions = categories.map(category => (
    <Select.Option key={category.id} value={category.id}>
      {category.name}
    </Select.Option>
  ));

  return (
    <Form.Item label="Chuyên mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn chuyên mục!' }]}>
      <Select>
        {categoryOptions}
      </Select>
    </Form.Item>
  );
};

export default Category;
