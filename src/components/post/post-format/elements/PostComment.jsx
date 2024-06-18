import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from "../../../contact/FormGroup";
import ListCommentArticle from './ListCommentArticle';
import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';
import { message } from 'antd';

const PostComment = ({ articleId, parentId, token }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [commentPosted, setCommentPosted] = useState(false); // Step 1
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const commentData = {
      article: { id: articleId },
      comment,
      parent: parentId ? { id: parentId } : null,
    };



    try {
      if(!token){
        message.error("Bạn cần đăng nhập để bình luận");
        return;
      }
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.post(
        '/api/create-comment',
        commentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setSuccess('Bình luận thành công!');
        setComment(''); // Clear the comment field
        setCommentPosted(true); // Step 2
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 3000);
      } else {
        message.error('Bình luận thất bại.');
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 3000);
      if (error.response && error.response.status === 403) {
        message.error('Bạn cần đăng nhập để thực hiện chức năng này');
      } else {
        message.error(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-comment-area">
      <div className="comment-box">
        <h2>Hãy để lại bình luận</h2>
        <p>
          Địa chỉ email của bạn sẽ không bị công khai
          <span className="primary-color">*</span>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="comment-form row m-b-xs-60">
        <div className="col-12">
          <FormGroup
            pClass="comment-message-field"
            label="Bình luận"
            type="textarea"
            name="comment-message"
            rows={2}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Dang đăng...' : 'Đăng bình luận'}
          </button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <ListCommentArticle articleId={articleId} commentPosted={commentPosted} setCommentPosted={setCommentPosted} token={token}/> {/* Step 3 */}
    </div>
  );
};

export default PostComment;
