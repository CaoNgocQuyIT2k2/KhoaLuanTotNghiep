import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ButtonBackSide = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <button
      style={{ fontWeight: 'bold', marginLeft: '-8px', color: 'black' }}
      onClick={handleBackClick}
      className="back-button"
    >
      <ArrowLeftOutlined />
      Trở về
    </button>
  );
};

export default ButtonBackSide;
