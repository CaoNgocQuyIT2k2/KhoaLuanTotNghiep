import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { DownOutlined } from '@ant-design/icons';
import MenuUser from './MenuUser';

export default function LogUser({userName}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>{userName}</Avatar> <p style={{
        color: 'white',
        marginTop:"0.5rem",
        fontSize:"1.5rem",
      }}>Hello, {userName}</p>
      <MenuUser/> 
    </Stack>
  );
}