import React from 'react'
import './Logout.css'

export default function Logout() {



    const handleLogout = () => {
        // Add logout logic here (e.g., clearing session, redirecting)
        console.log('Logged out');
    };
    
  return (
      <div className="doaa-top-row" >
          <button className="doaa-logout-button" onClick={handleLogout}>
              Log Out <span className="logout-icon">➡️</span>
          </button>
      </div>
  )
}
