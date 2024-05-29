import React, { useState } from 'react';
import { Dropdown, Menu, Modal, Input, Button } from 'antd'; // Import thêm Modal, Input, Button từ antd

const EditComment = ({ comment, commentId, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State để kiểm soát hiển thị của modal xóa
  const [inputValue, setInputValue] = useState(comment); // Initialize state with comment from props

  const handleItemClick = ({ key }) => {
    if (key === 'edit') {
      setIsModalVisible(true);
    } else if (key === 'delete') {
      setIsDeleteModalVisible(true); // Hiển thị modal xóa khi bấm vào "Delete"
    }
  };

  const handleOk = () => {
    onEdit(commentId, inputValue); // Pass commentId and new comment value
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteOk = () => {
    onDelete(commentId); // Gọi hàm xóa comment khi bấm "OK" trên modal xóa
    setIsDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const menu = (
    <Menu onClick={handleItemClick}>
      <Menu.Item key="edit">Update</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          ...
        </a>
      </Dropdown>
      <Modal
        title="Update Comment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this comment?</p>
        <Input value={comment} disabled /> {/* Hiển thị comment nhưng không cho phép thay đổi */}
      </Modal>
    </>
  );
};

export default EditComment;
