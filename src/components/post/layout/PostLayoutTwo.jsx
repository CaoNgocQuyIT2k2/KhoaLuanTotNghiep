import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonSaveArt from "../post-format/elements/ButtonSaveArt";
import Image from "next/image";

const defaultAvatarSrc = "/images/category/BgWhite.png";

const PostLayoutTwo = ({ postSizeMd, postBgDark }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Top6ReactArticle");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const firstColumnData = data.slice(0, Math.ceil(data.length / 2));
  const secondColumnData = data.slice(Math.ceil(data.length / 2));

  return (
    <div className="row">
      <div className="col-lg-6">
        {Array.isArray(firstColumnData) && firstColumnData.map((article, index) => (
          <div key={index} className={`media post-block m-b-xs-30 ${postSizeMd === true ? "post-block__mid" : ""} ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}>
            <Link href={`/${article.id}`}>
              <a className="align-self-center">
                {article.avatar ? (
                  <Image
                    src={article.avatar}
                    alt={article.title}
                    width={postSizeMd === true ? 285 : 150}
                    height={postSizeMd === true ? 285 : 150}
                  />
                ) : (
                  <Image
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
                  {article.author_name && (
                    <li>
                      <span>By</span>
                      <Link href={`/author/${slugify(article.author_name)}`}>
                        <a className="post-author">{article.author_name}</a>
                      </Link>
                    </li>
                  )}
                  <li>
                    <span>{new Date(article.create_date).toLocaleDateString()}</span>
                  </li>
                  <li>
                    <i className="" />
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
      </div>
      <div className="col-lg-6">
        {Array.isArray(secondColumnData) && secondColumnData.map((article, index) => (
          <div key={index} className={`media post-block m-b-xs-30 ${postSizeMd === true ? "post-block__mid" : ""} ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}>
            <Link href={`/${article.id}`}>
              <a className="align-self-center">
                {article.avatar ? (
                  <Image
                    src={article.avatar}
                    alt={article.title}
                    width={postSizeMd === true ? 285 : 150}
                    height={postSizeMd === true ? 285 : 150}
                  />
                ) : (
                  <Image
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
                  {article.author_name && (
                    <li>
                      <span>By</span>
                      <Link href={`/author/${slugify(article.author_name)}`}>
                        <a className="post-author">{article.author_name}</a>
                      </Link>
                    </li>
                  )}
                  <li>
                    <span>{new Date(article.create_date).toLocaleDateString()}</span>
                  </li>
                  <li>
                    <i className="" />
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
      </div>
    </div>
  );
};

export default PostLayoutTwo;
