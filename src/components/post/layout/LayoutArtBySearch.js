import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HeadMeta from '../../elements/HeadMeta';
import HeaderOne from '../../header/HeaderOne';
import Breadcrumb from '../../common/Breadcrumb';
import PostLayoutArtBySearch from './PostLayoutArtBySearch';
import WidgetPost from '../../widget/WidgetPost';
import WidgetAd from '../../widget/WidgetAd';
import WidgetSocialShare from '../../widget/WidgetSocialShare';
import FooterOne from '../../footer/FooterOne';
import BackToTopButton from '../post-format/elements/BackToTopButton';

const LayoutArtBySearch = () => {
  const router = useRouter();
  const { slug } = router.query; // Lấy từ khóa tìm kiếm từ URL
  const [searchData, setSearchData] = useState([]);

  const keyList = slug;

  useEffect(() => {
    if (keyList) {
      const fetchSearchData = async () => {
        try {
          const response = await axios.get(`/api/search-article?keyList=${keyList}`);
          if (response.status === 200) {
            setSearchData(response.data);
          } else {
            console.error('Search failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchSearchData();
    }
  }, [keyList]); 

  return (
    <>
      <HeaderOne />
      <div className="banner banner__default bg-grey-light-three">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="post-title-wrapper">
                <h2 className="m-b-xs-0 axil-post-title hover-line">Search Results for: {slug}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="random-posts section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="axil-content">
                <PostLayoutArtBySearch searchData={searchData} postSizeMd={true} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetPost dataPost={searchData} />
                <WidgetAd />
                <WidgetSocialShare />
                <WidgetAd img="/images/clientbanner/clientbanner3.jpg" height={492} width={320} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOne />
      <BackToTopButton />
    </>
  );
};

export default LayoutArtBySearch;
