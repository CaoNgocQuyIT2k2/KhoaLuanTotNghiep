import React, { useEffect, useState } from 'react';
import { RightOutlined, DownOutlined } from '@ant-design/icons'; // Import RightOutlined
import { Dropdown, Space, Menu, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../store/constants/spinner';

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const [childMenus, setChildMenus] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
      dispatch({ type: SHOW_SPINNER });
        const response = await axios.get('/api/get-parent-categories');
        const parentCategories = response.data;
        setCategories(parentCategories);
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
          message.error(error.response?.data?.message);
        }, 2000);
      }
    };

    getCategories();
  }, [dispatch]);

  const handleMenuClick = async (categoryId) => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.get('/api/get-child-categories', {
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
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response?.data?.message);
      }, 2000);
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
      placement={index < 9 ? 'bottomLeft' : 'rightTop'}
      onVisibleChange={(visible) => {
        if (visible && !childMenus[category.id]) {
          handleMenuClick(category.id);
        }
      }}
    >
      <div> {/* Sử dụng div thay vì a */}
        <Space>
          <Link href={`/category/${category.id}`}>
            {category.name}
          </Link>
          {index < 9 ? <DownOutlined /> : <RightOutlined />}
        </Space>
      </div>
    </Dropdown>
  );
  
  const limitedItems = categories.slice(0, 9).map((category, index) => (
    <div key={category.id} style={{ display: 'inline-block', marginRight: '20px' }}>
      {renderDropdown(category, index)}
    </div>
  ));

  const overflowItems = categories.slice(9).map((category, index) => (
    <Menu.Item key={category.id}>
      {renderDropdown(category, index + 9)} {/* Pass the correct index */}
    </Menu.Item>
  ));

  return (
    <div 
      className='main-navigation list-inline'
      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {limitedItems}
      {categories.length > 9 && (
        <Dropdown
          overlay={
            <Menu>
              {overflowItems}
            </Menu>
          }
          trigger={['hover']}
          placement="rightTop" // Thiết lập hiển thị sang bên phải
        >
          <a onClick={(e) => e.preventDefault()} style={{ display: 'inline-block', marginRight: '10px', fontSize:'3rem', }}>
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
