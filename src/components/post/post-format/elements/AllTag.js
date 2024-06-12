import React, { useEffect, useState } from 'react';
import { Select, Form, Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AllTag = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTag, setNewTag] = useState('');
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/GetAllTag');
      setTags(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thẻ:', error);
    }
  };

  const handleAddTag = async () => {
    try {
      if (!token) {
        message.error('Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
      }

      const response = await axios.post(
        '/api/CreateTag',
        { value: newTag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success('Tạo tag thành công!');
        setIsModalVisible(false);
        setNewTag('');
        fetchTags();
      } else {
        message.error('Tạo tag thất bại.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        message.error('Unauthorized');
      } else {
        message.error('Lỗi máy chủ nội bộ');
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleTagChange = (selectedValues) => {
    setSelectedTags(selectedValues);
  };

  const tagOptions = tags.map(tag => (
    <Select.Option key={tag.id} value={tag.id}>
      {tag.value}
    </Select.Option>
  ));

  return (
    <>
      <Form.Item label="Thẻ" name="tagList">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            mode="multiple"
            showSearch
            placeholder="Chọn thẻ"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ flex: 1 }}
            onChange={handleTagChange}
            value={selectedTags}
          >
            {tagOptions}
          </Select>
          <Button type="link" onClick={handleOpenModal} style={{ marginLeft: 'auto' }}>
            Thêm thẻ
          </Button>
        </div>
      </Form.Item>
      <Modal
        title="Tạo Tag Mới"
        visible={isModalVisible}
        onOk={handleAddTag}
        onCancel={handleModalCancel}
      >
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Nhập tên tag"
        />
      </Modal>
    </>
  );
};

export default AllTag;
