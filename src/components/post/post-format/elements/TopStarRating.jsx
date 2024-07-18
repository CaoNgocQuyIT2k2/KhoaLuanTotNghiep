import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';

const TopStarRatingTop = ({ articleId }) => {
  const [averageRatingTop, setAverageRatingTop] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAverageRatingTop = async (articleId) => {
      try {
        dispatch({ type: SHOW_SPINNER });
        const response = await axios.get(`/api/get-average-star?articleId=${articleId}`);
        if (response.status === 200) {
          setAverageRatingTop(response.data);
        }
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
          message.error(error.response?.data?.message);
        }, 2000);
      }
    };

    fetchAverageRatingTop(articleId);
  }, [articleId, dispatch]);

  if (averageRatingTop === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="star-rating ">
      <div className="average-rating">
        <p style={{ color: 'white', fontSize: '2rem' }}>
          {averageRatingTop && averageRatingTop.toFixed(1)}
        </p>
      </div>
      <div className="rating-stars">
        <i className="fa-star fas" />
      </div>
    </div>
  );
};

export default TopStarRatingTop;
