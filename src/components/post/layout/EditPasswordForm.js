import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { message } from 'antd';


const EditPasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = useSelector((state) => state.user.token);
  const userPass = useSelector((state) => state.user.user?.password);

  console.log("userPass", userPass);
  console.log("token", token);


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

      message.success("Cập nhật mật khẩu mới thành công")
      window.location.href = "/";

    } catch (error) {
      const errorMessage = error.response?.data?.message;
     message.error(errorMessage)
    }
  };


 return (
    <div className='v36fvPKH_ALKwt47Kz3Y'>
      <div className="dI0VCLFWaIoqADF62yLQ ITaSIg8lSOa0oSg1LAeu">
        <p className="_dh_nPdNXVpYJS3VccnV">
          <span className="LO3Sxj6O4IVuNYM8VuvI">
            <span>MẬT KHẨU HIỆN TẠI <span className="aowxSyYM0OBcNJOidK_O">*</span></span>
            <button className="msr4LmGgHiPdV3PTjSR9">Quên mật khẩu</button>
          </span>
          <span className="yrMkfpvDEXCq1K_XAwLh">
            <input 
              type="password" 
              className="old-password cK8sGnii0pt_rFXaskPQ UyyS_b5f_eAxGlEp52S5 password-field-account" 
              placeholder="Nhập mật khẩu hiện tại của bạn" 
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)} 
            />
          </span>
          <span className="Su1ySi5r1ZMc2U1D4Bpg">
            MẬT KHẨU MỚI<span className="aowxSyYM0OBcNJOidK_O"> *</span>
          </span>
          <span className="yrMkfpvDEXCq1K_XAwLh">
            <input 
              type="password" 
              className="cK8sGnii0pt_rFXaskPQ NepAMKDzSLa9BxysjR5V UyyS_b5f_eAxGlEp52S5 password-field-account" 
              placeholder="Nhập mật khẩu mới" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
            />
          </span>
          <span className="yrMkfpvDEXCq1K_XAwLh">
            <input 
              type="password" 
              className="cK8sGnii0pt_rFXaskPQ NepAMKDzSLa9BxysjR5V UyyS_b5f_eAxGlEp52S5 password-field-account" 
              placeholder="Nhập lại mật khẩu mới" 
              value={reEnterPassword} 
              onChange={(e) => setReEnterPassword(e.target.value)} 
            />
          </span>
          <span className="plYc33QtLf1c29jFLiHk ">
          
            <button 
              onClick={handleSubmit} 
              className="jFZjYRrWS_zUMhDWGtbj MkxO0ERI4KK3CQZsovoP"
            >
              Xác nhận
            </button>
          </span>
        </p>
        <span className="kEYHwcrORCYFkC0vl_Hg"></span>
      </div>
    </div>
  );
};

export default EditPasswordForm;