import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import ButtonSaveArt from "../post-format/elements/ButtonSaveArt";
import Image from "next/image";

const defaultAvatarSrc = "/images/category/BgWhite.png"; // Default avatar source

const PostLayoutArtPerCat = ({ postSizeMd = false, postBgDark = false }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/LatestArticlePerCat"); // Make request to API route
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to limit the number of words in a string
  const limitWords = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        {data.map((article, index) => (
          <div key={index} className={`media post-block m-b-xs-30 ${postSizeMd ? "post-block__mid" : ""} ${postBgDark ? "post-block__on-dark-bg" : ""}`}>
            <Link href={`/${article.id}`}>
              <a className="align-self-center">
                {article.avatar ? (
                  <Image
                    src={article.avatar}
                    alt={article.title}
                    width={postSizeMd ? 230 : 150}
                    height={postSizeMd ? 210 : 150}
                  />
                ) : (
                  <Image
                    style={{ border: '1px solid black' }}
                    src={defaultAvatarSrc}
                    alt="Default Avatar"
                    width={postSizeMd ? 230 : 150}
                    height={postSizeMd ? 210 : 150}
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
              {postSizeMd ? <p className="mid">{limitWords(article.abstracts, 20)}</p> : ""}
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

export default PostLayoutArtPerCat;
