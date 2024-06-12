import Link from 'next/link';
import React from 'react';
import { message } from 'antd';

const AccountSidebar = () => {
    const handleLogoutClick = async () => {
        // Assuming handleClose() is a function you need to call here
        // handleClose();
        localStorage.removeItem('USER_INFO');
        message.success('Đăng xuất thành công');
        window.location.reload();
    };

    return (
        <div className="sidebar" data-module="account-sidebar">
            <div className="_IOX7b9h3ehmfwCtcJlL">
                <ul className="U2a29pIZKHe_zUk0rnP4">
                    <li>
                        <Link href={`/profile`}>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="m19.21 15.74-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01zm-.51.51c.3 1.08 1.14 1.92 2.22 2.22" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M3.41 22c0-3.87 3.85-7 8.59-7 1.04 0 2.04.15 2.97.43" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                Thông tin tài khoản
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/EditPassword`}>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path d="M16 2H8C4 2 2 4 2 8v13c0 .55.45 1 1 1h13c4 0 6-2 6-6V8c0-4-2-6-6-6z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M13 9h5M2 14h20" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <circle cx="7.5" cy="8.5" r="1.75" stroke="#292D32" strokeWidth="1.5"></circle>
                                </svg>
                                Cập nhật mật khẩu
                            </a>
                        </Link>
                    </li>
                    <li id="tin-cua-ban">
                        <Link href={`/yourfeed`}>
                            <a>
                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2h8c4 0 6 2 6 6v13c0 .55-.45 1-1 1H8c-4 0-6-2-6-6V8c0-4 2-6 6-6z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M2.6 14.2h3.6" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="m10.277 8.65.794 1.597c.107.22.395.43.637.476l1.436.238c.918.152 1.132.82.473 1.49l-1.12 1.126a.982.982 0 0 0-.232.821l.322 1.394c.253 1.098-.333 1.529-1.296.951l-1.346-.804a.951.951 0 0 0-.89 0l-1.346.804c-.963.572-1.549.147-1.296-.951l.321-1.394c.062-.26-.045-.628-.23-.82L5.383 12.45c-.66-.662-.445-1.33.473-1.49l1.436-.237a.973.973 0 0 0 .637-.476l.794-1.597c.422-.867 1.12-.867 1.554 0z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M13 14h9m-8-7h4" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                Bảng tin của bạn
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/article/ArticleSaved`}>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path d="M16.435 3h-8.88C5.595 3 4 4.566 4 6.473V19.15c0 1.62 1.188 2.303 2.644 1.52l4.495-2.438c.479-.26 1.253-.26 1.722 0l4.495 2.438c1.456.792 2.644.108 2.644-1.52V6.473C19.99 4.566 18.397 3 16.435 3Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                Tin đã lưu
                            </a>
                        </Link>
                    </li>
                    <li className="ZS38fNMGdJbyhACPGIEJ" style={{ display: 'none' }}>
                        <a href="#">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m15.39 5.21 1.41 2.82c.19.39.7.76 1.13.84l2.55.42c1.63.27 2.01 1.45.84 2.63l-1.99 1.99c-.33.33-.52.98-.41 1.45l.57 2.46c.45 1.94-.59 2.7-2.3 1.68l-2.39-1.42c-.43-.26-1.15-.26-1.58 0l-2.39 1.42c-1.71 1.01-2.75.26-2.3-1.68l.57-2.46c.11-.46-.08-1.11-.41-1.45L6.7 11.92c-1.17-1.17-.79-2.35.84-2.63l2.55-.42c.43-.07.94-.45 1.13-.84l1.41-2.82c.75-1.53 1.99-1.53 2.76 0ZM8 5H2M5 19H2M3 12H2" stroke="#292D32"></path>
                            </svg>
                            Donate (Coming soon)
                        </a>
                    </li>
                    <li>
                        <div className="LhUcpE8AvJVc3kiaLSEJ"></div>
                    </li>
                    <li style={{
                        cursor: 'pointer',
                    }}>
                        <a onClick={handleLogoutClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                <path d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99M15 12H3.62m2.23-3.35L2.5 12l3.35 3.35" stroke="#292D32"></path>
                            </svg>
                            Đăng xuất
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AccountSidebar;
