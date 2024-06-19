import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { HIDE_SPINNER, SHOW_SPINNER } from "../../store/constants/spinner";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
      }, 2000);
      return message.error("Mật khẩu không trùng khớp");
    }

    try {
      dispatch({ type: SHOW_SPINNER });
      const { data } = await axios.post(
        "/api/sign-up", // Gửi request đến API Route bạn vừa tạo
        formData
      );
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 2000);
      message.success("Đăng ký thành công");
      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response?.data?.message);
      }, 2000);
    }
  };

  return (
    <section className="signup">
      <div className="containerSign">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Đăng kí</h2>
            <form method="POST" className="register-form" id="register-form" onSubmit={registerHandler}>
              {error && <div className="error_message">{error}</div>}
              <div className="form-group">
                <label htmlFor="firstname"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Tên"
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
                  placeholder="Họ và tên lót"
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
                  placeholder="Email"
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
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmpassword"><i className="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  id="confirmpassword"
                  placeholder="Nhập lại mật khẩu"
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
                  placeholder="Ngày sinh"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <Link className="createAnAcc" href="/login">
                  Tôi đã đăng kí rồi!
                </Link>
              </div>
              <div className="form-group form-button">
                <input type="submit" name="signup" id="signup" className="form-submit" value="Đăng kí" />
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
