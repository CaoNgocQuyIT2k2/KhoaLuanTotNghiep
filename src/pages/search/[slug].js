import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import WidgetAd from "../../components/widget/WidgetAd";
import WidgetSocialShare from "../../components/widget/WidgetSocialShare";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetCategory from "../../components/widget/WidgetCategory";
import PostLayoutArtBySearch from "../../components/post/layout/PostLayoutArtBySearch";

const PostCategory = () => {
  const router = useRouter();
  const { slug } = router.query; // Lấy từ khóa tìm kiếm từ URL
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (slug) {
      const fetchSearchData = async () => {
        try {
          const response = await axios.get('/api/Search', {
            params: { keyList: slug }
          });

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
  }, [slug]);

  return (
    <>
      <HeadMeta metaTitle={`Search Results for ${slug}`} />
      <HeaderOne />
      <Breadcrumb aPage={`Search Results for ${slug}`} />
      <div className="banner banner__default bg-grey-light-three">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="post-title-wrapper">
                <h2 className="m-b-xs-0 axil-post-title hover-line">Search Results for {slug}</h2>
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
                {/* <WidgetCategory cateData={searchData} /> */}
                <WidgetAd img="/images/clientbanner/clientbanner3.jpg" height={492} width={320} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOne />
    </>
  );
};

export default PostCategory;
