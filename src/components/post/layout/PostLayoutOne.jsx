import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../utils";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonSaveArt from "../post-format/elements/ButtonSaveArt";
import { useDispatch } from "react-redux";
import { HIDE_SPINNER, SHOW_SPINNER } from "../../../../store/constants/spinner";
import { message } from "antd";

const defaultAvatarSrc = "/images/category/BgWhite.png"; // Default avatar source

const PostLayoutOne = () => {
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
                  }, 2000);
            } catch (error) {
                setTimeout(() => {
                    dispatch({ type: HIDE_SPINNER });
                    message.error(error.response?.data?.message);
                  }, 2000);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="axil-latest-post">
            {data.slice(0, 1).map((post) => (
                <div key={post.id} className="media post-block m-b-xs-20">
                    <figure className="fig-container">
                        <Link href={`/${post.id}`}>
                            <a>
                                {post.avatar ? (
                                    <Image
                                        src={post.avatar}
                                        alt={post.title}
                                        width={540}
                                        height={540}
                                    />
                                ) : (
                                    <Image
                                        src={defaultAvatarSrc}
                                        alt={"Default Avatar"}
                                        width={540}
                                        height={540}
                                        className="defaultImage"
                                    />
                                )}
                            </a>
                        </Link>
                        <div className="post-cat-group m-b-xs-10">
                            <Link href={`/category/${post.category.id}`}>
                                <a className={`post-cat cat-btn ${post.category.second_name ?? "bg-color-blue-one"}`}>
                                    {post.category.name}
                                </a>
                            </Link>
                        </div>
                    </figure>
                    <div className="media-body">
                        <h3 className="axil-post-title hover-line hover-line">
                            <Link href={`/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </h3>
                        <div className="post-metas">
                            <ul className="list-inline">
                                {post.author_name !== undefined && post.author_name !== "" && (
                                    <li>
                                        <span>Bởi</span>
                                        <Link href={`/author/${slugify(post.author_name)}`}>
                                            <a className="post-author">{post.author_name}</a>
                                        </Link>
                                    </li>
                                )}
                                <li className="dot">
                                    <span>
                                    </span>
                                    <span>{new Date(post.create_date).toLocaleDateString()}</span>
                                </li>

                                <li>
                                    <i className="" />
                                    {post.reading_time} phút
                                </li>
                                <li>
                                    <i className="" />
                                    {post.artSource}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostLayoutOne;
