import React from 'react';
import './StatCard.css';

const StatCard = ({ type, count, color, icon, onClick }) => {
    return (
        <div className="stat-card" style={{ backgroundColor: color }} onClick={onClick}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-info">
                <h4>{type}</h4>
                <p>{count}</p>
            </div>
        </div>
    );
};

export default StatCard;
