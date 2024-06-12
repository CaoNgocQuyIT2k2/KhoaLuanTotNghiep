import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message, Select } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { Option } = Select;

const EditCategory = ({ showModal,categoryName, categoryId, parentName, parentId, fetchCategories }) => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user?.token);
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    parentId: '',
    parentName: '',
  });
  const [parentCategories, setParentCategories] = useState([]);

  const user = useSelector((state) => state.user?.user);
console.log("categoryName",categoryName);
  useEffect(() => {
    setCategoryData({
      name: categoryName,
      parentId: parentId,
      parentName: parentName,
    });
  }, [categoryName, parentId, parentName]);

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
    showModal({ categoryId: categoryId });
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e, field) => {
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      [field]: e.target.value,
    }));
  };

  const handleSelectParent = (value) => {
    setCategoryData({
      ...categoryData,
      parentId: value,
      parentName: value ? parentCategories.find((category) => category.id === value).name : null,
    });
  };

  const handleEditCategory = async () => {
    try {
      if (user.role !== "ADMIN") {
        console.error("User information is missing");
        return;
      }

      const requestBody = {
        name: categoryData.name,
      };
console.log("categoryData.parentId",categoryData.parentId);
      // Kiểm tra nếu có parentId thì thêm vào requestBody
      if (categoryData.parentId !== null) {
        requestBody.parent = { id: categoryData.parentId };
      }
console.log("requestBody",requestBody);
      const response = await axios.post(
        `/api/UpdateCategory?categoryId=${categoryId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Cập nhật chuyên mục thành công");
      fetchCategories();
      setOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("Cập nhật chuyên mục thất bại");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModalHandler} className='bg-yellow-500 text-white'>
        Edit
      </Button>
      <AntModal
        visible={open}
        title="Edit Category"
        onOk={handleEditCategory}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            back
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handleEditCategory}>
            Edit
          </Button>,
        ]}
      >
        <Input
          placeholder="Category Name"
          style={{ marginBottom: '15px' }}
          value={categoryData.name}
          onChange={(e) => handleChange(e, 'name')}
        />
        <Select
          placeholder="Select Parent Category"
          style={{ width: '100%', marginBottom: '15px' }}
          value={categoryData.parentId}
          onChange={handleSelectParent}
          disabled={categoryData.parentId === null} // Vô hiệu hóa nếu parentId là null
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

export default EditCategory;
