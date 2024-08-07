import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { dateFormate } from "../../utils";
import MenuCategories from "./MenuCategories";
import { message } from "antd";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LogUser from "../post/post-format/elements/LogUser";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const SearchImage = dynamic(() => import("../objectDetector/SearchImage"), {
  ssr: false
});

const HeaderOne = () => {
  const user = useSelector((state) => state.user?.user);
  const router = useRouter();
  const menuRef = useRef();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchshow, setSearchShow] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    const toggleDropdownMenu = () => {
      const dropdownSelect = menuRef.current?.childNodes;
      let dropdownList = [];
      for (let i = 0; i < dropdownSelect?.length; i++) {
        const element = dropdownSelect[i];
        if (element.classList.contains("has-dropdown")) {
          dropdownList.push(element);
        }
      }
      if (dropdownSelect?.length > 0) {
        dropdownList.forEach((element) => {
          element.children[0].addEventListener("click", (e) => {
            e.preventDefault();
            if (element.classList.contains("active")) {
              element.classList.remove("active");
              element.childNodes[1].classList.remove("opened");
            } else {
              dropdownList.forEach((submenu) => {
                submenu.classList.remove("active");
                submenu.childNodes[1].classList.remove("opened");
              });
              element.classList.add("active");
              element.childNodes[1].classList.add("opened");
            }
          });
        });
      } else {
        console.error("Dropdown select is empty!");
      }
    };
    toggleDropdownMenu();
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      handleSearchButtonClick();
    }
  }, [searchKeyword]);

  const handleClose = () => {
    setSearchShow(false);
    setMobileToggle(false);
  };

  const handleShow = () => {
    setSearchShow(true);
    setMobileToggle(false);
  };

  const headerSearchShow = () => {
    setSearchShow(true);
    setMobileToggle(false);
  };

  const headerSearchClose = () => {
    setSearchShow(false);
    setMobileToggle(false);
  };

  const MobileMenuToggler = () => {
    if (searchshow) return;
    setMobileToggle(!mobileToggle);
    const HtmlTag = document.querySelector("html");
    const menuSelect = document.querySelectorAll(".main-navigation li");
    if (HtmlTag.classList.contains("main-menu-opened")) {
      HtmlTag.classList.remove("main-menu-opened");
    } else {
      setTimeout(() => {
        HtmlTag.classList.add("main-menu-opened");
      }, 800);
    }
    menuSelect.forEach((element) => {
      element.addEventListener("click", function () {
        if (!element.classList.contains("has-dropdown")) {
          HtmlTag.classList.remove("main-menu-opened");
          setMobileToggle(false);
        }
      });
    });
  };

  const handleSearchButtonClick = async () => {
    if (!searchKeyword) {
      message.error("Vui lòng nhập dữ liệu tìm kiếm");
      return;
    } else {
      router.push(`/search/${searchKeyword}`);
      setSearchKeyword(""); // Đặt lại searchKeyword về rỗng sau khi thực hiện tìm kiếm
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchButtonClick();
    }
  };

  const dateFormate = () => {
    return format(new Date(), 'EEEE, dd MMMM yyyy', { locale: vi });
  };

  if (!mount) return null;

  return (
    <>
      <header className="page-header">
        <div className="header-top bg-grey-dark-one">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md">
                <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
                  <li className="current-date">{dateFormate()}</li>
                </ul>
              </div>
              <div className="col-md-auto">
                <ul className="ml-auto social-share header-top__social-share">
                  {user ? (
                    <LogUser avatar={user.avatar} userName={user.firstname} />
                  ) : (
                    <li>
                      <Link href="/login">
                        <a>
                          <i className="feather icon-log-in" /> Đăng nhập
                        </a>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar bg-white">
          <div className="container">
            <div className="navbar-inner">
              <div className="brand-logo-container">
                <Link href="/">
                  <a>
                    <Image
                      src="/images/logo-black.svg"
                      alt="brand-logo"
                      width={102}
                      height={34}
                    />
                  </a>
                </Link>
              </div>
              <div className="main-nav-wrapper">
                <div ref={menuRef}>
                  <MenuCategories />
                </div>
              </div>
              <div className="navbar-extra-features ml-auto">
                <form
                  action="#"
                  className={`navbar-search ${searchshow ? "show-nav-search" : ""}`}
                >
                  <div className="search-field">
                    <input
                      type="text"
                      className="navbar-search-field"
                      placeholder="Tìm kiếm ở đây..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <SearchImage className="navbar-search-img btn-search-image" setSearchKeyword={setSearchKeyword} />
                    <button
                      className="navbar-search-btn"
                      type="button"
                      onClick={handleSearchButtonClick}
                    >
                      <i className="fal fa-search btn-seach-article" />
                    </button>
                  </div>
                  <span
                    className="navbar-search-close"
                    onClick={headerSearchClose}
                  >
                    <i className="fal fa-times" />
                  </span>
                </form>
                <button
                  className="nav-search-field-toggler"
                  onClick={headerSearchShow}
                >
                  <i className="far fa-search" />
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderOne;
