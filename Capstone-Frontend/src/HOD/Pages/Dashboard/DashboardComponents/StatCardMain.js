import React from 'react';
import './StatCardMain.css';

const StatCard = ({ type, count, color, icon, onClick }) => {
    return (
        <div className="hod-stat-card-main" style={{ backgroundColor: color }} onClick={onClick}>
            <div className="hod-stat-icon-main">{icon}</div>
            <div className="hod-stat-info-main">
                <h4>{type}</h4>
                <p>{count}</p>
            </div>
        </div>
    );
};

export default StatCard;