import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';

const StarRating = ({ articleId, token }) => {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const dispatch = useDispatch();

  const fetchAverageRating = useCallback(async (articleId, setAverageRating) => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.get(`/api/get-average-star?articleId=${articleId}`);
      if (response.status === 200) {
        setAverageRating(response.data);
      }
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response.data.message);
      }, 3000);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAverageRating(articleId, setAverageRating);
  }, [articleId, fetchAverageRating]);

  const handleRating = async (star) => {
    setRating(star);

    const data = {
      article: {
        id: articleId,
      },
      star: star,
    };

    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.post(
        'api/vote-star',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 3000);
      if (response.status === 200) {
        message.success("Đánh giá sao thành công");
        fetchAverageRating(articleId, setAverageRating); // Refresh the average rating
      } else {
        message.error("Đánh giá sao thất bại");
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 3000);
      if (error.response && error.response.status === 403) {
        message.error("Bạn không có quyền thực hiện đánh giá.");
      } else {
        message.error("Đánh giá thất bại.");
      }
    }
  };

  return (
    <div className="star-rating">
      <div className="average-rating">
        {averageRating !== null ? (
          <span>Sao trung bình: {averageRating.toFixed(1)} / 5.0</span>
        ) : (
          <span>Đang tải sao trung bình...</span>
        )}
      </div>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <i
            key={star}
            className={`fa-star ${star <= rating ? 'fas' : 'far'}`}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
