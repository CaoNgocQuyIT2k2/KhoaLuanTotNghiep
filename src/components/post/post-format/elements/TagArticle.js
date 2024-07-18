import React, { useEffect, useState } from 'react';
import { Divider, Flex, Tag, Spin, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';

const TagArticle = ({articleId}) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTags = async () => {
      try {
      dispatch({ type: SHOW_SPINNER });
        const response = await axios.get(`/api/get-tag-article?article_id=${articleId}`);
        setTags(response.data);
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
          message.error(error.response?.data?.message);
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [articleId,dispatch]);

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Divider orientation="left"></Divider>
      <Flex gap="4px 0" wrap>
        {tags.map((tag) => (
          <Tag key={tag.id} color="#108ee9">
            {tag.value}
          </Tag>
        ))}
      </Flex>
    </>
  );
};

export default TagArticle;
