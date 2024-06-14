import React, { useEffect, useState, useCallback } from 'react';
import { Button, Table, Tag, message } from 'antd';
import { useSelector } from 'react-redux';
import EditUser from './EditUser.js';
import moment from 'moment';
import 'moment/locale/vi'; // Import the locale you want to use, 'vi' for Vietnamese
import axios from 'axios';

export default function DataUser() {
  const userId = useSelector((state) => state.user?.user?.id);
  const user = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.token);
  const [detail, setDetail] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  useEffect(() => {
    fetchListUser();
  }, [userId, fetchListUser]);

  const fetchListUser = useCallback(async () => {
    try {
      const response = await axios.get(`/api/get-all-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const users = response.data || [];

      setDetail(users);
    } catch (error) {
      console.error("Error fetching article detail:", error);
    }
  }, [token]);



  const showModal = (userId) => {
    setSelectedCategoryId(userId);
  };

  const handleDelete = (user_id) => {
    if (user.role !== "ADMIN") {
      console.error("User information is missing");
      return;
    }

    axios
      .delete(`/api/delete-user?userId=${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res = 200) => {
        message.success("Xóa thành công");
        fetchListUser();

      })
      .catch((err) => {
        message.error("Xóa thất bại");
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = 'green';
        if (role === 'ADMIN') color = 'red';
        else if (role === 'WRITER') color = 'yellow';
        else if (role === 'EDITOR') color = 'blue';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, users) => (
        <div>
          <EditUser
            showModal={showModal}
            userId={users.id}
            userfirstname={users.firstname}
            userlastname={users.lastname}
            userdob={users.dob}
            userEmail={users.email}
            fetchListUser={fetchListUser}
          />
          <span style={{ margin: '0 8px' }}></span>
          <Button onClick={() => handleDelete(users.id)} className='bg-red-500 text-black'>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={detail} />
    </div>
  );
}
