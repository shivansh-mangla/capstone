import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import StatCard from './DashboardComponents/StatCard';
import StatCardMain from './DashboardComponents/StatCardMain';
import RequestList from './DashboardComponents/RequestList';
import Logout from '../../Components/Logout'
import './Dashboard.css';

const approvedData = [
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
];

const pendingData = [
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
];

const rejectedData = [
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
  { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
  { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
];

const Dashboard = () => {
  const [selectedType, setSelectedType] = useState('Approved');

  const getDataByType = () => {
    switch (selectedType) {
      case 'Approved':
        return approvedData;
      case 'Pending':
        return pendingData;
      case 'Rejected':
        return rejectedData;
      default:
        return [];
    }
  };

  const handleLogout = () => {
    console.log('Logged out');
    // Add real logout logic here
  };

  return (
    <div className="coordinator-dashboard-container">
      <Sidebar />
      <div className="coordinator-dashboard-main">
        <Logout />

          <div className="coordinator-dashboard-header">
            <div className="coordinator-header-top">
              <div className="coordinator-welcome-text">
                <h4>Welcome!</h4>
                <p>Mr. Shalini Batra</p>
                <h3>Applications</h3>
              </div>
            </div>

            <div className="coordinator-stats-section">
              <StatCardMain 
              type="Approved" 
              count="126" 
              color="#D9FCE3" 
              icon="✅" 
              onClick={() => setSelectedType('Approved')} 
              />
              <StatCard
                type="Approved"
                count="126"
                color="#D9FCE3"
                icon="✅"
                onClick={() => setSelectedType('Approved')}
              />
              <StatCard
                type="Pending"
                count="123"
                color="#F3E9FF"
                icon="⏸️"
                onClick={() => setSelectedType('Pending')}
              />
              <StatCard
                type="Rejected"
                count="23"
                color="#E2F8FF"
                icon="🚫"
                onClick={() => setSelectedType('Rejected')}
              />
            </div>
          </div>
     
        {/* ✅ Just pass the whole array once */}
        <RequestList
          data={getDataByType()}
          requestType={selectedType}
        />
      </div>
    </div>
  );
};

export default Dashboard;
