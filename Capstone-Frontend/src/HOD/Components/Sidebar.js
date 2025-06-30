import React from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaUser,
  FaMoneyCheckAlt
} from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();


  const menuItems = [
    { name: 'Dashboard', path: '/hod/dashboard', icon: <FaHome /> },
    { name: 'Accounts', path: '/hod/account', icon: <FaUser /> },
    { name: 'Coordinators', path: '/hod/coordinators', icon: <FaUser /> },
  ];

  return (
    <div className="hod-sidebar">
      <div className="hod-sidebar-logo">ICMP</div>
      <nav className="hod-sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`hod-sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="hod-sidebar-icon">{item.icon}</span>
            <span className="hod-sidebar-label">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

