import React from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaUser,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaHistory,
  FaBell,
  FaCog,
} from 'react-icons/fa';

export default function StudentSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <FaHome /> },
    { name: 'Course Improvement', path: '/student/course-improvement', icon: <FaBook /> },
    { name: 'Accounts', path: '/student/account', icon: <FaUser /> },
    { name: 'Fees Payment', path: '/student/fees', icon: <FaMoneyCheckAlt /> },
    { name: 'History', path: '/student/history', icon: <FaHistory /> },
    { name: 'Notification/Status', path: '/student/status', icon: <FaBell /> },
    { name: 'Setting', path: '/student/settings', icon: <FaCog /> },
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
