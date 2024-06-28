

import React from 'react';
import { useRouter } from 'next/router';
import Breadcrumb from "../../components/common/Breadcrumb";
import FooterOne from "../../components/footer/FooterOne";
import HeaderOne from "../../components/header/HeaderOne";
import BackToTopButton from "../../components/post/post-format/elements/BackToTopButton";
import ButtonBackSide from '../../components/post/post-format/elements/ButtonBackSide';
import PostPublic from '../../components/post/post-format/PostPublic';

const ArticlePending = () => {
  const router = useRouter();
  const { article_id } = router.query;

  // if (!article_id) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <HeaderOne/>
      <Breadcrumb articleId={article_id} />
      <ButtonBackSide/>
      <PostPublic articleId={article_id} />;
      <FooterOne />
      <BackToTopButton />

    </>
  );
};

export default ArticlePending;
