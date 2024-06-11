import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import ButtonSaveArt from "./ButtonSaveArt";

const SocialShareSide = ({ articleId }) => {
  const [windowPath, setwindowPath] = useState(null);
  const token = useSelector((state) => state.user?.token); 

  const [reactData, setReactData] = useState({
    LIKE: 0,
    HEART: 0,
    CLAP: 0,
    STAR: 0
  });

  useEffect(() => {
    setwindowPath(window.location.href);
    fetchData();
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


  const handleReaction = async (typeReact) => {
    try {
      const response = await axios.post(
        '/api/ReactArticle',
        { article: { id: articleId }, typeReact },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.status === 200) {
        fetchData(); // Refresh data after successful vote
        console.log('Article saved successfully!');

      }
    } catch (error) {
      console.error("Error submitting reaction:", error);
    }
  };
console.log("articleId",articleId);


console.log("savedArticleId",articleId);

  return (
    <div className="post-details__SaveArt mt-2">
       <ul className="SaveArt SaveArt__with-bg SaveArt__vertical">
       <ButtonSaveArt articleId={articleId}/>
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
