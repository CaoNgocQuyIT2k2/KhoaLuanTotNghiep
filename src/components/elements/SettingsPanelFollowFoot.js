import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const SettingsPanelFollowFoot = ({ onToggleSectionList, buttonText }) => {
    const token = useSelector((state) => state.user?.token);

    const [expanded, setExpanded] = useState({});
    const [randomCategories, setRandomCategories] = useState([]);
    const [followedCategories, setFollowedCategories] = useState([]); // New state for followed categories



    const toggleExpand = (section) => {
        setExpanded(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };


    const handleShowAllCategories = () => {
        onToggleSectionList(); // Call the onToggleSectionList function to show the SectionList
    };

    return (
        <div className='content page-content news-container'>
            <div className='hnDnbfcbh83CEOdzrSbo Xo5xrsxPNPYjB719aAqB'>
                <div className="EuVqRNSHwaT2WVLgaTBM">
                    <div className="X2HVKAqHJh34QBZXCHQg ">
                        <button className="A5aze9nOBiDAXsQh3BYi " onClick={onToggleSectionList}>
                            <span>Thêm nội dung yêu thích</span>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 8.7C21 4.9 19.1 3 15.3 3H7.7C3.9 3 2 4.9 2 8.7v7.6C2 20.1 3.9 22 7.7 22H10" stroke="#0F6C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M2 14h8M6 8h4M17.5 19.125a1.625 1.625 0 1 0 0-3.25 1.625 1.625 0 0 0 00 3.25Z" stroke="#0F6C32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M12.086 17.976v-.953c0-.564.46-1.03 1.03-1.03.98 0 1.38-.693.887-1.543a1.029 1.029 0 0 1 .38-1.403l.937-.536a.904.904 0 0 1 1.235.325l.06.103c.487.85 1.288.85 1.781 0l.06-.103a.904.904 0 0 1 1.235-.325l.937.536c.493.282.66.915.38 1.403-.494.85-.093 1.544.887 1.544.564 0 1.03.46 1.03 1.029v.953c0 .564-.46 1.03-1.03 1.03-.98 0-1.38.693-.888 1.543a1.027 1.027 0 0 1-.379 1.403l-.937.536a.904.904 0 0 1-1.235-.325l-.06-.103c-.487-.85-1.289-.85-1.782 0l-.06.103a.904.904 0 0 1-1.234.325l-.937-.536a1.029 1.029 0 0 1-.38-1.403c.493-.85.092-1.544-.888-1.544-.569 0-1.03-.465-1.03-1.029Z" stroke="#0F6C32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SettingsPanelFollowFoot;
