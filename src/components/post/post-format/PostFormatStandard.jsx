// src/components/post/post-format/PostFormatStandard.jsx
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import MetaDataOne from "./elements/meta/MetaDataOne";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";

const PostFormatStandard = ({ articleId, allData }) => {
  const [postData, setPostData] = useState(null);
console.log("Kiểm tra việc truyền article_id vào PostFormatStandard",articleId);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!articleId) return;

      try {
        const response = await fetch(`/api/getArtDetail?article_id=${articleId}`);
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

  const parsedContent = typeof postData.content === 'string' ? parse(postData.content) : null;

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
                    <SocialShareSide />
                    {parsedContent}
                  </div>
                </article>
                <SocialShareBottom />
                <hr className="m-t-xs-50 m-b-xs-60" />
                <PostComment />
              </main>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetAd />
                <WidgetNewsletter />
                <WidgetSocialShare />
                <WidgetPost dataPost={allData} />
                <WidgetInstagram />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostFormatStandard;
