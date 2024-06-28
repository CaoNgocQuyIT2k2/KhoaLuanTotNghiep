import React, { useEffect, useState, useCallback } from 'react';
import { Button, Table, Tag, message } from 'antd';
import { useSelector } from 'react-redux';
import 'moment/locale/vi'; // Import the locale you want to use, 'vi' for Vietnamese
import axios from 'axios';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const defaultAvatarSrc = "/images/category/BgWhite.png";

export default function DataArtPending() {
  const userId = useSelector((state) => state.user?.user?.id);
  const user = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetchListArtPending();
  }, [userId, fetchListArtPending]);

  const fetchListArtPending = useCallback(async () => {
    try {
      const response = await axios.get(`/api/get-all-art-pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const users = response.data || [];
      setDetail(users);
    } catch (error) {
      console.error("Error fetching article detail:", error);
    }
  }, [token]);

  const handleAccept = async (id) => {
    if (user.role !== "ADMIN") {
      console.error("User information is missing");
      return;
    }
  
    try {
      const response = await axios.post(
        '/api/public-article',
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        message.success("Chấp thuận bài viết thành công");
        fetchListArtPending();
      } else {
        message.error("Chấp thuận bài viết thất bại");
      }
    } catch (error) {
      message.error("Chấp thuận bài viết thất bại");
      console.error(error);
    }
  };
  
  const handleReject = async (id) => {
    if (user.role !== "ADMIN") {
      console.error("User information is missing");
      return;
    }
  
    try {
      const response = await axios.post(
        '/api/refuse-article',
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        message.success("Loại bỏ bài viết thành công");
        fetchListArtPending();
      } else {
        message.error("Loại bỏ bài viết thất bại");
      }
    } catch (error) {
      message.error("Loại bỏ bài viết thất bại");
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Bài viết công khai',
      key: 'duplicatedArt.title',
      width: 300,
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', }}>
        <img 
            src={record.duplicatedArt.avatar || defaultAvatarSrc} 

            style={{ marginRight: '10px', width: '100px', height: '100px'}} 
          />
          <span>{record.duplicatedArt.title}</span>
        </div>
      ),
    },
    {
      title: 'Bài viết trùng',
      key: 'pendingArt.title',
      width: 300,
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center',  }}>
          <img 
            src={record.pendingArt.avatar || defaultAvatarSrc} 

            style={{ marginRight: '10px' ,width: '100px', height: '100px' }} 
          />
          <span>{record.pendingArt.title}</span>
        </div>
      ),
    },
    {
      title: 'Độ tương đồng',
      dataIndex: 'similarity',
      key: 'similarity',
      render: (similarity) => {
        let color = 'green';
        if (similarity >= 0.8) color = 'red';
        else if (similarity >= 0.5) color = 'yellow';
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Tag color={color}>{similarity}</Tag>
          </div>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, article) => (
        <div style={{ display: 'flex' }}>
          <Button 
            title='Công bố' 
            style={{ border: 'none', color: 'green' }} 
            onClick={() => handleAccept(article.id)} 
          >
            <CheckOutlined style={{ color: 'green' }} />
          </Button>
          <span style={{ margin: '0 8px' }}></span>
          <Button 
            title='Từ chối' 
            style={{ border: 'none' }} 
            onClick={() => handleReject(article.id)} 
          >
            <CloseOutlined style={{ color: 'red' }} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={detail} rowKey="id" />
    </div>
  );
}
