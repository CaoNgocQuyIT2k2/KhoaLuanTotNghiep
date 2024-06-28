import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'; // Import Link từ next/link
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';

export default function MenuUser() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userRole = useSelector((state) => state.user.user?.role); 
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateWithSpinner = async (callback, messageText) => {
    dispatch({ type: SHOW_SPINNER });
    handleClose();
    await callback();
    setTimeout(() => {
      dispatch({ type: HIDE_SPINNER });
      if (messageText) {
        message.success(messageText);
      }
    }, 2000);
  };

  const handleSavedNewsClick = () => {
    navigateWithSpinner(() => router.push('/article/article-saved'));
  };

  const handleYourFeedClick = () => {
    navigateWithSpinner(() => router.push('/your-feed'));
  };

  const handleProfileClick = () => {
    navigateWithSpinner(() => router.push('/profile'));
  };

  const handlePaswordClick = () => {
    navigateWithSpinner(() => router.push('/edit-password'));
  };

  const handleLogoutClick = async () => {
    await navigateWithSpinner(() => {
      localStorage.removeItem('USER_INFO');
      window.location.reload();
    }, 'Đăng xuất thành công');
  };

  return (
    <div style={{ marginLeft: '-1rem' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <DownOutlined
          style={{
            color: 'white',
            marginTop: '1rem',
            fontSize: '1.5rem',
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfileClick} style={{ fontSize: '1.5rem' }}>
          Thông tin tài khoản
        </MenuItem>
        <MenuItem onClick={handlePaswordClick} style={{ fontSize: '1.5rem' }}>
          Cập nhật mật khẩu
        </MenuItem>
        <MenuItem onClick={handleYourFeedClick} style={{ fontSize: '1.5rem' }}>
          Bảng tin của bạn
        </MenuItem>
        <MenuItem onClick={handleSavedNewsClick} style={{ fontSize: '1.5rem' }}>
          Tin đã lưu
        </MenuItem>
        {userRole === 'ADMIN' && (
          <MenuItem onClick={handleClose} style={{ fontSize: '1.5rem' }}>
            <Link href="/admin/AdminDashboard">
              <a>Quản trị viên</a>
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogoutClick} style={{ fontSize: '1.5rem' }}>
          Đăng xuất
        </MenuItem>
      </Menu>
    </div>
  );
}
