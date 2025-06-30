import React from 'react'
import './Logout.css'

export default function Logout() {
    const handleLogout = () => {
        // Add logout logic here (e.g., clearing session, redirecting)
        console.log('Logged out');
    };

    return (
        <div className="hod-top-row" >
            <button className="hod-logout-button" onClick={handleLogout}>
                Log Out <span className="hod-logout-icon">➡️</span>
            </button>
        </div>
    )
}
