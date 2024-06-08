import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SectionList = () => {
    const [expanded, setExpanded] = useState({});
    const [menuData, setMenuData] = useState([]);
    const [followedCategories, setFollowedCategories] = useState([]);
    const token = useSelector((state) => state.user.user.token);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await axios.get('/api/getMenuData');
                setMenuData(response.data);

           
                const getChildCategoriesResponse = await axios.get('/api/getListFollowCategory', { headers: { Authorization: `Bearer ${token}` } });
                setFollowedCategories(getChildCategoriesResponse.data);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            }
        };

        fetchMenuData();
    }, []);
console.log("followedCategories",followedCategories);
    const toggleExpand = (section) => {
        setExpanded(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const isCategoryFollowed = (categoryId) => {
        return followedCategories.includes(categoryId);
    };

    return (
        <div className="Ae8Z5BKVF0S0yz_wDIkg col-lg-3">
            <div className="MwTn6zWG4_2tPHxA6yoG" style={{ display: 'flex' }}>
                <div className="QIOCZgyVaqEM6CrHzKrl" href="/su-kien.htm">Sự kiện</div>
                <div className="G8rMGWdreAGHVOvLGtIh">
                    <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu RXCflJFIOBK8xwKJ7xv2 kGRXLSMESFZzLPG7yXhS" title="Theo dõi">
                        <span>
                            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8h8m-4 4V4" stroke="#0F6C32" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            Theo dõi
                        </span>
                    </button>
                </div>
            </div>

            {menuData.map((section, index) => (
                <div key={index}>
                    <div className="MwTn6zWG4_2tPHxA6yoG" style={{ display: 'flex' }}>
                        <div className="QIOCZgyVaqEM6CrHzKrl" href={section.path}>
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
                            <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu RXCflJFIOBK8xwKJ7xv2 kGRXLSMESFZzLPG7yXhS" title="Theo dõi">
                                <span>
                                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 8h8m-4 4V4" stroke="#0F6C32" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    Theo dõi
                                </span>
                            </button>
                        </div>
                    </div>
                    {expanded[section.label] && (
                        <div className="AOQgp6rl6lTaAjc_2xJR">
                            {section.submenu.map((subItem, subIndex) => (
                                <div key={subIndex} className="MwTn6zWG4_2tPHxA6yoG" style={{ display: 'flex', marginLeft: '20px' }}>
                                    <div style={{fontSize: '14px'}} className="QIOCZgyVaqEM6CrHzKrl" href={subItem.subpath}>
                                        {subItem.sublabel}
                                    </div>
                                    <div   className="G8rMGWdreAGHVOvLGtIh btn-follow-child-cat">
                                        <button className="O9VAherl4x0Mm97xjCIp s0Yr8xvVir_2KNnwycpu RXCflJFIOBK8xwKJ7xv2 kGRXLSMESFZzLPG7yXhS" title="Theo dõi">
                                            <span>
                                                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 8h8m-4 4V4" stroke="#0F6C32" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                {isCategoryFollowed(subItem.id) ? "Đang theo dõi" : "Theo dõi"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SectionList;
