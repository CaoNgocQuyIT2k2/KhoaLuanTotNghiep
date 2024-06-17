import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../../../store/constants/spinner';
import { message } from 'antd';

const ButtonSaveArt = ({ articleId, onRemoveSaveArticle, categoryId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if(!token) {
        return;
      }
      try {
      dispatch({ type: SHOW_SPINNER });
        const responseSaved = await axios.get(`/api/get-saved-art-by-cat?categoryId=${categoryId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const savedArticles = responseSaved.data;
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 1000);
        // Tìm kiếm articleId
        const article = savedArticles.find(article => article.id === articleId);
        if (article) {
          setIsSaved(true);
        }
        else {
          setIsSaved(false);
        }
      } catch (error) {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
          message.error(error.response?.data?.message);
        }, 3000);
      }
    };

    fetchData();
  }, [articleId, token, categoryId,dispatch]);


  const handleSaveArticle = async () => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.post(
        '/api/add-save-article',
        { articleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 1000);
      if (response.status === 200) {
        setIsSaved(true);
        message.success('Lưu bài viết thành công.');
      }
      else {
        message.error('Lưu bài viết thất bại.');
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response?.data?.message);
      }, 3000);
    }
  };

  const handleRemoveSaveArticle = async () => {
    try {
      dispatch({ type: SHOW_SPINNER });
      const response = await axios.delete(
        `/api/remove-save-article?articleId=${articleId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
      }, 1000);
      if (response.status === 200) {
        setIsSaved(false);
        onRemoveSaveArticle();
        message.success('Bỏ lưu bài viết thành công.');
      } else {
        message.error('Bỏ lưu bài viết thất bại.');
      }
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response?.data?.message);
      }, 3000);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (isSaved) {
      handleRemoveSaveArticle();
    } else {
      handleSaveArticle();
    }
  };

  return (
    <li style={{
      listStyle: "none !important"
    }} >
      <button className={isSaved ? "saved-icon" : "save-icon"}
        onClick={handleClick}
        style={{
          fontSize: '1rem',
          color: 'black',
          marginRight: '20px',
        }}
        title={isSaved ? "Đã lưu" : "Lưu"}
      >
      </button>
    </li>
  );
};

export default ButtonSaveArt;
