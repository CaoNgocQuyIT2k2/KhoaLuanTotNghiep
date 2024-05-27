// src/components/Breadcrumb.js

import Link from "next/link";
import axios from 'axios';
import React from "react";

const Breadcrumb = ({ articleId }) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await axios.get(`/api/getArtDetail?article_id=${articleId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching article detail:", error);
        setError(error.message);
      }
    };

    if (articleId) {
      fetchArticleDetail();
    }
  }, [articleId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/category/${data.category.parent.name}`} >
                <a>{data.category.parent.name}</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/category/${data.category.name}`} >
                <a>{data.category.name}</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{data.title}</li>
          </ol>
          {/* End of .breadcrumb */}
        </nav>
      </div>
      {/* End of .container */}
    </div>
  );
};

export default Breadcrumb;
