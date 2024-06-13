import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import Link from 'next/link'; // Import Link from next/link

export default function MenuUser() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userRole = useSelector((state) => state.user.user?.role); 
  console.log("userRole", userRole);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();


  const handleSavedNewsClick = () => {
    handleClose();
    router.push('/article/ArticleSaved');
  };

  const handleYourFeedClick = () => {
    handleClose();
    router.push('/yourfeed');
  };
  const handleProfileClick = () => {
    handleClose();
    router.push('/profile');
  };

  const handlePaswordClick = () => {
    handleClose();
    router.push('/EditPassword');
  };

  const handleLogoutClick = async () => {
    handleClose();
    localStorage.removeItem('USER_INFO');
    message.success('Đăng xuất thành công');
    window.location.reload();
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
          Your Profile
        </MenuItem>
        <MenuItem onClick={handlePaswordClick} style={{ fontSize: '1.5rem' }}>
          Update Password
        </MenuItem>
        <MenuItem onClick={handleYourFeedClick} style={{ fontSize: '1.5rem' }}>
          Your feed
        </MenuItem>
        <MenuItem onClick={handleSavedNewsClick} style={{ fontSize: '1.5rem' }}>
          Saved news
        </MenuItem>
        {userRole === 'ADMIN' && (
          <MenuItem onClick={handleClose} style={{ fontSize: '1.5rem' }}>
            <Link href="/admin/AdminDashboard">
              <a>Admin Dashboard</a>
            </Link>
          </MenuItem>
        )}

        <MenuItem onClick={handleLogoutClick} style={{ fontSize: '1.5rem' }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
