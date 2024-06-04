import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditProfile = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserInfo = JSON.parse(localStorage.getItem('USER_INFO'));
      setUserInfo(storedUserInfo);
      setToken(storedUserInfo?.token);
      setUser(storedUserInfo?.user);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setDob(user.dob);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      dob,
      email,
    };

    try {
      await axios.post(`/api/UpdateMyInfo?userId=${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess('Edit Profile successfully');
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
        <Link href={'/profile'}>
          <a>
            <FiArrowLeft />
          </a>
        </Link>
        <div className="input-wrapper">
          <input
            type="text"
            id="firstname"
            placeholder="Firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label htmlFor="firstname">Firstname</label>
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            id="lastname"
            placeholder="Lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label htmlFor="lastname">Lastname</label>
        </div>

        <div className="input-wrapper">
          <input
            type="date"
            id="dob"
            placeholder="Date of birth"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <label htmlFor="dob">Date of birth</label>
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">E-mail</label>
        </div>

        <button type="submit" className="editprofile-btn">
          Edit Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
