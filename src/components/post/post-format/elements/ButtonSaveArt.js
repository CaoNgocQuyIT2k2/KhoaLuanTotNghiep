import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

const ButtonSaveArt = ({ articleId,onRemoveSaveArticle  }) => {
  const [isSaved, setIsSaved] = useState(false);
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/GetSavedArticle?articleId=${articleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        // Kiểm tra nếu có dữ liệu trả về và đang được lưu
        if (response.data && response.data.id) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } catch (error) {
        console.error('Error fetching saved status:', error);
      }
    };
  
    fetchData();
  }, [articleId, token]);
  

  const handleSaveArticle = async () => {
    try {
      const response = await axios.post(
        '/api/AddSaveArticle',
        { articleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.status === 200) {
        setIsSaved(true);
        console.log('Tạo tag thành công!');
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
        `/api/RemoveSaveArticle?articleId=${articleId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setIsSaved(false);
        console.log('Xóa bài đã lưu thành công!');
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
    <li >
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
