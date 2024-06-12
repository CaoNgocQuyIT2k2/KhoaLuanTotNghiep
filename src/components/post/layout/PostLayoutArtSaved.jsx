import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import { useSelector } from "react-redux";
import Image from "next/image";

const defaultAvatarSrc = "/images/category/BgWhite.png";

const PostLayoutArtSaved = ({ postSizeMd, postBgDark, categoryId }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = useSelector((state) => state.user?.token);

    const pageSize = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/GetListArticleSaved`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [categoryId, token]); // Thêm 'token' vào mảng phụ thuộc của useEffect
    
    console.log("data", data);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <div className="row">
            <div className="col-lg-12">
                {currentData.map((article, index) => (
                    <div key={index} className={`media post-block m-b-xs-30 ${postSizeMd ? "post-block__mid" : ""} ${postBgDark ? "post-block__on-dark-bg" : ""}`}>
                        <Link href={`/${article.article.id}`}>
                            <a className="align-self-center">
                                {article.article.avatar ? (
                                    <Image
                                        src={article.article.avatar}
                                        alt={article.article.title}
                                        width={postSizeMd ? 285 : 150}
                                        height={postSizeMd ? 285 : 150}
                                    />
                                ) : (
                                    <Image
                                        style={{ border: '1px solid black' }}
                                        src={defaultAvatarSrc}
                                        alt="Default Avatar"
                                        width={postSizeMd ? 285 : 150}
                                        height={postSizeMd ? 285 : 150}
                                    />
                                )}
                            </a>
                        </Link>
                        <div className="media-body">
                            <div className="post-cat-group m-b-xs-10">
                                <Link href={`/category/${article.article.category.id}`}>
                                    <a className={`post-cat cat-btn ${article.article.cate_bg ?? "bg-color-blue-one"}`}>{article.article.category.name}</a>
                                </Link>
                            </div>
                            <h3 className="axil-post-title hover-line">
                                <Link href={`/${article.article.id}`}>
                                    <a>{article.article.title}</a>
                                </Link>
                            </h3>
                            {postSizeMd &&
                                <p className="mid">{article.article.abstracts}</p>
                            }
                            <div className="post-metas">
                                <ul className="list-inline">
                                    {article.article.author_name && (
                                        <li>
                                            <span>By</span>
                                            <Link href={`/author/${slugify(article.article.author_name)}`}>
                                                <a className="post-author">{article.article.author_name}</a>
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <span></span>
                                        <span>{new Date(article.article.create_date).toLocaleDateString()}</span>
                                    </li>
                                    <li>
                                        <i className="feather icon-activity" />
                                        {article.article.reading_time} min
                                    </li>
                                    <li>
                                        <i className="" />
                                        {article.article.artSource}
                                    </li>
                                    <li className="saved-icon">
                                        <a href="#" style={{
                                           fontSize: '1rem',
                                            color:  "black",
                                            marginRight: '20px',
                                        }} title="Unsave" >
                                           
                                        </a>
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

export default PostLayoutArtSaved;