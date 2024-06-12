import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message, Select } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Option } = Select;

const AddCategory = ({ fetchCategories }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [parentId, setParentId] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const token = useSelector((state) => state.user?.token);

  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const fetchParentCategories = async () => {
    try {
      const response = await axios.get(`/api/GetParentCategories`);
      setParentCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };

  const showModalHandler = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSecondNameChange = (e) => {
    setSecondName(e.target.value);
  };

  const handleSelectParent = (value) => {
    setParentId(value);
  };

  const handlAddCategory = async () => {
    try {
      if (!user.id) {
        console.error("User information is missing");
        return;
      }

      const requestBody = { name: categoryName };
      if (secondName) {
        requestBody.second_name = secondName;
      }
      if (parentId) {
        requestBody.parent = { id: parentId };
      }

      const response = await axios.post(`/api/CreateCategory`, requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Thêm chuyên mục thành công");
      fetchCategories();
      setOpen(false);
    } catch (error) {
      console.error("Error adding category:", error.response);
      message.error("Thêm chuyên mục thất bại");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModalHandler} className='bg-green-500 mb-3 text-white'>
        Thêm 
      </Button>
      <AntModal
        visible={open}
        title="Thêm mới chuyên mục"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Trở về
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handlAddCategory}>
            Đồng ý
          </Button>,
        ]}
      >
        <Input
          placeholder="Category Name"
          value={categoryName}
          onChange={handleChange}
          style={{ marginBottom: '15px' }}
        />
        <Input
          placeholder="Second Name"
          value={secondName}
          onChange={handleSecondNameChange}
          style={{ marginBottom: '15px' }}
        />
        <Select
          placeholder="Select Parent Category"
          style={{ width: '100%', marginBottom: '15px' }}
          value={parentId}
          onChange={handleSelectParent}
        >
          <Option value={null}>None</Option>
          {parentCategories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </AntModal>
    </>
  );
};

export default AddCategory;
