import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Menu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('/api/getMenuData');
        setMenuData(response.data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <ul className="main-navigation list-inline">
      {menuData.slice(0,7).map((menuItem, index) => (
        menuItem.submenu ? (
          <li className="has-dropdown" key={index}>
            <Link href={menuItem.path}>
              <a>{menuItem.label}</a>
            </Link>
            <ul className="submenu">
              {menuItem.submenu.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <Link href={subItem.subpath}>
                    <a>{subItem.sublabel}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={index}>
            <Link href={menuItem.path}>
              <a>{menuItem.label}</a>
            </Link>
          </li>
        )
      ))}
    </ul>
  );
};

export default Menu;