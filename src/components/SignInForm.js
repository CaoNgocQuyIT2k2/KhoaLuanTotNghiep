import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

import Image from 'next/image';
import { setUserInfo } from '../../store/action/userActions';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/SignIn', formData);

      if (response.status === 200) {
        message.success("Đăng nhập thành công");

        const userInfo = {
          token: response.data.token,
          user: response.data.user // hoặc các thông tin khác từ response nếu có
        };
        console.log("userInfo", userInfo);
        localStorage.setItem('USER_INFO', JSON.stringify(userInfo));

        window.location.href = "/"; // Chuyển hướng đến trang đăng nhập
        dispatch(setUserInfo(userInfo));
      } 
    } catch (error) {
      console.log("Đăng nhập thất bại", error);
      message.error(error.response.data.message);
    }
  };

  return (
    <section className="signin">
      <div className="containerSign">
        <div className="signin-content">
          <div className="signin-form">
            <h2 className="form-title">Sign In</h2>
            <form method="POST" className="login-form" id="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <Link className="createAnAcc" href="/register">
                  Create an account
                </Link>
              </div>
              <div className="form-group form-button">
                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
              </div>
            </form>
          </div>
          <div className="signin-image">
            <figure>
              <Image src="/images/signin-image.jpg" alt="sign in image" width={500} height={500} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
