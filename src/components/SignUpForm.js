import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import Link from "next/link";
import Image from "next/image";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dob: ""
  });
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    // Kiểm tra xem tất cả các trường đã được điền chưa
    const { firstname, lastname, email, password, dob } = formData;
    if (!firstname || !lastname || !email || !password || !dob || !confirmpassword) {
      return message.error("Vui lòng điền đầy đủ thông tin");
    }

    if (password !== confirmpassword) {
      setFormData({ ...formData, password: "" });
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return message.error("Mật khẩu không trùng khớp");
    }

    try {
      const { data } = await axios.post(
        "/api/SignUp", // Gửi request đến API Route bạn vừa tạo
        formData
      );
      message.success("Đăng ký thành công");
      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
      return;
    } catch (error) {
      message.error("Email đã tồn tại");
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <section className="signup">
      <div className="containerSign">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form method="POST" className="register-form" id="register-form" onSubmit={registerHandler}>
              {error && <div className="error_message">{error}</div>}
              <div className="form-group">
                <label htmlFor="firstname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Your First Name"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Your Last Name"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>
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
                <label htmlFor="confirmpassword"><i className="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob"><i className="zmdi zmdi-calendar"></i></label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Your Date of Birth"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <Link className="createAnAcc" href="/login">
                  I am already member
                </Link>
              </div>
              <div className="form-group form-button">
                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <Image src="/images/signup-image.jpg" alt="sign in image" width={500} height={500} />
            </figure>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterScreen;
