import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

const SocialShareSide = ({ articleId }) => {
  const [windowPath, setwindowPath] = useState(null);
  const token = useSelector((state) => state.user.user?.token); 
  const [isArticleSaved, setIsArticleSaved] = useState(false);
  const [savedArticleId, setSavedArticleId] = useState(null);

  const [reactData, setReactData] = useState({
    LIKE: 0,
    HEART: 0,
    CLAP: 0,
    STAR: 0
  });

  useEffect(() => {
    setwindowPath(window.location.href);
    fetchData();
    checkIfArticleIsSaved();
  }, [articleId]);

  const fetchData = async () => {
    try {
      const types = ['LIKE', 'HEART', 'CLAP', 'STAR'];
      const promises = types.map(type => axios.get(`/api/getReactByArticle?articleId=${articleId}&typeReact=${type}`));
      const responses = await Promise.all(promises);

      // Trích xuất giá trị số lượng từ dữ liệu trả về của mỗi response
      const data = responses.reduce((acc, response, index) => {
        const type = types[index];
        // Lấy giá trị số lượng từ response.data và gán cho acc[type]
        acc[type] = response.data[type];
        return acc;
      }, {});

      // Cập nhật state reactData với dữ liệu số lượng đã trích xuất
      setReactData(data);
    } catch (error) {
      console.error("Error fetching react data:", error);
    }
  };

  const checkIfArticleIsSaved = async () => {
    try {
      const response = await axios.get(`/api/getSavedArticle?id=${savedArticleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setIsArticleSaved(true); // Đánh dấu bài viết đã được lưu
      }
    } catch (error) {
      setIsArticleSaved(false); // Đánh dấu bài viết chưa được lưu
      console.error("Error checking if article is saved:", error);
    }
  };

  const handleReaction = async (typeReact) => {
    try {
      const response = await axios.post(
        '/api/ReactArticle',
        { article: { id: articleId }, typeReact },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.status === 200) {
        fetchData(); // Refresh data after successful vote
      }
    } catch (error) {
      console.error("Error submitting reaction:", error);
    }
  };
console.log("articleId",articleId);
  // Thêm hàm xử lý sự kiện cho nút Save
  const handleSaveArticle = async () => {
    try {
      const response = await axios.post(
        '/api/AddSaveArticle',
        { id: articleId },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.status === 200) {
        setSavedArticleId(response.data.id); // Lưu ID của bài viết đã được lưu
        setIsArticleSaved(true); // Đánh dấu bài viết đã được lưu
        console.log('Article saved successfully!');
      } else {
        console.error('Failed to save article.');
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };
console.log("savedArticleId",savedArticleId);
  const handleUnSaveArticle = async () => {
    try {
      const response = await axios.post(
        '/api/RemoveSaveArticle',
        { id: savedArticleId },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.status === 200) {
        setIsArticleSaved(false); // Đánh dấu bài viết chưa được lưu
        console.log('Article unsaved successfully!');
      } else {
        console.error('Failed to unsave article.');
      }
    } catch (error) {
      console.error("Error unsaving article:", error);
    }
  };

  // Thay đổi sự kiện onClick để chuyển đổi giữa handleSaveArticle và handleUnSaveArticle
  const handleSaveOrUnsaveArticle = () => {
    if (isArticleSaved) {
      handleUnSaveArticle();
    } else {
      handleSaveArticle();
    }
  };

  return (
    <div className="post-details__SaveArt mt-2">
       <ul className="SaveArt SaveArt__with-bg SaveArt__vertical">
       <li>
          <a href="#" className={`save-icon ${isArticleSaved ? "saved-icon" : ""}`} title={isArticleSaved ? "Unsave" : "Save"} onClick={handleSaveOrUnsaveArticle}></a>
        </li>
        </ul>
      <ul className="social-share social-share__with-bg social-share__vertical">
        
        <li title="Like">
          <a href="#" onClick={() => handleReaction('LIKE')}>
            <i className="fa-solid fa-thumbs-up"></i> {reactData.LIKE}
          </a>
        </li>
        <li title="Heart">
          <a href="#" onClick={() => handleReaction('HEART')}>
            <i className="fa-solid fa-heart"></i> {reactData.HEART}
          </a>
        </li>
        <li title="Clap">
          <a href="#" onClick={() => handleReaction('CLAP')}>
            <i className="fa-solid fa-hands-clapping"></i> {reactData.CLAP}
          </a>
        </li>
        <li title="Star">
          <a href="#" onClick={() => handleReaction('STAR')}>
            <i className="fa-solid fa-star"></i> {reactData.STAR}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialShareSide;
