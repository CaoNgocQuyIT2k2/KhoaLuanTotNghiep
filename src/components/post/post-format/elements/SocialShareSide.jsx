import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import ButtonSaveArt from "./ButtonSaveArt";

const SocialShareSide = ({ articleId }) => {
  const [windowPath, setWindowPath] = useState(null);
  const token = useSelector((state) => state.user?.token);

  const fetchData = useCallback(async () => {
    try {
      const types = ['LIKE', 'HEART', 'CLAP', 'STAR'];
      const promises = types.map(type => axios.get(`/api/GetReactByArticle?articleId=${articleId}&typeReact=${type}`));
      const responses = await Promise.all(promises);

      // Extract quantity values from each response's data
      const data = responses.reduce((acc, response, index) => {
        const type = types[index];
        acc[type] = response.data[type]; // Get quantity value from response.data and assign it to acc[type]
        return acc;
      }, {});

      // Update reactData state with the extracted quantity data
      setReactData(data);
    } catch (error) {
      console.error("Error fetching react data:", error);
    }
  }, [articleId]);

  const [reactData, setReactData] = useState({
    LIKE: 0,
    HEART: 0,
    CLAP: 0,
    STAR: 0
  });

  useEffect(() => {
    setWindowPath(window.location.href);
    fetchData();
  }, [articleId, fetchData]);

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
