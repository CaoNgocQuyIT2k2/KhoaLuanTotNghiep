import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

const EditComment = ({ onEdit, onDelete }) => {
  const handleItemClick = ({ key }) => {
    if (key === 'edit') {
      onEdit();
    } else if (key === 'delete') {
      onDelete();
    }
  };

  const menu = (
    <Menu onClick={handleItemClick}>
      <Menu.Item key="edit">Update</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        ...
      </a>
    </Dropdown>
  );
};

export default EditComment;
