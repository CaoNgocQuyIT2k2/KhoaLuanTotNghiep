import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import Link from 'next/link';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));
        const token = userInfo?.token;

        if (token) {
          const response = await axios.get('/api/getInfoMyself', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Inclusive_profile_page">
      <button onClick={() => router.push('/')}>
        <FiArrowLeft />
      </button>
      <div className="profile-top-wrap">
        <span>Membership Information</span>
      </div>
      <ul>
        <li>
          <span>Firstname</span>
          <div>{user.firstname}</div>
        </li>
        <li>
          <span>Lastname</span>
          <div>{user.lastname}</div>
        </li>
        <li>
          <span>Date of birth</span>
          <div>{user.dob}</div>
        </li>
        <li>
          <span>E-Mail</span>
          <div>{user.email}</div>
        </li>
        <li>
          <span>Role</span>
          <div>{user.role || 'No Role Found'}</div>
        </li>
      </ul>
      <div className="btns_wrap">
        <button className="profileEditBtn">
          <Link href="/editProfile">Edit Profile</Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
