import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EditUser = ({ showModal, userId, userfirstname, fetchListUser, userlastname, userEmail, userdob }) => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user?.token);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    firstname: '',
    lastname: '',
    email: '',
    dob: '', // Update property name here
  });

  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    // Set the users when the props change
    setUserData({
      firstname: userfirstname,
      lastname: userlastname,
      email: userEmail,
      dob: userdob, // Update property name here
    });
  }, [userfirstname, userlastname, userEmail, userdob]);

  const showModalHandler = () => {
    showModal({ userId: userId });
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e, field) => {
    // Update the corresponding state variable based on the input
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: e.target.value,
    }));
  };

  const handleEditUser = async () => {
    try {
      if (user.role !== "ADMIN") {
        console.error("User information is missing");
        return;
      }
      const response = await axios.post(`/api/UpdateUserInfo?userId=${userId}`, {
        firstname: userData.firstname,
        lastname: userData.lastname,
        dob: userData.dob,
        email: userData.email,
      }, { headers: { Authorization: `Bearer ${token}` } });

      const updatedUser = response.data || {};
      message.success("Cập nhật người dùng thành công");
      fetchListUser();
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Cập nhật người dùng thất bại");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModalHandler} className='bg-yellow-500 text-white'>
        Sửa
      </Button>
      <AntModal
        visible={open}
        title="Chỉnh sửa người dùng"
        onOk={handleEditUser}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Trở về
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handleEditUser}>
            Chỉnh sửa
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '15px' }}>
          <Input placeholder="First Name" value={userData.firstname} onChange={(e) => handleChange(e, 'firstname')} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <Input placeholder="Last Name" value={userData.lastname} onChange={(e) => handleChange(e, 'lastname')} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <Input placeholder="Date of Birth" value={userData.dob} onChange={(e) => handleChange(e, 'dob')} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <Input placeholder="Email" value={userData.email} onChange={(e) => handleChange(e, 'email')} />
        </div>
      </AntModal>
    </>
  );
};

export default EditUser;
