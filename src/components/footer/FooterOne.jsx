import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import SocialLink from '../../data/social/SocialLink.json';

const FooterOne = () => {
  const [categories, setCategories] = useState([]);
  const [childMenus, setChildMenus] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/api/GetParentCategories');
        const parentCategories = response.data;
        // Lấy 7 danh mục cha đầu tiên
        const firstSevenCategories = parentCategories.slice(0, 6);
        setCategories(firstSevenCategories);

        // Lấy danh sách child categories cho tất cả các parent categories
        firstSevenCategories.forEach(category => {
          GetChildCategories(category.id);
        });
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    getCategories();
  }, []);

  const GetChildCategories = async (categoryId) => {
    try {
      console.log('Fetching child categories:', categoryId);
      const response = await axios.get('/api/GetChildCategories', {
        params: { categoryId }
      });
      const childCategories = response.data;
      setChildMenus(prev => ({ ...prev, [categoryId]: childCategories }));
    } catch (error) {
      console.error("Error fetching child categories:", error);
    }
  };

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
              {/* End of .brand-logo-container */}
            </div>
            {/* End of .col-md-6 */}
            <div className="col-md-auto">
              <div className="footer-social-share-wrapper">
                <div className="footer-social-share">
                  <div className="axil-social-title">Find us here</div>
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
              {/* End of .footer-social-share-wrapper */}
            </div>
            {/* End of .col-md-6 */}
          </div>
          {/* End of .row */}
        </div>
        {/* End of .footer-mid */}
        <div className="footer-bottom">
          <ul className="footer-bottom-links">
            <li>
              <Link href="/">
                <a>Terms of Use</a>
              </Link>
            </li>
            {/* Các li khác giữ nguyên */}
          </ul>
          {/* End of .footer-bottom-links */}
          <p className="axil-copyright-txt">
            © {new Date().getFullYear()}. All rights reserved by Your Company.
          </p>
        </div>
        {/* End of .footer-bottom */}
      </div>
      {/* End of .container */}
    </footer>
  );
};

export default FooterOne;
