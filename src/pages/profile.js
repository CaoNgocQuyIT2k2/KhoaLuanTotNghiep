import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AccountSidebar from '../components/elements/AccountSidebar';
import FooterOne from '../components/footer/FooterOne';
import BackToTopButton from '../components/post/post-format/elements/BackToTopButton';
import HeaderOne from '../components/header/HeaderOne';
import Profile from '../components/post/layout/Profile';

function articleSaved() {

    const [articles, setSavedArticles] = useState([]);
    const [reload, setReload] = useState(false); // State để cập nhật lại giao diện
    const token = useSelector((state) => state.user?.token); 

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('/api/getListArticleSaved', 
                  { headers: { Authorization: `Bearer ${token}` }
              });
              setSavedArticles(response.data);
            } catch (error) {
              console.error('Error fetching saved articles:', error);
            }
          };
        fetchData();
    }, [token, reload]); // Thêm reload vào dependency array để khi reload thì useEffect được kích hoạt lại

    const handleRemoveSaveArticle = () => {
        // Xử lý xóa bài viết đã lưu ở đây
        // Sau khi xóa xong, setReload(true) để cập nhật lại giao diện
        setReload(true);
    };

    return (
        <>
        <HeaderOne />
        <div className="body container">
            <div className="sidebar" data-module="account-sidebar">
                <div className="_IOX7b9h3ehmfwCtcJlL">
                    <ul className="U2a29pIZKHe_zUk0rnP4">
                        <AccountSidebar />
                    </ul>
                </div>
            </div>
            <div className="content1 page-content" data-module="account-page-content" data-content="saved-articles">
                <div>
                    <Profile/>
                </div>
            </div>
            <div className="infinite-scroll-component__outerdiv">
                <div className="infinite-scroll-component " style={{ height: "auto", overflow: "auto" }}>
                </div>
            </div>
        </div>
        <FooterOne />
        <BackToTopButton />
        </>

    );
}

export default articleSaved;
