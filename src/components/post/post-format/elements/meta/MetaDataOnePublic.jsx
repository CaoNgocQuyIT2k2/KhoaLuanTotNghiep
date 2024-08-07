import Image from "next/image";
import Link from "next/link";

const defaultAvatarSrc = "/images/category/BgWhite.png";


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
const MetaDataOnePublic = ({ metaData }) => {

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
                    {metaData.reading_time} phút
                  </li>
                  <li style={{
                    backgroundColor:'green',
                    color:'white',
                    padding:'5px',
                  }}>
                    Đã duyệt
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="post-main-thumbnail">
              {metaData.avatar ? (
                <Image
                  src={metaData.avatar}
                  alt={metaData.title}
                  width={953}
                  height={834}
                />
              ) : (
                <Image
                  className="defaultImage"
                  src={defaultAvatarSrc}
                  alt="Default Avatar"
                  width={953}
                  height={834}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetaDataOnePublic;
