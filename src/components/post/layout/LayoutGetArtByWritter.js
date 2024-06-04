// Show ra những bài viết của writter

import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { PieChartOutlined, UserOutlined, TeamOutlined, FileOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link.js';

import LayoutDataArtByWriter from './LayoutDataArtByWriter';
import LayoutDraftArtByWriter from './LayoutDraftArtByWriter';

const { Header, Content, Footer, Sider } = Layout;

const LayoutGetArtByWritter = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <LayoutDataArtByWriter />;
      case '2':
        return <LayoutDraftArtByWriter />;
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
            Danh sách bài viết
          </Menu.Item>
          <Menu.Item key="2" icon={<FileOutlined style={{ fontSize: '1.5rem' }} />}>
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
            <Breadcrumb.Item>Phóng viên</Breadcrumb.Item>
            {selectedMenuItem === '1' && <Breadcrumb.Item>Danh sách bài viết</Breadcrumb.Item>}
            {selectedMenuItem === '2' && <Breadcrumb.Item>Danh sách bản thảo</Breadcrumb.Item>}
          </Breadcrumb>
          <Link href={`/writter/addWritter`}>
            <Button type="primary" className="bg-green-500 text-white">
              Thêm bài viết
            </Button>
          </Link>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#fff',
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

export default LayoutGetArtByWritter;
