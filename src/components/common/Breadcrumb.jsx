import Link from "next/link";
import axios from 'axios';
import React, { useEffect, useState } from "react";

const Breadcrumb = ({ aPage }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const categoryId = aPage;

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(`/api/GetCategoryById?categoryId=${categoryId}`); // Make request to API route

          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(error);
        }
      }
    };
    fetchData();
  }, [categoryId]);


  console.log("data", data);




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
                <a>Home</a>
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
