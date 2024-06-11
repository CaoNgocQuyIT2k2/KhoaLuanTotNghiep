import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import MenuUser from './MenuUser';
import { message, Upload } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';



export default function LogUser({ userName }) {
  const avatarUrl = useSelector((state) => state.user?.user?.avatar);
  
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar alt={userName} src={avatarUrl} />

      <p style={{
        color: 'white',
        marginTop: "0.5rem",
        fontSize: "1.5rem",
      }}>Hello, {userName}</p>
      <MenuUser />
    </Stack>
  );
}




