import React, { useEffect, useState, useCallback } from 'react';
import { Select, Form, Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';

const AllTag = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTag, setNewTag] = useState('');
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();

  const fetchTags = useCallback(async () => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.get('/api/get-all-tag');
      setTags(response.data);
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response.data.message);
      }, 3000);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleAddTag = async () => {
    try {
      if (!token) {
        message.error('Token không tồn tại. Vui lòng đăng nhập lại.');
        return;
      }
      dispatch({ type: SHOW_SPINNER });

      const response = await axios.post(
        '/api/create-tag',
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
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 3000);
      } else {
        message.error('Tạo tag thất bại.');
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response.data.message);
      }, 3000);
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
