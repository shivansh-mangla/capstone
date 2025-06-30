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
    { name: 'Dashboard', path: '/doaa/dashboard', icon: <FaHome /> },
    { name: 'Coordinators', path: '/doaa/coordinators', icon: <FaBook /> },
    { name: 'Clashing Requests', path: '/doaa/clashing-requests', icon: <FaUser /> },
    { name: 'Clashing Stats', path: '/doaa/clashing-stats', icon: <FaMoneyCheckAlt /> },
    { name: 'Account', path: '/doaa/account', icon: <FaUser /> }
    
  ];

  return (
    <div className="doaa-sidebar">
      <div className="doaa-sidebar-logo">ICMP</div>
      <nav className="doaa-sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`doaa-sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="doaa-sidebar-icon">{item.icon}</span>
            <span className="doaa-sidebar-label">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
