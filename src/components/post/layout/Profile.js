import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, Upload, message } from 'antd';
import { setUserInfo, updateUserInfo } from '../../../../store/action/userActions';

const Profile = () => {
    const [editing, setEditing] = useState(false);
    const [editingField, setEditingField] = useState("");
    const [user, setUser] = useState({});
    const userAvatar = useSelector((state) => state.user?.user?.avatar);
    const [avatarUrl, setAvatarUrl] = useState(userAvatar);
    const token = useSelector((state) => state.user?.token);
    const userId = useSelector((state) => state.user?.user?.id);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    console.log("avatarUrl", userAvatar);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/GetInfoMyself", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token, userId]);

    const handleEditClick = (field) => {
        setEditing(true);
        setEditingField(field);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setEditingField("");
    };

    const handleConfirmClick = async () => {
        try {
            const formUser = {
                firstname: user.firstname,
                lastname: user.lastname,
                dob: user.dob,
            };
            const response = await axios.post(`/api/UpdateMyInfo?userId=${userId}`, formUser, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update state and localStorage before reloading the page
            setUser(response.data);
            console.log("response.data",response.data);
            dispatch(updateUserInfo(response.data)); // Dispatch action to update Redux state

           const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
            localStorage.setItem("USER_INFO", JSON.stringify({ ...userInfo, user: { ...userInfo.user, user: response.data } }));

            setSuccess("Cập nhật thành công!");

            // Delay reload to ensure state updates are completed
            setTimeout(() => {
                window.location.reload();
            }, 500);
            message.success("Cập nhật thành công!");
        } catch (error) {
            setError("Cập nhật thất bại!");
            message.success("Cập nhật thất bại!");

        } finally {
            setEditing(false);
            setEditingField("");
        }
    };

    const handleChange = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const handleAvatarChange = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/UpdateAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                message.success('Cập nhật avatar thành công.');
                setAvatarUrl(response.data.avatar); // Thay đổi URL của avatar sau khi cập nhật thành công
                const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
                localStorage.setItem("USER_INFO", JSON.stringify({ ...userInfo, user: { ...userInfo.user, avatar: response.data.avatar } }));
                window.location.reload();
            } else {
                message.error('Cập nhật avatar thất bại.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        }
    };

    return (
        <div className="Rr1BbE1U19QgCEgV7mxS undefined">
            <div className="ZeZtl1UubD_E2XPrkE7d">
                <Avatar
                    id='avatarImage'
                    className="Zwlu_anx0URifVorY6Xe wcYGJMnjdhLnUvRRDKPJ"
                    src={user.avatar}
                ></Avatar>

                <label
                    id='editAvatarImage'
                    htmlFor="image-upload"
                    className="custom-file-upload"
                >
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="32" height="32" rx="16" fill="#292D32" fillOpacity="0.8"></rect>
                        <path
                            d="M13.5 24.3333H18.5C22.6667 24.3333 24.3334 22.6667 24.3334 18.5V15.5833C24.3334 13.0643 23.5 10.1667 21 10.1667C18.5 10.1667 19.3334 8.5 16.8334 8.5H15.1667C12.6667 8.5 13.5 10.1667 11 10.1667C8.50002 10.1667 7.66669 13.0643 7.66669 15.5833V18.5C7.66669 22.6667 9.33335 24.3333 13.5 24.3333Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M16 21C17.3769 21 18.5 19.8769 18.5 18.5C18.5 17.1231 17.3769 16 16 16C14.6231 16 13.5 17.1231 13.5 18.5C13.5 19.8769 14.6231 21 16 21Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M15.1667 13.5H16.8334"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </label>

                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAvatarChange(e.target.files[0])}
                />
            </div>
            <ul className='mt-5'>
                <li>
                    <p className="_qNcrWg9077ruGTHRxlG HKuWzgM64twCPEzK73fd">
                        Firstname
                        <span className="aNEC4lq86sRCKZos9vNV">
                            <input
                                id='inputNameUser'
                                type="text"
                                className={`V3mLO8kIccyNAST3bSeN RSMSnLiuv3_Tg3EsjD8w name-display-field-account ${editingField === 'firstname' && editing ? 'editing' : ''}`}
                                placeholder="Nhập tên hiển thị"
                                value={user.firstname || ''}
                                readOnly={!editing || editingField !== 'firstname'}
                                onChange={(e) => handleChange('firstname', e.target.value)}
                            />
                            {editing && <span className="E39rgqQdq7QYw3fBl_fJ"></span>}
                        </span>
                        <span className="wYp6NaL7LcFl9Oufxx2Q" style={{ position: "relative" }}>
                            {editing && editingField === 'firstname' ? (
                                <>
                                    <button onClick={handleCancelClick} className="ICPAHcLRkBUIBIbWWrfO">Hủy bỏ</button>
                                    <button onClick={handleConfirmClick} className="DkaBufMNtDl8rzJz2EjA EgM6lCPaQ77I_0QqehDw">Xác nhận</button>
                                </>
                            ) : (
                                <button
                                    id='editNameUser'
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                    onClick={() => handleEditClick('firstname')}
                                    className="QKBNYvKWAVmIWkhHJr2Y"
                                >
                                    Chỉnh sửa
                                </button>
                            )}
                        </span>
                    </p>
                </li>
                <div className="TFIbC1iuTF7X4NdOcQVf"></div>
                <li>
                    <p className="_qNcrWg9077ruGTHRxlG HKuWzgM64twCPEzK73fd">
                        Lastname
                        <span className="aNEC4lq86sRCKZos9vNV">
                            <input
                                id='inputNameUser'
                                type="text"
                                className={`V3mLO8kIccyNAST3bSeN RSMSnLiuv3_Tg3EsjD8w name-display-field-account ${editingField === 'lastname' && editing ? 'editing' : ''}`}
                                placeholder="Nhập tên hiển thị"
                                value={user.lastname || ''}
                                readOnly={!editing || editingField !== 'lastname'}
                                onChange={(e) => handleChange('lastname', e.target.value)}
                            />
                            {editing && <span className="E39rgqQdq7QYw3fBl_fJ"></span>}
                        </span>
                        <span className="wYp6NaL7LcFl9Oufxx2Q" style={{ position: "relative" }}>
                            {editing && editingField === 'lastname' ? (
                                <>
                                    <button onClick={handleCancelClick} className="ICPAHcLRkBUIBIbWWrfO">Hủy bỏ</button>
                                    <button onClick={handleConfirmClick} className="DkaBufMNtDl8rzJz2EjA EgM6lCPaQ77I_0QqehDw">Xác nhận</button>
                                </>
                            ) : (
                                <button
                                    id='editNameUser'
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                    onClick={() => handleEditClick('lastname')}
                                    className="QKBNYvKWAVmIWkhHJr2Y"
                                >
                                    Chỉnh sửa
                                </button>
                            )}
                        </span>
                    </p>
                </li>
                <div className="TFIbC1iuTF7X4NdOcQVf"></div>
                <li>
                    <p className="_qNcrWg9077ruGTHRxlG HKuWzgM64twCPEzK73fd">
                        Date of birth
                        <span className={`aNEC4lq86sRCKZos9vNV ${editingField === 'dob' ? 'editing' : ''}`}>
                            <input
                                style={{
                                    backgroundColor: 'none',
                                    background: 'none',
                                    border: (editingField === 'dob' && editing) ? '1px solid #000' : 'none'
                                }}
                                id='inputNameUser'
                                type="date"
                                className={`rr3xtgEzG3YiPb4cEGc3 xqowdZ1eQ07H3uuqS0qe IaD0leAsnXbDPPyxXv10 date-display-field-account ${editingField === 'dob' ? 'editing' : ''}`}
                                max="2024-06-11"
                                min="1934-06-11"
                                value={user.dob || ''}
                                readOnly={!editing || editingField !== 'dob'}
                                onChange={(e) => handleChange('dob', e.target.value)}
                            />

                            {editing && <span className="E39rgqQdq7QYw3fBl_fJ "></span>}
                        </span>
                        <span className="wYp6NaL7LcFl9Oufxx2Q" style={{ position: "relative" }}>
                            {editing && editingField === 'dob' ? (
                                <>
                                    <button onClick={handleCancelClick} className="ICPAHcLRkBUIBIbWWrfO">Hủy bỏ</button>
                                    <button onClick={handleConfirmClick} className="DkaBufMNtDl8rzJz2EjA EgM6lCPaQ77I_0QqehDw">Xác nhận</button>
                                </>
                            ) : (
                                <button
                                    id='editNameUser'
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                    onClick={() => handleEditClick('dob')}
                                    className="QKBNYvKWAVmIWkhHJr2Y"
                                >
                                    Chỉnh sửa
                                </button>
                            )}
                        </span>
                    </p>
                </li>
                <div className="TFIbC1iuTF7X4NdOcQVf"></div>
                <li>
                    <p className="_qNcrWg9077ruGTHRxlG HKuWzgM64twCPEzK73fd ">
                        E-Mail
                        <span className="aNEC4lq86sRCKZos9vNV ">
                            <input
                                id='inputEmailUser'
                                type="text"
                                className={`V3mLO8kIccyNAST3bSeN RSMSnLiuv3_Tg3EsjD8w  borderNone`}
                                placeholder="Nhập tên hiển thị"
                                value={user.email || ''}
                                readOnly
                            />
                            {editing && editingField === 'email' && <span className="E39rgqQdq7QYw3fBl_fJ "></span>}
                        </span>
                    </p>
                </li>
                <div className="TFIbC1iuTF7X4NdOcQVf"></div>
                <li>
                    <p className="_qNcrWg9077ruGTHRxlG HKuWzgM64twCPEzK73fd ">
                        ROLE
                        <span className="aNEC4lq86sRCKZos9vNV">
                            <input
                                id='inputRoleUser'
                                type="text"
                                className={`V3mLO8kIccyNAST3bSeN RSMSnLiuv3_Tg3EsjD8w borderNone`}
                                placeholder="Nhập tên hiển thị"
                                value={user.role || ''}
                                readOnly
                            />
                            {editing && editingField === 'role' && <span className="E39rgqQdq7QYw3fBl_fJ "></span>}
                        </span>
                    </p>
                </li>
            </ul>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Profile;
