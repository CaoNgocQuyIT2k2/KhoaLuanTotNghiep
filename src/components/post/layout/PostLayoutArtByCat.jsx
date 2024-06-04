import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Pagination } from 'antd'; // Import Pagination from antd

const defaultAvatarSrc = "/images/category/BgWhite.png"; // Default avatar source

const PostLayoutArtByCat = ({ postSizeMd, postBgDark, categoryId }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of posts per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getArtByCat?categoryId=${categoryId}`); // Make request to API route
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="row">
      <div className="col-lg-12">
        {currentData.map((article, index) => (
          <div key={index} className={`media post-block m-b-xs-30 ${postSizeMd === true ? "post-block__mid" : ""} ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}>
            <Link href={`/${article.id}`}>
              <a className="align-self-center">
                {article.avatar ? (
                  <img
                    src={article.avatar} // Sử dụng đường dẫn ảnh từ dữ liệu article
                    alt={article.title}
                    width={postSizeMd === true ? 285 : 150}
                    height={postSizeMd === true ? 285 : 150}
                  />
                ) : (
                  <img
                    style={{ border: '1px solid black' }}
                    src={defaultAvatarSrc}
                    alt="Default Avatar"
                    width={postSizeMd === true ? 285 : 150}
                    height={postSizeMd === true ? 285 : 150}
                  />
                )}
              </a>
            </Link>
            <div className="media-body">
              <div className="post-cat-group m-b-xs-10">
                <Link href={`/category/${article.category.id}`}>
                  <a className={`post-cat cat-btn ${article.cate_bg ?? "bg-color-blue-one"}`}>{article.category.name}</a>
                </Link>
              </div>
              <h3 className="axil-post-title hover-line hover-line">
                <Link href={`/${article.id}`}>
                  <a>{article.title}</a>
                </Link>
              </h3>
              {postSizeMd === true ?
                <p className="mid">{article.abstracts}</p>
                : ""
              }
              <div className="post-metas">
                <ul className="list-inline">
                  {article.author_name !== undefined && article.author_name !== "" && (
                    <li>
                      <span>By</span>
                      <Link href={`/author/${slugify(article.author_name)}`}>
                        <a className="post-author">{article.author_name}</a>
                      </Link>
                    </li>
                  )}
                  <li>
                    <span></span>
                    <span>{new Date(article.create_date).toLocaleDateString()}</span>
                  </li>
                  <li>
                    <i className="feather icon-activity" />
                    {article.reading_time} min
                  </li>
                  <li>
                    <i className="" />
                    {article.artSource}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ textAlign: 'center', marginTop: '20px' }}
        />
      </div>
    </div>
  );
};

export default PostLayoutArtByCat;
