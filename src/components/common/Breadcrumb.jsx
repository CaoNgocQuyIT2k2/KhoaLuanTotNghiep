import Link from "next/link";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HIDE_SPINNER, SHOW_SPINNER } from "../../../store/constants/spinner";
import { message } from "antd";

const Breadcrumb = ({ aPage }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const categoryId = aPage;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        try {
          dispatch({ type: SHOW_SPINNER });
          const response = await axios.get(`/api/get-category-by-id?categoryId=${categoryId}`); // Make request to API route
          setData(response.data);
          setTimeout(() => {
            dispatch({ type: HIDE_SPINNER });
          }, 3000);
        } catch (error) {
          setTimeout(() => {
            dispatch({ type: HIDE_SPINNER });
            message.error(error.response?.data?.message);
          }, 3000);
        }
      }
    };
    fetchData();
  }, [categoryId,dispatch]);







  if (!data) {
    return <div></div>;
  }

  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>Trang chủ</a>
              </Link>
            </li>
            {data.parent && (
              <li className="breadcrumb-item">
                <Link href={`/category/${data.parent.id}`} >
                  <a>{data.parent.name}</a>
                </Link>
              </li>
            )}
            <li className="breadcrumb-item">
              <Link href={`/category/${data.id}`} >
                <a>{data.name}</a>
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
