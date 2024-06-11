import React, { useState } from 'react';
import AccountSidebar from '../components/elements/AccountSidebar';
import SettingsPanelFollow from '../components/elements/SettingsPanelFollow';
import SectionList from '../components/elements/SectionList';
import SectionArticleFollowed from '../components/elements/SectionArticleFollowed';
import FooterOne from "../components/footer/FooterOne";
import HeadMeta from "../components/elements/HeadMeta";
import HeaderOne from "../components/header/HeaderOne";
import Breadcrumb from "../components/common/Breadcrumb";
import BackToTopButton from '../components/post/post-format/elements/BackToTopButton';

const YourFeed = () => {
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
        setRefreshArticles(!showSectionList);
    };

    const handleBackToDashboard = () => {
        setShowSectionList(false);
        setShowSettingsPanel(true);
        setRefreshArticles(true);
    };

    return (
        <>
            <div className="header-sticky">
                <HeaderOne />
            </div>
            <div className="random-posts">
                <div className="">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="axil-content">
                                <div className="section-container">
                                    <div className="account-sidebar">
                                        <AccountSidebar />
                                    </div>
                                    <div className="section-content">
                                        {showSectionList ? (
                                            <SectionList searchTerm={searchTerm} handleBackToDashboard={handleBackToDashboard} />
                                        ) : (
                                            <SectionArticleFollowed onToggleSectionList={handleToggleSectionList} refresh={refreshArticles} />
                                        )}
                                    </div>
                                    <div className="settings-panel">
                                        {showSettingsPanel && <SettingsPanelFollow onToggleSectionList={handleToggleSectionList} buttonText="Thiết lập hiển thị" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BackToTopButton />
        </>
    );
};

export default YourFeed;

