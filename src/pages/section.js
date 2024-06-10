import React, { useState } from 'react';
import AccountSidebar from '../components/elements/AccountSidebar';
import SettingsPanelFollow from '../components/elements/SettingsPanelFollow';
import SectionList from '../components/elements/SectionList';
import SectionArticleFollowed from '../components/elements/SectionArticleFollowed';

const Section = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSectionList, setShowSectionList] = useState(false);
    const [showSettingsPanel, setShowSettingsPanel] = useState(true);
    const [refreshArticles, setRefreshArticles] = useState(false);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleToggleSectionList = () => {
        setShowSectionList(!showSectionList);
        setShowSettingsPanel(!showSettingsPanel);
        setRefreshArticles(!showSectionList); // Cập nhật trạng thái refreshArticles khi SectionList được hiển thị hoặc ẩn
    };

    const handleBackToDashboard = () => {
        setShowSectionList(false);
        setShowSettingsPanel(true);
        setRefreshArticles(true); // Cập nhật trạng thái refreshArticles khi quay lại dashboard
    };

    return (

        <div className="section-container">
            <div className="account-sidebar">
                <AccountSidebar />
            </div>
            <div className="section-content" >
                {showSectionList ? (
                    <SectionList searchTerm={searchTerm} handleBackToDashboard={handleBackToDashboard} />
                ) : (
                    <SectionArticleFollowed refresh={refreshArticles} />
                )}
            </div>
            <div className="settings-panel">
                {showSettingsPanel && <SettingsPanelFollow onToggleSectionList={handleToggleSectionList} buttonText="Thiết lập hiển thị" />}
            </div>
        </div>
    );
};

export default Section;