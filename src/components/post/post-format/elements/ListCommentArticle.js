import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, List, Space, message } from 'antd';
import axios from 'axios';
import EditComment from './EditComment'; // Import EditComment component
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const ListCommentArticle = ({ articleId, commentPosted, setCommentPosted, token }) => {
  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');
  const [comments, setComments] = useState([]);
  const userId = useSelector((state) => state.user?.user?.id);
  
  const fetchCommentArticleDetail = useCallback(async () => {
    try {
      const response = await axios.get(`/api/GetCommentArticle?articleId=${articleId}`);
      setComments(response.data);
      setCommentPosted(false);
    } catch (error) {
      console.error(error.message);
    }
  }, [articleId, setCommentPosted]);

  useEffect(() => {
    if (articleId) {
      fetchCommentArticleDetail();
    }
  }, [articleId, commentPosted, fetchCommentArticleDetail]);

  
  const handleUpdateComments = async (commentId, newComment) => {
    try {
      const response = await axios.post(`/api/UpdateComment?commentId=${commentId}`, {
        comment: newComment,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        message.success('Sửa bình luận thành công.');
        fetchCommentArticleDetail();
      } else {
        message.error('Sửa bình luận thất bại');
      }
    } catch (error) {
      console.error(error.message);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`/api/DeleteComment?commentId=${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        fetchCommentArticleDetail();
        message.success('Xóa bình luận thành công.');
      } else {
        message.error('Xóa bình luận thất bại.');
      }
    } catch (error) {
      console.error(error.message);
      message.error('An error occurred while deleting the comment.');
    }
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
                  <p>{format(new Date(item.create_date), 'dd-MM-yyyy')}</p>
                </div>
              }
            />
            {item.user.id === userId ? ( // Kiểm tra token
              <Space direction="vertical">
                <EditComment
                  comment={item.comment} // Pass the current comment
                  commentId={item.id} // Pass the comment ID
                  onEdit={(commentId, newComment) => handleUpdateComments(commentId, newComment)}
                  onDelete={(commentId) => handleDeleteComment(commentId)}
                />
              </Space>
            ) : null}
          </List.Item>
        )}
      />
    </>
  );
};

export default ListCommentArticle;
