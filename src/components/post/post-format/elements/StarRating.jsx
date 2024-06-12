import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const StarRating = ({ articleId, token }) => {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    fetchAverageRating(articleId, setAverageRating);
  }, [articleId]);

  const fetchAverageRating = async (articleId, setAverageRating) => {
    try {
      const response = await axios.get(`/api/GetAverageStar?articleId=${articleId}`);
      if (response.status === 200) {
        setAverageRating(response.data);
      } 
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleRating = async (star) => {
    setRating(star);

    const data = {
      article: {
        id: articleId
      },
      star: star
    };

    try {
      const response = await axios.post(
        '/api/VoteStar',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        message.success(response.data.message);
        fetchAverageRating(articleId, setAverageRating); // Refresh the average rating
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
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
        {averageRating !== null && averageRating.averageStar !== undefined ? (
          <span>Sao trung bình: {averageRating.averageStar.toFixed(1)} / 5.0</span>
        ) : (
          <span>Loading average rating...</span>
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
