import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EditProfile = () => {
    const [editing, setEditing] = useState(false);
    const [editingField, setEditingField] = useState("");
    const [user, setUser] = useState({});
    const token = useSelector((state) => state.user?.token);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

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
    }, [token]);

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
            const response = await axios.put("/api/updateUserInfo", user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess("Cập nhật thành công!");
            setUser(response.data);
        } catch (error) {
            setError("Cập nhật thất bại!");
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

    return (
        <div className="Rr1BbE1U19QgCEgV7mxS undefined ">
            <div className="ZeZtl1UubD_E2XPrkE7d">
                <div id='avatarImage' className="Zwlu_anx0URifVorY6Xe wcYGJMnjdhLnUvRRDKPJ">Q</div>
                <label id='editAvatarImage' htmlFor="image-upload" className="custom-file-upload">
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
                <input id="image-upload" type="file" accept="image/*" />
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

                            {editing && <span className="E39rgqQdq7QYw3fBl_fJ "></span>}
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

                            {editing && <span className="E39rgqQdq7QYw3fBl_fJ "></span>}
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

export default EditProfile;