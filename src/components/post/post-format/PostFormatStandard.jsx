import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import MetaDataOne from "./elements/meta/MetaDataOne";
import PostComment from "./elements/PostComment";
import SocialShareSide from "./elements/SocialShareSide";
import WidgetPostRanSameCat from '../../widget/WidgetPostRanSameCat';
import StarRating from './elements/StarRating';
import TagArticle from './elements/TagArticle';

const PostFormatStandard = ({ articleId, allData }) => {
  const [postData, setPostData] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token); // Lấy token từ state.user.user.token
  console.log("token", token);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!articleId) return;

      try {
        const response = await fetch(`/api/GetArtDetail?article_id=${articleId}`);
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [articleId]);

  if (!postData) {
    return <div>Loading...</div>;
  }
console.log("postData", postData);
  // Check if postData.content exists and is a string before parsing it
  const parsedContent = postData.content && typeof postData.content === 'string' ? parse(postData.content) : null;

  return (
    <>
      <MetaDataOne metaData={postData} />
      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <main className="site-main">
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    <SocialShareSide articleId={articleId}  />
                    {parsedContent}
                  </div>
                </article>
                <TagArticle articleId={articleId}/>
                <StarRating articleId={articleId} token={token}/>
                <hr className="m-t-xs-50 m-b-xs-60" />
                <PostComment articleId={articleId} token={token} />
              </main>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetPostRanSameCat dataPost={postData} />
                <WidgetPost dataPost={allData} />
                <WidgetAd />
                <WidgetNewsletter />
                <WidgetSocialShare />
                <WidgetInstagram />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatStandard;
