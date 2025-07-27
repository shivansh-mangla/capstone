import React from 'react'
import './Logout.css'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();



    const handleLogout = () => {
        localStorage.removeItem("ICMPTokenStudent");
        navigate("/login");
    };
    
  return (
      <div className="student-logout-top-row" >
          <button className="student-logout-button" onClick={handleLogout}>
              Log Out <span className="logout-icon">➡️</span>
          </button>
      </div>
  )
}
