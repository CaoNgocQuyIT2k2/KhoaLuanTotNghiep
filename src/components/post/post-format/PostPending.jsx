import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import WidgetPost from "../../widget/WidgetPost";
import PostComment from "./elements/PostComment";
import SocialShareSide from "./elements/SocialShareSide";
import WidgetPostRanSameCat from '../../widget/WidgetPostRanSameCat';
import StarRating from './elements/StarRating';
import TagArticle from './elements/TagArticle';
import styled from 'styled-components';
import MetaDataOnePending from './elements/meta/MetaDataOnePending';
import ButtonBackSide from './elements/ButtonBackSide';

const CustomParagraph = styled.div`
  p {
    line-height: 1.5 !important;
    margin-bottom: 1.5rem !important;
  }
`;

const PostPending = ({ articleId, allData }) => {
  const [postData, setPostData] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!articleId) return;

      try {
        const response = await fetch(`/api/get-art-detail?article_id=${articleId}`);
        const data = await response.json();
        setPostData(data);

        // Check for contentEditable in the content
        if (data.content.includes('contentEditable')) {
          console.warn('Content contains contentEditable elements:', data.content);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [articleId]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  const parsedContent = postData.content && typeof postData.content === 'string' ? parse(postData.content) : null;

  // Using dangerouslySetInnerHTML for contentEditable elements
  const renderContent = () => {
    if (postData?.content?.includes('contentEditable')) {
      return <CustomParagraph dangerouslySetInnerHTML={{ __html: postData.content }} />;
    }
    return <CustomParagraph>{parsedContent}</CustomParagraph>;
  };
  
  return (
    <>
      <MetaDataOnePending metaData={postData} />
      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <main className="site-main">
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    {renderContent()}
                  </div>
                </article>
                <TagArticle articleId={articleId} />
                <StarRating articleId={articleId} token={token} />
                <hr className="m-t-xs-50 m-b-xs-60" />
                <PostComment articleId={articleId} token={token} />
              </main>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetPostRanSameCat dataPost={postData} />
                <WidgetPost dataPost={allData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPending;
