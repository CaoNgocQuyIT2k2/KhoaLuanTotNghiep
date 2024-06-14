import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddTag = ({ articleName, fetchTags }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tagName, setTagName] = useState('');
  const user = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    // Set the tagName when the articleName changes
    setTagName(articleName);
  }, [articleName]);

  const showModalHandler = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTagName(e.target.value);
  };

  const handleAddTag = async () => {
    try {
      if (user.role !== "ADMIN") {
        console.error("User information is missing or insufficient permissions");
        return;
      }

      const response = await axios.post(`/api/create-tag`, {
        value: tagName,
      }, { headers: { Authorization: `Bearer ${token}` } });

      const addedTag = response.data || [];

      message.success("Thêm chuyên mục thành công");
      fetchTags();
      setOpen(false);
    } catch (error) {
      console.error("Error adding tag:", error.response);
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
        title="Thêm mới tag"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Trở về
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handleAddTag}>
            Đồng ý
          </Button>,
        ]}
      >
        <Input value={tagName} onChange={handleChange} />
      </AntModal>
    </>
  );
};

export default AddTag;
