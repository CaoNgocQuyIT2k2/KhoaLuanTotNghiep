// src/pages/[article_id].js

import React from 'react';
import { useRouter } from 'next/router';
import PostFormatStandard from '../components/post/post-format/PostFormatStandard';
import HeaderOne from '../components/header/HeaderOne';
import FooterOne from '../components/footer/FooterOne';
import Breadcrumb from '../components/common/Breadcrumb';
import BackToTopButton from '../components/post/post-format/elements/BackToTopButton';

const PostPage = () => {
  const router = useRouter();
  const { article_id } = router.query;

  // if (!article_id) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <HeaderOne />
      <Breadcrumb articleId={article_id} />
      <PostFormatStandard articleId={article_id} />;
      <FooterOne />
    <BackToTopButton />

    </>
  );
};

export default PostPage;
