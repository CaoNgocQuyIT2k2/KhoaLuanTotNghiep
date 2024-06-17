import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';

const Category = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SHOW_SPINNER });
    axios.get('/api/get-all-categories')
      .then(response => {
        setCategories(response.data);
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 3000);
      })
      .catch(error => {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
          message.error(error.response?.data?.message);
        }, 3000);
      });
  }, [dispatch]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const categoryOptions = categories.map(category => (
    <Select.Option key={category.id} value={category.id}>
      {category.name}
    </Select.Option>
  ));

  return (
    <Form.Item label="Chuyên mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn chuyên mục!' }]}>
      <Select onChange={handleCategoryChange}>
        {categoryOptions}
      </Select>
    </Form.Item>
  );
};

export default Category;
