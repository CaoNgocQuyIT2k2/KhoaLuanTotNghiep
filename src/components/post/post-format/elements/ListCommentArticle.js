import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, List, Space, message } from 'antd';
import axios from 'axios';
import EditComment from './EditComment'; // Import EditComment component
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';

const ListCommentArticle = ({ articleId, commentPosted, setCommentPosted, token }) => {
  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');
  const [comments, setComments] = useState([]);
  const userId = useSelector((state) => state.user?.user?.id);
  const dispatch = useDispatch();
   
  const fetchCommentArticleDetail = useCallback(async () => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.get(`/api/get-comment-article?articleId=${articleId}`);
      setComments(response.data);
      setCommentPosted(false);
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response?.data?.message);
      }, 2000);
    }
  }, [articleId, setCommentPosted,dispatch]);

  useEffect(() => {
    if (articleId) {
      fetchCommentArticleDetail();
    }
  }, [articleId, commentPosted, fetchCommentArticleDetail,dispatch]);

  
  const handleUpdateComments = async (commentId, newComment) => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.post(`/api/update-comment?commentId=${commentId}`, {
        comment: newComment,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
        message.success('Sửa bình luận thành công.');
        fetchCommentArticleDetail();

      } else {
        message.error('Sửa bình luận thất bại');
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 2000);
      if (error.response && error.response.status === 403) {
        message.error('Bạn cần đăng nhập để thực hiện chức năng này');
      } else {
        message.error(error.response?.data?.message);
      }
    }
  };

  const handledelete = async (commentId) => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.delete(`/api/delete-comment?commentId=${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
        fetchCommentArticleDetail();
        message.success('Xóa bình luận thành công.');
      } else {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
        message.error('Xóa bình luận thất bại.');
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 2000);
        message.error(error.response?.data?.message);
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
                  onDelete={(commentId) => handledelete(commentId)}
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
