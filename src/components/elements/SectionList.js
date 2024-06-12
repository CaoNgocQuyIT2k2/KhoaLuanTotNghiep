import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { div } from '@tensorflow/tfjs-core';

const SectionList = (props) => {
    const [expanded, setExpanded] = useState({});
    const [menuData, setMenuData] = useState([]);
    const [followedParentCategories, setFollowedParentCategories] = useState([]);
    const [followedChildCategories, setFollowedChildCategories] = useState([]);
    const [searchText, setSearchText] = useState('');
    const token = useSelector((state) => state.user?.token);
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

                for (let parentCategory of parentCategories) {
                    console.log("arentCategory.id",parentCategory.id);
                    const childCategoriesResponse = await axios.get(`/api/GetFollowChildCat?categoryId=${parentCategory.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setFollowedChildCategories(prev => [...prev, ...childCategoriesResponse.data]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchMenuData();
    }, [token]);

    const toggleExpand = (section) => {
        setExpanded(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const isParentCategoryFollowed = (categoryId) => {
        return followedParentCategories.some(category => category.id === categoryId);
    };

    const isChildCategoryFollowed = (categoryId) => {
        return followedChildCategories.some(category => category.id === categoryId);
    };

    const followCategory = async (categoryId) => {
        try {
            const response = await axios.post(
                '/api/FollowCategory',
                { category: { id: categoryId } },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const allParent = await axios.get('/api/GetAllParent');
            
            if (response.status === 200) {
                const parentCategoriesResponse = await axios.get('/api/GetFollowParentCat', { headers: { Authorization: `Bearer ${token}` } });
                const parentCategories = parentCategoriesResponse.data;
                setFollowedParentCategories(parentCategories);

                const allChildCategories = [];
                for (let parentCategory of parentCategories) {
                    const childCategoriesResponse = await axios.get(`/api/GetFollowChildCat?categoryId=${parentCategory.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    allChildCategories.push(...childCategoriesResponse.data);
                }
                setFollowedChildCategories(allChildCategories);

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
                const parentCategoriesResponse = await axios.get('/api/GetFollowParentCat', { headers: { Authorization: `Bearer ${token}` } });
                const parentCategories = parentCategoriesResponse.data;
                setFollowedParentCategories(parentCategories);

                setExpanded(prevState => ({
                    ...prevState,
                    [categoryId]: false
                }));

                const followedChildCategories = [];
                for (let parentCategory of parentCategories) {
                    const childCategoriesResponse = await axios.get(`/api/GetFollowChildCat?categoryId=${parentCategory.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    followedChildCategories.push(...childCategoriesResponse.data);
                }
                setFollowedChildCategories(followedChildCategories);
            } else {
                console.error('Failed to unfollow category.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const followCategoryChild = async (categoryId) => {
        try {
            // Check if the category is already followed
            const isAlreadyFollowed = followedChildCategories.some(category => category.id === categoryId);
            if (!isAlreadyFollowed) {
                // Follow category child
                const response = await axios.post(
                    '/api/FollowCategory',
                    { category: { id: categoryId } },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
    
                if (response.status === 200) {
                    // Add the followed category to the state
                    setFollowedChildCategories(prev => [...prev, { id: categoryId }]);
    
                    // Update parent category state if necessary
                    const parentCategory = menuData.find(menuItem => menuItem.submenu.some(subItem => subItem.id === categoryId));
                    if (parentCategory && !isParentCategoryFollowed(parentCategory.id)) {
                        setFollowedParentCategories(prev => [...prev, { id: parentCategory.id }]);
                    }
                } else {
                    console.error('Failed to follow category.');
                }
            } else {
                console.log('Category already followed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    


    const unfollowCategoryChild = async (categoryId) => {
        try {
            const response = await axios.delete(
                `/api/UnfollowCategory?categoryId=${categoryId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                const followedChildCategoriesCopy = [...followedChildCategories];
                const index = followedChildCategoriesCopy.findIndex(item => item.id === categoryId);
                if (index !== -1) {
                    followedChildCategoriesCopy.splice(index, 1);
                }
                setFollowedChildCategories(followedChildCategoriesCopy);

                // Kiểm tra và cập nhật trạng thái của cate cha
                const parentCategory = menuData.find(menuItem => menuItem.submenu.some(subItem => subItem.id === categoryId));
                if (parentCategory) {
                    const allChildUnfollowed = parentCategory.submenu.every(subItem =>
                        !followedChildCategoriesCopy.some(childCategory => childCategory.id === subItem.id)
                    );
                    if (allChildUnfollowed) {
                        unfollowCategory(parentCategory.id);
                    }
                } else {
                    console.error('Failed to unfollow category.');
                }
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    const filterMenuData = (menuData, searchText) => {
        return menuData.filter(section => {
            const filteredSubMenu = section.submenu.filter(subItem =>
                subItem.sublabel.toLowerCase().includes(searchText.toLowerCase())
            );
            return filteredSubMenu.length > 0 || section.label.toLowerCase().includes(searchText.toLowerCase());
        });
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredMenuData = filterMenuData(menuData, searchText);

    return (
        <div className='hnDnbfcbh83CEOdzrSbo'>
            <div>
                <div className="Ccoa5Slfcman_7DtENdO">
                    <a href="#" onClick={props.handleBackToDashboard}>Bảng tin của bạn</a>
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m7 5.36 2.174 2.173a.662.662 0 0 1 0 .934L7 10.64" stroke="#888" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <a href="#">Thiết lập</a>
                </div>
                <h4>Theo dõi chuyên mục</h4>
            </div>
            <div className="Ae8Z5BKVF0S0yz_wDIkg ">
                <div className="search-container mb-5">
                    <input
                        type="text"
                        placeholder="Tìm kiếm chuyên mục..."
                        onChange={handleSearchChange}
                    />
                </div>
                {filteredMenuData.map((section, index) => (
                    <div key={index}>
                        <div className="MwTn6zWG4_2tPHxA6yoG" style={{ display: 'flex' }}>
                            <div className="QIOCZgyVaqEM6CrHzKrl" href={`/${section.id}`}>
                                {section.label}
                            </div>
                            <div className="G8rMGWdreAGHVOvLGtIh">
                                <button className="GTl86OzEYpo2XsSsAfn8" onClick={() => toggleExpand(section.label)}>
                                    <span>Mở rộng</span>
                                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.667 4.667h10M2.667 8h4" stroke="#888" strokeLinecap="round"></path>
                                        <path d="m13.067 10-1.811 1.811a.552.552 0 0 1-.778 0L8.667 10" stroke="#888" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M2.667 11.334h4" stroke="#888" strokeLinecap="round"></path>
                                    </svg>
                                </button>
                                {isParentCategoryFollowed(section.id) ? (
                                    <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu kKAxMBA76wUDIG2C9F4w kGRXLSMESFZzLPG7yXhS" title="Bỏ theo dõi" onClick={() => unfollowCategory(section.id)}>
                                        <span>Đang theo dõi</span>
                                    </button>
                                ) : (
                                    <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu RXCflJFIOBK8xwKJ7xv2 kGRXLSMESFZzLPG7yXhS" title="Theo dõi" onClick={() => followCategory(section.id)}>
                                        <span>
                                            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 8h8m-4 4V4" stroke="#0F6C32" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            Theo dõi
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                        {expanded[section.label] && (
                            <div className="AOQgp6rl6lTaAjc_2xJR">
                                {section.submenu.map((subItem, subIndex) => (
                                    <div key={subIndex} className="MwTn6zWG4_2tPHxA6yoG" style={{ display: 'flex', marginLeft: '20px' }}>
                                        <div style={{ fontSize: '14px' }} className="QIOCZgyVaqEM6CrHzKrl" href={subItem.subpath}>
                                            {subItem.sublabel}
                                        </div>
                                        <div className="G8rMGWdreAGHVOvLGtIh btn-follow-child-cat">
                                            {isChildCategoryFollowed(subItem.id) ? (
                                                <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu kKAxMBA76wUDIG2C9F4w kGRXLSMESFZzLPG7yXhS" title="Bỏ theo dõi" onClick={() => unfollowCategoryChild(subItem.id)}>
                                                    <span>Đang theo dõi</span>
                                                </button>
                                            ) : (
                                                <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu RXCflJFIOBK8xwKJ7xv2 kGRXLSMESFZzLPG7yXhS" title="Theo dõi" onClick={() => followCategoryChild(subItem.id)}>
                                                    <span>
                                                        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4 8h8m-4 4V4" stroke="#0F6C32" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                        Theo dõi
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default SectionList;

