import React, { useEffect, useState } from 'react';
import { RightOutlined, DownOutlined } from '@ant-design/icons'; // Import RightOutlined
import { Dropdown, Space, Menu } from 'antd';
import axios from 'axios';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [childMenus, setChildMenus] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/api/getParentCategories');
        const parentCategories = response.data;
        setCategories(parentCategories);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleMenuClick = async (categoryId) => {
    try {
      console.log('Fetching child categories for categoryId:', categoryId);
      const response = await axios.get('/api/getChildCategories', {
        params: { categoryId }
      });
      const childCategories = response.data;
      const items = childCategories.map(child => ({
        key: child.id,
        label: (
          <a target="_blank" rel="noopener noreferrer" href={`http://www.example.com/${child.id}`}>
            {child.name}
          </a>
        ),
      }));
      setChildMenus(prev => ({ ...prev, [categoryId]: items }));
    } catch (error) {
      console.error("Error fetching child categories:", error);
    }
  };

  const renderDropdown = (category, index) => (
    <Dropdown
      overlay={
        <Menu>
          {childMenus[category.id] ? (
            childMenus[category.id].map(item => (
              <Menu.Item key={item.key}>
                {item.label}
              </Menu.Item>
            ))
          ) : (
            <Menu.Item key="loading">Loading...</Menu.Item>
          )}
        </Menu>
      }
      trigger={['hover']}
      placement={index < 7 ? 'bottomLeft' : 'rightTop'} // Đặt placement dựa vào index
      onVisibleChange={(visible) => {
        if (visible && !childMenus[category.id] && index < 7) {
          handleMenuClick(category.id);
        }
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {category.name}
          {index < 7 ? <DownOutlined /> : <RightOutlined />} {/* Sử dụng RightOutlined cho các parent categories sau phần tử thứ 7 */}
        </Space>
      </a>
    </Dropdown>
  );
  

  const limitedItems = categories.slice(0, 7).map((category, index) => (
    <div key={category.id} style={{ display: 'inline-block', marginRight: '20px' }}>
      {renderDropdown(category, index)}
    </div>
  ));

  const overflowItems = categories.slice(7).map(category => (
    <Menu.Item key={category.id}>
      {renderDropdown(category)}
    </Menu.Item>
  ));
  return (
    <div 
    className='main-navigation list-inline'
    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {limitedItems}
      {categories.length > 7 && (
        <Dropdown
          overlay={
            <Menu>
              {overflowItems}
            </Menu>
          }
          trigger={['hover']}
          placement="rightTop" // Thiết lập hiển thị sang bên phải
        >
          <a onClick={(e) => e.preventDefault()} style={{ display: 'inline-block', marginRight: '10px' }}>
            <Space>
              ...
            </Space>
          </a>
        </Dropdown>
      )}
    </div>
  );
};

export default App;

