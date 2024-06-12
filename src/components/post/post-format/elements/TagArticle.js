import React, { useEffect, useState } from 'react';
import { Divider, Flex, Tag, Spin } from 'antd';
import axios from 'axios';

const TagArticle = ({articleId}) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`/api/GetTagArticle?article_id=${articleId}`);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [articleId]);

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
