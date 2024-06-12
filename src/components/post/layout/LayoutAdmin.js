// Trang chính của phần Admin. Từ đây chọn các mục để lấy data theo từng mục rồi show ra

import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { PieChartOutlined, UserOutlined, TeamOutlined, FileOutlined, HomeOutlined, FundViewOutlined } from '@ant-design/icons';
import DataUser from './Admin/ManageUsers/DataUser';
import DataCategory from './Admin/ManageCategories/DataCategory';
import DataTag from './Admin/ManageTags/DataTag';
import Link from 'next/link';


const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return (
          <>
            <span style={{ margin: '18px 0px' }}></span>
            <DataCategory />
          </>
        );
      case '2':
        return <DataTag />;
      case '3':
        return <DataUser />
      default:
        return null;
    }
  };
  const breadcrumbMap = {
    '1': 'Manage Categories',
    '2': 'Manage Tags',
    '3': 'Manage Users',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ paddingTop: '60px' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedMenuItem]} mode="inline" onClick={handleMenuClick}>
          <Menu.Item icon={<HomeOutlined style={{
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }} />}>
            <Link href="/" onClick={() => window.location.href = "/"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<PieChartOutlined style={{
            fontSize: '1.5rem',
          }} />}>
            Manage Categories
          </Menu.Item>
          <Menu.Item key="2" icon={<FundViewOutlined style={{
            fontSize: '1.5rem',
          }} />}>
            Manage Tags
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined style={{
            fontSize: '1.5rem',
          }} />}>
            Manage Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} className="fixed">
          {/* Add your header content here */}
        </Header>
        <Content style={{ padding: '64px 16px 0', margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>LayoutAdmin</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbMap[selectedMenuItem]}</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#fff', // You can set a background color if needed
              borderRadius: '8px',
              marginTop: '30px',
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
