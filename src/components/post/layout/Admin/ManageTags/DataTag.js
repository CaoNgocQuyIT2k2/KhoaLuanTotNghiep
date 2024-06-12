// Lấy data về tất cả chuyên mục và thực hiện việc xóa một chuyên mục

import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, message } from 'antd';
import { useSelector } from 'react-redux';
import AddTag from './AddTag.js';
import EditTag from './EditTag.js';
import axios from 'axios';

export default function DataTag() {
  const userId = useSelector((state) => state.user?.user.id);
  const token = useSelector((state) => state.user?.token);

  const [detail, setDetail] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchTags();
  }, [userId])

  const fetchTags = async () => {
    try {
      const response = await axios.get(`/api/GetAllTag`);
      const tags = response.data || [];
      console.log("🚀 ~ response.data:", response.data);
      setDetail(tags);
    } catch (error) {
      console.error("Error fetching article detail:", error);
    }
  };
;

  const showModal = (tagId) => {
    setSelectedCategoryId(tagId);
  };

  const columns = [
    {
      title: 'Id Tag',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tag',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, tags) => (
        <div>
          <EditTag
            showModal={showModal}
            tagName={tags.value}
            tagId={tags.id}
            fetchTags={fetchTags}
          />
          <span style={{ margin: '0 8px' }}></span>
          <Button onClick={() => handleDelete(tags.id)} className='bg-red-500 text-black'>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (tags_id) => {
    axios
      .delete(`/api/DeleteTag?tagId=${tags_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        message.success("Xóa thành công");
        console.log("🚀 ~ res:", res);
        fetchTags();
      })
      .catch((err) => {
        message.error("Xóa thất bại");
        message.error(err.response.data);
      });
  };

  return (
    <div>
      <AddTag userId={userId} fetchTags={fetchTags} />
      <Table columns={columns} dataSource={detail} />
    </div>
  );
}
