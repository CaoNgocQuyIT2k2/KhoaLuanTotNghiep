import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

import Image from 'next/image';
import { setUserInfo } from '../../store/action/userActions';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../store/constants/spinner';

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
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.post('/api/sign-in', formData);
      if (response.status === 200) {

        const userInfo = {
          token: response.data.token,
          user: response.data.user // hoặc các thông tin khác từ response nếu có
        };
        localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 3000);
        dispatch(setUserInfo(userInfo));
        message.success("Đăng nhập thành công");
        window.location.href = "/"; // Chuyển hướng đến trang đăng nhập
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response.data.message);
      }, 3000);
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
