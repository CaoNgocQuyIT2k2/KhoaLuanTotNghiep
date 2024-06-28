import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import SocialLink from '../../data/social/SocialLink.json';
import { useDispatch } from 'react-redux';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../../store/constants/spinner';
import { message } from 'antd';

const FooterOne = () => {
  const [categories, setCategories] = useState([]);
  const [childMenus, setChildMenus] = useState({});
  const dispatch = useDispatch();

  const GetChildCategories = useCallback(async (categoryId) => {
    try {
      const response = await axios.get('/api/get-child-categories', {
        params: { categoryId }
      });
      const childCategories = response.data;
      setChildMenus(prev => ({ ...prev, [categoryId]: childCategories }));
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: HIDE_SPINNER });
        message.error(error.response?.data?.message);
      }, 2000);
    }
  }, [dispatch]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        dispatch({ type: SHOW_SPINNER });

        const response = await axios.get('/api/get-parent-categories');
        const parentCategories = response.data;
        const firstSevenCategories = parentCategories.slice(0, 6);
        setCategories(firstSevenCategories);

        firstSevenCategories.forEach(category => {
          GetChildCategories(category.id);
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SPINNER });
        }, 2000);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    getCategories();
  }, [dispatch, GetChildCategories]);

  if (!categories.length) {
    return <div></div>;
  }

  return (
    <footer className="page-footer bg-grey-dark-key">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            {categories.map((category) => (
              <div className="col-lg-2 col-md-4 col-6" key={category.id}>
                <div className="footer-widget">
                  <h2 className="footer-widget-title">{category.name}</h2>
                  <ul className="footer-nav">
                    {(childMenus[category.id] || []).map((child) => (
                      <li key={child.id}>
                        <Link href={`/category/${child.id}`}>
                          <a className='footer-childcategory'>{child.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-mid">
          <div className="row align-items-center">
            <div className="col-md">
              <div className="footer-logo-container">
                <Link href="/">
                  <a>
                    <Image 
                      src="/images/logo-symbol.svg"
                      alt="footer logo"
                      className="footer-logo"
                      width={86}
                      height={28}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-auto">
              <div className="footer-social-share-wrapper">
                <div className="footer-social-share">
                  <div className="axil-social-title">Tìm chúng tôi ở đây</div>
                  <ul className="social-share social-share__with-bg">
                    <li>
                      <a href={SocialLink.fb.url}>
                        <i className={SocialLink.fb.icon} />
                      </a>
                    </li>
                    <li>
                      <a href={SocialLink.twitter.url}>
                        <i className={SocialLink.twitter.icon} />
                      </a>
                    </li>
                    <li>
                      <a href={SocialLink.yt.url}>
                        <i className={SocialLink.yt.icon} />
                      </a>
                    </li>
                    <li>
                      <a href={SocialLink.linked.url}>
                        <i className={SocialLink.linked.icon} />
                      </a>
                    </li>
                    <li>
                      <a href={SocialLink.pinterest.url}>
                        <i className={SocialLink.pinterest.icon} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <ul className="footer-bottom-links">
            <li>
              <Link href="/">
                <a>Điều khoản sử dụng</a>
              </Link>
            </li>
            {/* Các li khác giữ nguyên */}
          </ul>
          <p className="axil-copyright-txt">
            © {new Date().getFullYear()}. Mọi quyền được bảo lưu bởi Công ty của tôi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
