import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

export default function DataCategory() {
  const userId = useSelector((state) => state.user?.user?.id);
  const token = useSelector((state) => state.user?.token);

  const [detail, setDetail] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [userId]);
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/get-all-categories`);
      const categories = response.data || [];
      setDetail(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };



  const showModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  const columns = [
    {
      title: 'Mã chuyên mục',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên chuyên mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tên phụ chuyên mục',
      dataIndex: 'second_name',
      key: 'second_name',
    },
    {
      title: 'Tên chuyên mục cha',
      dataIndex: 'parent',
      key: 'parent_name',
      render: (parent) => {
        return parent ? parent.name : '';
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, category) => (
        <div>
          <EditCategory
            showModal={showModal}
            categoryName={category.name}
            categoryId={category.id}
            parentId={category.parent ? category.parent.id : null}
            parentName={category.parent ? category.parent.name : 'null'}
            fetchCategories={fetchCategories}
          />
          <span style={{ margin: '0 8px' }}></span>
          <Button onClick={() => handleDelete(category.id)} className='bg-red-500 text-black'>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (categoryId) => {

    axios
      .delete(`/api/delete-category?categoryId=${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        message.success("Xóa thành công");
        fetchCategories();
      })
      .catch((err) => {
        message.error("Xóa thất bại");
        message.error(err.response.data);
      });
  };
  return (
    <div>
      <AddCategory  fetchCategories={fetchCategories} />
      <Table columns={columns} dataSource={detail} />
    </div>
  );
}
