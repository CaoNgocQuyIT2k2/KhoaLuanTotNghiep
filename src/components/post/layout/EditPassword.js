import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditPassword = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserInfo = JSON.parse(localStorage.getItem('USER_INFO'));
      setUserInfo(storedUserInfo);
      setToken(storedUserInfo?.token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      oldPassword,
      newPassword,
      reEnterPassword,
    };

    try {
      await axios.post(`/api/UpdatePassword`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Password updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setTimeout(() => {
        setError('');
      }, 7000);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>; // Or handle the loading state as needed
  }

  return (
    <div className="Inclusive-editprofile-page">
      <form onSubmit={handleSubmit}>
        {error && <div className="error_msg">{error}</div>}
        {success && <div className="success_msg">{success}</div>}
        <Link href={'/'}>
          <a>
            <FiArrowLeft />
          </a>
        </Link>
        <div className="input-wrapper">
          <input
            type="password"
            id="oldPassword"
            placeholder="Old Password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label htmlFor="oldPassword">Old Password</label>
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="newPassword">New Password</label>
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            id="reEnterPassword"
            placeholder="Re-enter New Password"
            name="reEnterPassword"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
          <label htmlFor="reEnterPassword">Re-enter New Password</label>
        </div>

        <button type="submit" className="editprofile-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};




export default EditPassword;
