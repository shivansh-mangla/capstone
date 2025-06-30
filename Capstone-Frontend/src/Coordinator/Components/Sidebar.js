import React from 'react';
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserTie,
  FaUsers,
  FaClipboardList,
  FaCalendarAlt,
  FaCog,
} from 'react-icons/fa';

export default function CoordinatorSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/coordinator/dashboard', icon: <FaHome /> },
    { name: 'Accounts', path: '/coordinator/account', icon: <FaUserTie /> },
    { name: 'Academic Information', path: '/coordinator/academic-information', icon: <FaUserTie /> },
    { name: 'Time Table', path: '/coordinator/time-table', icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="coordinator-sidebar">
      <div className="coordinator-sidebar-logo">ICMP</div>
      <nav className="coordinator-sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`coordinator-sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="coordinator-sidebar-icon">{item.icon}</span>
            <span className="coordinator-sidebar-label">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
