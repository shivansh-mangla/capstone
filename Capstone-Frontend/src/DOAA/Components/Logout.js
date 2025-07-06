import React from 'react'
import './Logout.css'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    const navigate = useNavigate();



    const handleLogout = () => {
        localStorage.removeItem("ICMPTokenDoaa");
        navigate("/login");
    };
    
  return (
      <div className="doaa-top-row" >
          <button className="doaa-logout-button" onClick={handleLogout}>
              Log Out <span className="logout-icon">➡️</span>
          </button>
      </div>
  )
}
