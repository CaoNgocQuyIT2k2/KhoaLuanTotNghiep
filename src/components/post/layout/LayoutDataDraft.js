import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, message } from 'antd';
import { useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link';

export default function LayoutDataDraft() {
  const userId = useSelector((state) => state.user?.user?.user.id);
  const token = useSelector((state) => state.user?.user?.token);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetchDraftArticleDetail();
  }, [userId]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'abstracts',
      key: 'abstracts',
    },
    {
      title: 'Chuyên mục',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        return <Tag color='green'>{category && category.name}</Tag>
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === "DRAFT") {
          return <Tag color='yellow'>Draft</Tag>;
        } else if (status === "REFUSED") {
          return <Tag color='red'>Refused</Tag>;
        }
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, article) => (
        <div style={{ display: 'flex' }}>
          <span onClick={() => handleApprove(article.id)} className='bg-green-400 text-black p-1' style={{ cursor: 'pointer' }}>
            <CheckOutlined style={{ fontSize: '1.5rem' }} />
          </span>
          <span style={{ margin: '0 8px' }}></span>
          <span onClick={() => handleReject(article.id)} className='bg-red-500 text-black p-1' style={{ cursor: 'pointer' }}>
            <CloseOutlined style={{ fontSize: '1.5rem' }} />
          </span>
          <span style={{ margin: '0 8px' }}></span>
          <span className='bg-white-500 text-black p-1' style={{ cursor: 'pointer' }}>
          <Link href={`/editor/${article.id}`}>
              <EyeOutlined style={{ fontSize: '1.5rem' }} />
            </Link>
          </span>
        </div>
      ),
    },
  ];

  const fetchDraftArticleDetail = async () => {
    try {
      const response = await axios.get(`/api/getDraftArticle`, { headers: { Authorization: `Bearer ${token}` } });
      const articles = response.data || [];
      console.log("🚀 ~ response.data:", response.data);
      setDetail(articles);
    } catch (error) {
      console.error("Error fetching article detail:", error);
    }
  };

  const handleApprove = async (article_id) => {
    try {
      const response = await axios.post(`/api/EditorHandlePublic?article_id=${article_id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      message.success("Chấp nhận bản thảo thành công");
      fetchDraftArticleDetail();
    } catch (err) {
      const errorMsg = err.response.data?.message || "Error approving article";
      message.error(errorMsg);
    }
  };

  const handleReject = async (article_id) => {
    try {
      const response = await axios.post(`/api/EditorHandleReject?articleId=${article_id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      message.success("Từ chối bản thảo thành công");
      fetchDraftArticleDetail();
    } catch (err) {
      const errorMsg = err.response.data?.message || "Error rejecting article";
      message.error(errorMsg);
    }
  };

  return (
    <div>
      <Table columns={columns} dataSource={detail} />
    </div>
  );
}
