import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ButtonSaveArt = ({ articleId, onRemoveSaveArticle, categoryId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSaved = await axios.get(`/api/get-saved-art-by-cat?categoryId=${categoryId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const savedArticles = responseSaved.data;

        // Tìm kiếm articleId
        const article = savedArticles.find(article => article.id === articleId);
        if (article) {
          setIsSaved(true);
        }
        else {
          setIsSaved(false);
        }
      } catch (error) {
        console.error('Error fetching saved status:', error);
      }
    };

    fetchData();
  }, [articleId, token, categoryId]);


  const handleSaveArticle = async () => {
    try {
      const response = await axios.post(
        '/api/add-save-article',
        { articleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setIsSaved(true);

      } else {
        console.error('Tạo tag thất bại.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        console.error('Unauthorized');
      } else {
        console.error('Internal Server Error');
      }
    }
  };

  const handleRemoveSaveArticle = async () => {
    try {
      const response = await axios.delete(
        `/api/remove-save-article?articleId=${articleId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setIsSaved(false);

        onRemoveSaveArticle();
      } else {
        console.error('Xóa bài đã lưu thất bại.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        console.error('Unauthorized');
      } else {
        console.error('Internal Server Error');
      }
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
        title={isSaved ? "saved" : "save"}
      >
      </button>
    </li>
  );
};

export default ButtonSaveArt;
