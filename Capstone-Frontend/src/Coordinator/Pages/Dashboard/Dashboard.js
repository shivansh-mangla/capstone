import React, { useState } from 'react';
import CoordinatorSidebar from '../../Components/Sidebar';
import './Dashboard.css';

const initialRequests = [
  { name: 'Arnam Chaurasiya', year: '3rd', courses: 2, reason: 'TimeTable', date: '01 March, 2024', status: 'pending' },
  { name: 'Tina Sharma', year: '2nd', courses: 1, reason: 'Fees', date: '01 March, 2024', status: 'pending' },
  { name: 'Arnam Chaurasiya', year: '1st', courses: 3, reason: 'Fess', date: '01 March, 2024', status: 'pending' },
  { name: 'Arnam Chaurasiya', year: '2nd', courses: 1, reason: 'TimeTable', date: '01 March, 2024', status: 'pending' },
  { name: 'Arnam Chaurasiya', year: '3rd', courses: 1, reason: 'TimeTable', date: '01 March, 2024', status: 'pending' },
];

const statsMeta = [
  { label: 'Approved', status: 'approved', color: '#d4f8e8', icon: '✔️', textColor: '#1e4620' },
  { label: 'Pending', status: 'pending', color: '#f3e8ff', icon: '⏰', textColor: '#4b2e83' },
  { label: 'Rejected', status: 'rejected', color: '#e6f7fa', icon: '🚫', textColor: '#1e3a4b' },
];

const timetableUploads = [
  { name: 'Draft1.xlsx', year: '2025-2026', size: '1.24 MB', date: '7 January,2025', status: 'Implemented' },
];

const Dashboard = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState(null); // null means show all

  const handleStatusChange = (idx, newStatus) => {
    setRequests(prev => prev.map((req, i) => i === idx ? { ...req, status: newStatus } : req));
  };

  const handleStatClick = (status) => {
    setFilter(prev => prev === status ? null : status);
  };

  const filteredRequests = filter ? requests.filter(req => req.status === filter) : [];

  return (
    <div>
      <CoordinatorSidebar />
      <div className="coordinator-main-dashboard">
        <div className="coordinator-dashboard-top">
          <h2 className="coordinator-welcome">Welcome !</h2>
          <h4 className="coordinator-name">Name</h4>
          <div className="coordinator-applications-section">
            <div className="coordinator-donut-card">
              {/* Placeholder for donut chart */}
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="#f5f5fa" />
                <path d="M60 10 A50 50 0 1 1 59.9 10" fill="none" stroke="#a259e6" strokeWidth="15" />
                <text x="60" y="60" textAnchor="middle" dy=".3em" fontSize="22" fontWeight="bold" fill="#6c47b6">{requests.length}</text>
                <text x="60" y="80" textAnchor="middle" fontSize="12" fill="#888">Total Count</text>
              </svg>
              <div className="coordinator-donut-legend">
                <span style={{ color: '#a259e6', fontWeight: 'bold' }}>Approved {requests.filter(r => r.status === 'approved').length}</span>
                <span style={{ color: '#888' }}>Pending {requests.filter(r => r.status === 'pending').length}</span>
                <span style={{ color: '#b39ddb' }}>Rejected {requests.filter(r => r.status === 'rejected').length}</span>
              </div>
            </div>
            <div className="coordinator-stats-cards">
              {statsMeta.map((stat, idx) => (
                <div
                  key={idx}
                  className={`coordinator-stats-card${filter === stat.status ? ' active' : ''}`}
                  style={{ background: stat.color, color: stat.textColor, cursor: 'pointer', border: filter === stat.status ? '2px solid #726bff' : 'none' }}
                  onClick={() => handleStatClick(stat.status)}
                >
                  <div className="coordinator-stats-icon">{stat.icon}</div>
                  <div className="coordinator-stats-label">{stat.label}</div>
                  <div className="coordinator-stats-value">
                    {requests.filter(r => r.status === stat.status).length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="coordinator-dashboard-bottom">
          {filter && (
            <>
              <h2 className="coordinator-approved-title">{filter.charAt(0).toUpperCase() + filter.slice(1)} Requests</h2>
              <table className="coordinator-approved-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Year</th>
                    <th>Courses</th>
                    <th>Reason</th>
                    <th>Applied date</th>
                    {filter === 'pending' && <th>Status</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr><td colSpan={filter === 'pending' ? 6 : 5} style={{textAlign:'center'}}>No {filter} requests</td></tr>
                  ) : filteredRequests.map((req, idx) => (
                    <tr key={idx}>
                      <td className="coordinator-approved-avatar-cell">
                        <span className="coordinator-approved-avatar" />
                        {req.name}
                      </td>
                      <td>{req.year}</td>
                      <td>{req.courses}</td>
                      <td>{req.reason}</td>
                      <td>{req.date}</td>
                      {filter === 'pending' && (
                        <td>
                          <button className="status-btn accept" onClick={() => handleStatusChange(requests.findIndex(r => r === req), 'approved')}>Accept</button>
                          <button className="status-btn reject" onClick={() => handleStatusChange(requests.findIndex(r => r === req), 'rejected')}>Reject</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <h2 className="coordinator-approved-title">All Requests</h2>
          <table className="coordinator-approved-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Year</th>
                <th>Courses</th>
                <th>Reason</th>
                <th>Applied date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign:'center'}}>No requests</td></tr>
              ) : requests.map((req, idx) => (
                <tr key={idx}>
                  <td className="coordinator-approved-avatar-cell">
                    <span className="coordinator-approved-avatar" />
                    {req.name}
                  </td>
                  <td>{req.year}</td>
                  <td>{req.courses}</td>
                  <td>{req.reason}</td>
                  <td>{req.date}</td>
                  <td style={{textTransform:'capitalize'}}>{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
