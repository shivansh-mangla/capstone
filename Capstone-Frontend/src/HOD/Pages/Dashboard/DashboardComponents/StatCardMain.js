import React from 'react';
import './StatCardMain.css';

const StatCard = ({ type, count, color, icon, onClick }) => {
    return (
        <div className="stat-card-main" style={{ backgroundColor: color }} onClick={onClick}>
            <div className="stat-icon-main">{icon}</div>
            <div className="stat-info-main">
                <h4>{type}</h4>
                <p>{count}</p>
            </div>
        </div>
    );
};

export default StatCard;