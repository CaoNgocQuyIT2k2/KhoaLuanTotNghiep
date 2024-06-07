import React, { useEffect, useState } from 'react';
import { RightOutlined, DownOutlined } from '@ant-design/icons'; // Import RightOutlined
import { Dropdown, Space, Menu } from 'antd';
import axios from 'axios';
import Link from 'next/link';

const MenuCategories = () => {
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
      console.log('Fetching child categories:', categoryId);
      const response = await axios.get('/api/getChildCategories', {
        params: { categoryId }
      });
      const childCategories = response.data;
      const items = childCategories.map(child => ({
        key: child.id,
        label: (
          <Link href={`/category/${child.id}`}>
            {child.name}
          </Link>
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
      placement={index < 7 ? 'bottomLeft' : 'rightTop'}
      onVisibleChange={(visible) => {
        if (visible && !childMenus[category.id] && index < 7) {
          handleMenuClick(category.id);
        }
      }}
    >
      <div> {/* Sử dụng div thay vì a */}
        <Space>
          <Link href={`/category/${category.id}`}>
            {category.name}
          </Link>
          {index < 7 ? <DownOutlined /> : <RightOutlined />}
        </Space>
      </div>
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

export default MenuCategories;