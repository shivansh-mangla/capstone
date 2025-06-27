import React from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUser,
} from 'react-icons/fa';

export default function HODSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/hod/dashboard', icon: <FaHome /> },
    { name: 'Accounts', path: '/hod/account', icon: <FaUser /> },
    { name: 'Coordinators', path: '/hod/coordinators', icon: <FaUser /> },
  ];

  return (
    <div className="sidebar">
      <div className="logo">ICMP</div>
      <nav className="menu">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.name}</span>
          </Link>
        ))}
        
      </nav>
    </div>
  );
}
