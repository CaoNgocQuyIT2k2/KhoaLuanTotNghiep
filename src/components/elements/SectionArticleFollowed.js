import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleFollowed from './ArticleFollowed';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import SettingsPanelFollowFoot from './SettingsPanelFollowFoot';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../store/constants/spinner';
import { message } from 'antd';

const SectionArticleFollowed = ({ refresh, onToggleSectionList }) => {
    const [articles, setArticles] = useState([]);
    const token = useSelector((state) => state.user?.token);
    const dispatch = useDispatch();

    useEffect(() => {
      
        const fetchArticles = async () => {
            try {
                if(!token) {
                    return;
                }
                dispatch({ type: SHOW_SPINNER });

                const response = await axios.get('/api/get-list-follow-article',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setArticles(response.data);
                setTimeout(() => {
                    dispatch({ type: HIDE_SPINNER });
                }, 3000);
            } catch (error) {
                setTimeout(() => {
                    dispatch({ type: HIDE_SPINNER });
                    message.error(error.response?.data?.message);
                }, 3000);
            }
        };

        fetchArticles();
    }, [refresh, token, dispatch]);

    return (
        <>
            <div className="y7idnc0MSa__siU3g_I3">
                <div className="i90yosMcsSc_JCyc1Blu">Bảng tin của bạn</div>
                <div className="zCYCrHM0HRNVm7aSyF9a">
                    <div className="infinite-scroll-component__outerdiv">
                        <div className="infinite-scroll-component" style={{ height: 'auto', overflow: 'unset' }}>
                            {articles.map((article, index) => (
                                <div key={article.id} className={index === articles.length - 1 ? 'last-article' : ''}>
                                    <ArticleFollowed
                                        articleId={article.id}
                                        title={article.title}
                                        imageUrl={article.avatar || '/path/to/default-image.jpg'} // Sử dụng ảnh mặc định nếu avatar không tồn tại
                                        category={article.category.name}
                                        categoryId={article.category.id}
                                        date={format(new Date(article.create_date), 'yyyy-MM-dd')}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <SettingsPanelFollowFoot onToggleSectionList={onToggleSectionList} />
            <div className='y7idnc0MSa__siU3g_I3'>
                <div className='zCYCrHM0HRNVm7aSyF9a'>
                    <div className="Xut0pP1LisWAWIKCzHdw">Thiết lập thêm chuyên mục và tác giả yêu thích để trải nghiệm cá nhân hoá tốt nhất dành cho bạn.</div>
                </div>
            </div>
        </>
    );
};

export default SectionArticleFollowed;
