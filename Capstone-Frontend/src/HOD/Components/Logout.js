import React from 'react'
import './Logout.css'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("ICMPTokenHod");
        navigate("/login");
    };

    return (
        <div className="hod-top-row" >
            <button className="hod-logout-button" onClick={handleLogout}>
                Log Out <span className="hod-logout-icon">➡️</span>
            </button>
        </div>
    )
}
