import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { PieChartOutlined, UserOutlined, FundViewOutlined, HomeOutlined } from '@ant-design/icons';
import DataUser from './Admin/ManageUsers/DataUser';
import DataCategory from './Admin/ManageCategories/DataCategory';
import DataTag from './Admin/ManageTags/DataTag';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BackToTopButton from '../post-format/elements/BackToTopButton';
import DataArtPending from './Admin/ManageArtPending/DataArtPending';

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const router = useRouter();
  const { selected } = router.query;
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(selected || '1');

  useEffect(() => {
    if (selected) {
      setSelectedMenuItem(selected);
    }
  }, [selected]);

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
    router.push({
      pathname: router.pathname,
      query: { selected: key },
    });
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <DataCategory />;
      case '2':
        return <DataTag />;
      case '3':
        return <DataUser />;
      case '4':
        return <DataArtPending />;
      default:
        return null;
    }
  };

  const breadcrumbMap = {
    '1': 'Quản lý chuyên mục',
    '2': 'Quản lý thẻ',
    '3': 'Quản lý người dùng',
    '4': 'Kiểm duyệt bài viết',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ paddingTop: '60px' }}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedMenuItem]} mode="inline" onClick={handleMenuClick}>
          <Menu.Item icon={<HomeOutlined style={{ fontSize: '1.5rem' }} />}>
            <Link href="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<PieChartOutlined style={{ fontSize: '1.5rem' }} />}>
            Quản lý chuyên mục
          </Menu.Item>
          <Menu.Item key="2" icon={<FundViewOutlined style={{ fontSize: '1.5rem' }} />}>
            Quản lý thẻ
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined style={{ fontSize: '1.5rem' }} />}>
            Quản lý người dùng
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined style={{ fontSize: '1.5rem' }} />}>
            Kiểm duyệt bài viết
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} />
        <Content style={{ padding: '64px 16px 0', margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Trang quản trị</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumbMap[selectedMenuItem]}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: '8px', marginTop: '30px' }}>
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', paddingTop: '50px' }} />
        <BackToTopButton />
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
