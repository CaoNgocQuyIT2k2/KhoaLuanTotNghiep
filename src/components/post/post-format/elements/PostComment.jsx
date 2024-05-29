import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from "../../../contact/FormGroup";
import ListCommentArticle from './ListCommentArticle';

const PostComment = ({ articleId, parentId, token }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [commentPosted, setCommentPosted] = useState(false); // Step 1

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  console.log('articleId:', articleId); // Debug log

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

    console.log('Comment data being sent:', commentData); // Debug log

    try {
      const response = await axios.post(
        '/api/CreateComment',
        commentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setSuccess('Bình luận thành công!');
        setComment(''); // Clear the comment field
        setCommentPosted(true); // Step 2
      } else {
        setError('Bình luận thất bại.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        setError('Unauthorized');
      } else {
        setError('Internal Server Error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-comment-area">
      <div className="comment-box">
        <h2>Leave A Reply</h2>
        <p>
          Your email address will not be published.
          <span className="primary-color">*</span>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="comment-form row m-b-xs-60">
        <div className="col-12">
          <FormGroup
            pClass="comment-message-field"
            label="Comment"
            type="textarea"
            name="comment-message"
            rows={2}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Posting...' : 'POST COMMENT'}
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
