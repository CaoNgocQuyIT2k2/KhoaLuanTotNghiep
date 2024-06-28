import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { format } from 'date-fns';
import Image from 'next/image';
import HeaderOne from '../../header/HeaderOne';
import AccountSidebar from '../../elements/AccountSidebar';
import ButtonSaveArt from '../post-format/elements/ButtonSaveArt';
import FooterOne from '../../footer/FooterOne';
import BackToTopButton from '../post-format/elements/BackToTopButton';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../store/constants/spinner';
import { message } from 'antd';

function LayoutArtSaved() {

    const [articles, setSavedArticles] = useState([]);
    const [reload, setReload] = useState(false); // State để cập nhật lại giao diện
    const token = useSelector((state) => state.user?.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!token){
                    return;
                }
            dispatch({ type: SHOW_SPINNER });

                const response = await axios.get('/api/get-list-article-saved',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                setSavedArticles(response.data);
                setTimeout(() => {
                    dispatch({ type: HIDE_SPINNER });
                  }, 2000);
            } catch (error) {
                setTimeout(() => {
                    dispatch({ type: HIDE_SPINNER });
                    message.error(error.response?.data?.message);
                  }, 2000);
            }
        };
        fetchData();
    }, [token, reload,dispatch]); // Thêm reload vào dependency array để khi reload thì useEffect được kích hoạt lại

    const handleRemoveSaveArticle = () => {
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
                <div className="content page-content" data-module="account-page-content" data-content="saved-articles">
                    <div className="hnDnbfcbh83CEOdzrSbo">
                        <div className="i90yosMcsSc_JCyc1Blu">Tin đã lưu</div>
                        <div className="zCYCrHM0HRNVm7aSyF9a">
                            {articles.map(article => (
                                <div key={article.id} className="ZBwh0DJkg5FL71eqf3Yw">
                                    <div className="V1VBkDe4K3fhJ4uICwtR">
                                        <div className="DaX62uiePpKQmmJoLOs8">
                                            <a href={`/${article.article.id}`}>
                                                {article && article.article && article.article.avatar && (
                                                    <Image src={article.article.avatar} layout="fill" objectFit="cover" alt="thumbnail" />
                                                )}
                                            </a>
                                        </div>
                                        <div>
                                            <h3 className="UKXLyOM1eMF6VLstRRGz">
                                                <a href={`/${article.article.id}`}>{article.article.title}</a>
                                            </h3>
                                            <div className="Zpvur19KRg4zrXo69tbh">
                                                <div className="NzI0g5AmrlM03V_rgU5A">
                                                    <a className="u5YqKYE6VDc62PKWyGYA OC55iwpw0AojSkcTSDyH" href={`/category/${article.article.category.id}`}>{article.article.category.name}</a>-
                                                    <span>{format(new Date(article.article.create_date), 'dd-MM-yyyy')}</span>
                                                </div>
                                                <div className="kVunuOJJvyAdEERuRnUL">

                                                    <div
                                                    style={{
                                                        listStyle: 'none',
                                                    }} 
                                                    className="saved-article-20240609180238620 vLPsOJ4TxOzrC0g8QrVd  " title="Bỏ lưu bài viết">
                                                        <ButtonSaveArt categoryId={article.article && article.article.category && article.article.category?.id} articleId={article.article.id} onRemoveSaveArticle={handleRemoveSaveArticle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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

export default LayoutArtSaved;
