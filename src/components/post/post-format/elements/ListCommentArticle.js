import React, { useEffect, useState } from 'react';
import { Avatar, List, Space } from 'antd';
import axios from 'axios';
import EditComment from './EditComment'; // Import EditComment component
import { useSelector } from 'react-redux';

const ListCommentArticle = ({ articleId, commentPosted, setCommentPosted,token }) => {
  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');
  const [comments, setComments] = useState([]);
  const userId = useSelector((state) => state.user?.user?.user.id);
  console.log("userId",userId);
  useEffect(() => {
    if (articleId) {
      fetchCommentArticleDetail();
    }
  }, [articleId, commentPosted]);

  const fetchCommentArticleDetail = async () => {
    try {
      const response = await axios.get(`/api/getCommentArticle?articleId=${articleId}`);
      setComments(response.data);
      setCommentPosted(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleUpdateComments = () => {
    fetchCommentArticleDetail();
  };


  const handleDeleteComment = (commentId) => {
    // Xử lý sự kiện xóa comment
    console.log('Delete comment:', commentId);
  };

  return (
    <>
      <Space direction="vertical" style={{ marginBottom: '20px' }} size="middle">
        {/* Additional UI elements, if any */}
      </Space>
      <List
        pagination={{
          position,
          align,
          pageSize: 5,
        }}
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.user.avatar || `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.user.id}`} />}
              title={<a href={`https://ant.design/user/${item.user.username}`}>{`${item.user.firstname} ${item.user.lastname}`}</a>}
              description={
                <div>
                  <p className="text-xl">{item.comment}</p>
                  <p>{formatDate(item.create_date)}</p>
                </div>
              }
            />
             {item.user.id === userId ? ( // Kiểm tra token
              <Space direction="vertical">
                <EditComment onEdit={() => handleUpdateComments(item.id)} onDelete={() => handleDeleteComment(item.id)} />
              </Space>
            ) : null}
          </List.Item>
        )}
      />
    </>
  );
};

export default ListCommentArticle;
