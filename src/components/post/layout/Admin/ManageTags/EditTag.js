//  chỉnh sửa về phần quản lí user

import React, { useState, useEffect } from 'react';
import { Button, Modal as AntModal, Input, message ,DatePicker} from 'antd';

import { useSelector } from 'react-redux';
import axios from 'axios';

const EditUser = ({ showModal,tagId,tagName, fetchTags}) => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.user?.token);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    tagId:'',
    value: '',
  });

  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    // Set the users when the props change
    setUserData({
      value: tagName,

    });
  }, [tagName]);


  const showModalHandler = () => {
    showModal({ tagId: tagId });
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
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



  const handlEditTag = async () => {
    try {
      if (user.role !== "ADMIN") {
        console.error("User information is missing");
        return;
      }

      const response = await axios.post(`/api/update-tag?tagId=${tagId}`, {
        value: userData.value,
      }
    , { headers: { Authorization: `Bearer ${token}` } }
    );

      const updatedUser = response.data || {};

      message.success("Cập nhật người dùng thành công");
      fetchTags();
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
        title="Chỉnh sửa tên thẻ"
        onOk={handlEditTag}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Trở về
          </Button>,
          <Button key="submit" type='default' loading={loading} onClick={handlEditTag}>
            Chỉnh sửa
          </Button>,
        ]}
      >
       
        <Input placeholder="Tag's Name" style={{ marginBottom: '15px' }} value={userData.value} onChange={(e) => handleChange(e, 'value')} />
      </AntModal>
    </>
  );
};

export default EditUser;
