import React, { useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUser,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaHistory,
  FaBell,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function StudentSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: <FaHome /> },
    {
      name: "Course Improvement",
      path: "/student/course-improvement",
      icon: <FaBook />,
    },
    { name: "Accounts", path: "/student/account", icon: <FaUser /> },
    { name: "Fees Payment", path: "/student/fees", icon: <FaMoneyCheckAlt /> },
    { name: "History", path: "/student/history", icon: <FaHistory /> },
    { name: "Notification/Status", path: "/student/status", icon: <FaBell /> },
    { name: "FAQs", path: "/student/faq", icon: <FaCog /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`student-sidebar ${isOpen ? "open" : ""}`}>
        {/* Close button for mobile */}
        <button className="sidebar-close-button" onClick={closeSidebar}>
          <FaTimes />
        </button>

        <div className="student-sidebar-logo">ICMP</div>
        <nav className="student-sidebar-menu">
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`student-sidebar-menu-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="student-sidebar-icon">{item.icon}</span>
              <span className="student-sidebar-label">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
