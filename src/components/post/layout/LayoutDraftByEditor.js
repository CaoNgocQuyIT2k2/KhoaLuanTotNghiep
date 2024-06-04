// Show ra các bản thảo và thực hiện việc xét duyệt

import React, { useState } from 'react';
import { PieChartOutlined, UserOutlined, TeamOutlined, FileOutlined, HomeOutlined } from '@ant-design/icons';
import LayoutDataDraft from './LayoutDataDraft';
import Link from 'next/link';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const LayoutDraftByEditor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <LayoutDataDraft />;
      default:
        return null;
    }
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
            <a href="/" onClick={() => window.location.href = "/"}>Home</a>
          </Menu.Item>
          <Menu.Item key="1" icon={<PieChartOutlined style={{
            fontSize: '1.5rem',
          }} />}>
            Danh sách bản thảo
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} className="fixed">
          {/* Add your header content here */}
        </Header>
        <Content style={{ padding: '64px 16px 0', margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Biên tập viên</Breadcrumb.Item>
            <Breadcrumb.Item>Danh sách bản thảo</Breadcrumb.Item>
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
        <Footer style={{ textAlign: 'center' }}>Quy Design ©2023 Created by Quy</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutDraftByEditor;
