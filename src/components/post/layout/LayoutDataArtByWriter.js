// Lấy data của những bài viết mà writter đó viết theo id của writter

import React, { useEffect, useState } from 'react'

import { Button, Table, Tag, message } from 'antd';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Link from 'next/link.js';


export default function LayoutDataArtByWriter() {
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
        }  else if (status === "PUBLIC") {
          return <Tag color='green'>PUBLIC</Tag>;
        }
     
      }
    },

    {
      title: 'Hành động',
      key: 'action',
      render: (_, article) => (
        <div>
          <Link href={`/article/edit/`}>
            <Button className='bg-blue-500 text-black'>Sửa</Button>
          </Link>
          <span style={{ margin: '0 8px' }}></span> {/* Space giữa các button */}
          <Button onClick={() => handleDelete(article.article_id)} className='bg-red-500 text-black'>
            Xóa
          </Button>
        </div>
      ),
    },

    



  ];

  const fetchDraftArticleDetail = async () => {
    try {
      const response = await axios.get(`/api/getPublicArtByWritter`, { headers: { Authorization: `Bearer ${token}` } });
      const articles = response.data || [];
      console.log("🚀 ~ response.data:", response.data);
      setDetail(articles);
    } catch (error) {
      console.error("Error fetching article detail:", error);
    }
  };


  const handleDelete = (article_id) => {
    https.delete(`/api/WritterDeleteArt?article_id=${article_id}`,{ headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        message.success("Xóa thành công")
        console.log("🚀 ~ res:", res)
        fetchDraftArticleDetail();
      }).catch((err) => {
        message.error(err.response.data)
      });
  }

  return (
    <div>
      <Table columns={columns} dataSource={detail} />
    </div>
  )
}