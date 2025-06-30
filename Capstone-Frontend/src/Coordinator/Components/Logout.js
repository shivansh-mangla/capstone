import React from 'react'
import './Logout.css'

export default function Logout() {



    const handleLogout = () => {
        // Add logout logic here (e.g., clearing session, redirecting)
        console.log('Logged out');
    };
    
  return (
      <div className="coordinator-top-row" >
          <button className="coordinator-logout-button" onClick={handleLogout}>
              Log Out <span className="coordinator-logout-icon">➡️</span>
          </button>
      </div>
  )
}
