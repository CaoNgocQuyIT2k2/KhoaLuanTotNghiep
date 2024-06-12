import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../../../../utils";



// Hàm để định dạng ngày giờ
const formatDateTime = (dateTimeString) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Sử dụng định dạng 24 giờ
  };
  const date = new Date(dateTimeString);
  return date.toLocaleString('vi-VN', options);
};
const MetaDataOne = ({ metaData }) => {
  console.log("MetaDataOne", metaData);
  return (
    <div className="banner banner__single-post banner__standard">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="post-title-wrapper">
              <div className="btn-group">
                <Link  href={`/category/${metaData.category?.id}`} >
                  <a className={`cat-btn  bg-color-blue-one`}>{metaData.category?.name}</a>
                </Link>
              </div>
              <h2 className="m-t-xs-20 m-b-xs-0 axil-post-title hover-line">{metaData.title}</h2>
              <div className="post-metas banner-post-metas m-t-xs-20">
                <ul className="list-inline">
                  <li>
                    <i className="feather arrow-up" /> <span></span>
                    {formatDateTime(metaData.category?.create_date)}
                  </li>
                  <li>
                    <i className="" />
                    {metaData.reading_time} min
                  </li>
                  {/* <li>
                    <i className="feather icon-eye" />
                    {metaData.post_views}
                  </li>
                  <li>
                    <i className="feather icon-share-2" />
                    {metaData.post_share}
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="post-main-thumbnail">
              <Image
                src={metaData.avatar}
                alt={metaData.title}
                width={953} // Update width based on API data
                height={834} // Update height based on API data
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetaDataOne;
