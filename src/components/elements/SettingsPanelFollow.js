import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const SettingsPanelFollow = ({ onToggleSectionList, buttonText }) => {
    const token = useSelector((state) => state.user?.token);

    const [expanded, setExpanded] = useState({});
    const [menuData, setMenuData] = useState([]);
    const [followedParentCategories, setFollowedParentCategories] = useState([]);
    const [followedChildCategories, setFollowedChildCategories] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [randomCategories, setRandomCategories] = useState([]);
    const [followedCategories, setFollowedCategories] = useState([]); // New state for followed categories

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const menuResponse = await axios.get('/api/GetMenuData');
                const menuData = menuResponse.data;
                const parentCategoriesResponse = await axios.get('/api/GetFollowParentCat', { headers: { Authorization: `Bearer ${token}` } });
                const parentCategories = parentCategoriesResponse.data;

                const updatedMenuData = menuData.map(menuItem => {
                    const parentCategory = parentCategories.find(category => category.name === menuItem.label);
                    return {
                        ...menuItem,
                        submenu: menuItem.submenu.map(subItem => ({
                            ...subItem,
                            id: subItem.subpath.split('/category/')[1]
                        }))
                    };
                });

                setMenuData(updatedMenuData);
                setFollowedParentCategories(parentCategories);

                const allChildCategories = [];
                for (let parentCategory of parentCategories) {
                    const childCategoriesResponse = await axios.get(`/api/GetFollowChildCat?categoryId=${parentCategory.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    allChildCategories.push(...childCategoriesResponse.data);
                }
                setFollowedChildCategories(allChildCategories);

                // Combine followed parent and child categories
                const followedCategories = [
                    ...parentCategories.map(category => category.id),
                    ...allChildCategories.map(category => category.id)
                ];
                setFollowedCategories(followedCategories);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchMenuData();
    }, [token]);

    useEffect(() => {
        axios.get('/api/GetAllCategories')
            .then(response => {
                const allCategories = response.data;
                const childCategories = allCategories.filter(category => category.parent !== null);
                const randomSixCategories = getRandomItems(childCategories, 5);
                setRandomCategories(randomSixCategories);

                // Fetch and set followed status for random categories
                randomSixCategories.forEach(async (category) => {
                    const parentCategoryId = category.parent.id;
                    const childCategoriesResponse = await axios.get(`/api/GetFollowChildCat?categoryId=${parentCategoryId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const followedChildCategories = childCategoriesResponse.data;
                    const followedCategoryIds = followedChildCategories.map(cat => cat.id);
                    if (followedCategoryIds.includes(category.id)) {
                        setFollowedCategories(prevState => [...prevState, category.id]);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching random categories:', error);
            });
    }, [token]);

    const toggleExpand = (section) => {
        setExpanded(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const followCategory = async (categoryId) => {
        try {
            const response = await axios.post(
                '/api/FollowCategory',
                { category: { id: categoryId } },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                // Update the followed categories state
                setFollowedCategories(prevState => [...prevState, categoryId]);

                setExpanded(prevState => ({
                    ...prevState,
                    [categoryId]: true
                }));
            } else {
                console.error('Failed to follow category.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const unfollowCategory = async (categoryId) => {
        try {
            const response = await axios.delete(
                `/api/UnfollowCategory?categoryId=${categoryId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                // Update the followed categories state
                setFollowedCategories(prevState => prevState.filter(id => id !== categoryId));

                setExpanded(prevState => ({
                    ...prevState,
                    [categoryId]: false
                }));
            } else {
                console.error('Failed to unfollow category.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  

    const getRandomItems = (array, count) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handleShowAllCategories = () => {
        onToggleSectionList(); // Call the onToggleSectionList function to show the SectionList
    };

    return (
        <div className='content page-content news-container'>
            <div className='hnDnbfcbh83CEOdzrSbo Xo5xrsxPNPYjB719aAqB'>
                <div className="EuVqRNSHwaT2WVLgaTBM">
                    <div className="X2HVKAqHJh34QBZXCHQg">
                        <button className="yQjyaga6JQDCbBwcMUsg" onClick={onToggleSectionList}>
                            <span>{buttonText}</span>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 8.7C21 4.9 19.1 3 15.3 3H7.7C3.9 3 2 4.9 2 8.7v7.6C2 20.1 3.9 22 7.7 22H10" stroke="#0F6C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M2 14h8M6 8h4M17.5 19.125a1.625 1.625 0 1 0 0-3.25 1.625 1.625 0 0 0 00 3.25Z" stroke="#0F6C32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12.086 17.976v-.953c0-.564.46-1.03 1.03-1.03.98 0 1.38-.693.887-1.543a1.029 1.029 0 0 1 .38-1.403l.937-.536a.904.904 0 0 1 1.235.325l.06.103c.487.85 1.288.85 1.781 0l.06-.103a.904.904 0 0 1 1.235-.325l.937.536c.493.282.66.915.38 1.403-.494.85-.093 1.544.887 1.544.564 0 1.03.46 1.03 1.029v.953c0 .564-.46 1.03-1.03 1.03-.98 0-1.38.693-.888 1.543a1.027 1.027 0 0 1-.379 1.403l-.937.536a.904.904 0 0 1-1.235-.325l-.06-.103c-.487-.85-1.289-.85-1.782 0l-.06.103a.904.904 0 0 1-1.234.325l-.937-.536a1.029 1.029 0 0 1-.38-1.403c.493-.85.092-1.544-.888-1.544-.569 0-1.03-.465-1.03-1.029Z" stroke="#0F6C32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <div className="gOUscEOscjTNuwhyh2vq">
                            <div className="qvTyCBfUMQHsYYLKb5Mf">Gợi ý</div>
                            <hr />
                            <div>
                                <div className="r2LqPeTg8U0GIKtjcpNH">
                                    <span>Gợi ý chuyên mục</span>
                                    <button onClick={handleShowAllCategories}>Tất cả</button>
                                </div>
                                {randomCategories.map((category, index) => (
                                    <div key={index} className="KDAmLTmeHztQqYZbZeFd">
                                        <Link href={`/category/${category.id}`}>
                                            <a href="/the-gioi.htm" className="Y8ihR3A9g54t3GgpB4GY">{category.name}</a>
                                        </Link>
                                        {followedCategories.includes(category.id) ? (
                                            <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu RXCflJFIOBK8xwKJ7xv2 kGRXLSMESFZzLPG7yXhS" title="Đang theo dõi" onClick={() => unfollowCategory(category.id)}>
                                                <span style={{ color: 'black' }}>
                                                    Đang theo dõi
                                                </span>
                                            </button>
                                        ) : (
                                            <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu RXCflJFIOBK8xwKJ7xv2 kGRXLSMESFZzLPG7yXhS" title="Theo dõi" onClick={() => followCategory(category.id)}>
                                                <span>
                                                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 8h8m-4 4V4" stroke="#0F6C32" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg> Theo dõi
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SettingsPanelFollow;
