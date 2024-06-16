import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import ButtonSaveArt from "../post-format/elements/ButtonSaveArt";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { HIDE_SPINNER, SHOW_SPINNER } from "../../../../store/constants/spinner";

const defaultAvatarSrc = "/images/category/BgWhite.png"; // Default avatar source

const PostLayoutNewest = ({ postSizeMd, postBgDark }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
      dispatch({ type: SHOW_SPINNER });
        const response = await axios.get("/api/top-5-newest");
        setData(response.data);
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 3000);
      } catch (error) {
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
          message.error(error.response.data.message);
        }, 3000);
      }
    };

    fetchData();
  }, [dispatch]);


  return (
    <div className="row">
      <div className="col-lg-12">
        {Array.isArray(data) && data.slice(1).map((article, index) => ( // Change from firstColumnData to data
          <div key={index} className={`media post-block m-b-xs-30 ${postSizeMd === true ? "post-block__mid" : ""} ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}>
            <Link href={`/${article.id}`}>
              <a className="align-self-center">
                {article.avatar ? (
                  <Image
                    src={article.avatar} // Sử dụng đường dẫn ảnh từ dữ liệu article
                    alt={article.title}
                    width={postSizeMd === true ? 285 : 150}
                    height={postSizeMd === true ? 285 : 150}
                  />
                ) : (
                  <Image
                    className="defaultImage"
                    src={defaultAvatarSrc}
                    alt={article.title}
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
                      <span>Bởi</span>
                      <Link href={`/author/${slugify(article.author_name)}`}>
                        <a className="post-author">{article.author_name}</a>
                      </Link>
                    </li>
                  )}
                  <li>
                    <span>
                    </span>
                    <span>{new Date(article.create_date).toLocaleDateString()}</span>
                  </li>
                  <li>
                    <i className="" />
                    {article.reading_time} phút

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
      </div>
    </div>
  );
};

export default PostLayoutNewest;
