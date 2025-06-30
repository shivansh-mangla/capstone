import React from 'react';
import './StatCard.css';

const StatCard = ({ type, count, color, icon, onClick }) => {
    return (
        <div className="hod-stat-card" style={{ backgroundColor: color }} onClick={onClick}>
            <div className="hod-stat-icon">{icon}</div>
            <div className="hod-stat-info">
                <h4>{type}</h4>
                <p>{count}</p>
            </div>
        </div>
    );
};

export default StatCard;