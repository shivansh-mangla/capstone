import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import StatCard from './DashboardComponents/StatCard';
import StatCardMain from './DashboardComponents/StatCardMain';
import RequestList from './DashboardComponents/RequestList';
import Logout from '../../Components/Logout'
import './Dashboard.css';

const approvedData = {
    CSED: [
        { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
        { name: 'Tina Sharma', year: 1, courses: 1, date: '01 March, 2024' },
    ],
    ECED: [
        { name: 'Arnam Chaurasiya', year: 1, courses: 2, date: '01 March, 2024' },
        { name: 'Arnam Chaurasiya', year: 1, courses: 3, date: '01 March, 2024' },
    ],
    MED: [
        { name: 'Arnam Chaurasiya', year: 1, courses: 1, date: '01 March, 2024' },
    ]
};

const pendingData = {
    CSED: [
        { name: 'Ravi Kumar', year: 2, courses: 1, date: '03 March, 2024' },
        { name: 'Simran Kaur', year: 3, courses: 2, date: '02 March, 2024' },
    ],
    ECED: [
        { name: 'Nikhil Mehta', year: 4, courses: 1, date: '04 March, 2024' },
    ]
};


const rejectedData = {
    CSED: [
        { name: 'Anjali Mishra', year: 2, courses: 1, date: '28 Feb, 2024' },
    ],
    ECED: [
        { name: 'Rahul Verma', year: 1, courses: 2, date: '27 Feb, 2024' },
    ]
};

const Dashboard = () => {
    const [selectedType, setSelectedType] = useState('Approved'); 
    const [selectedData, setSelectedData] = useState(approvedData);

    const handleLogout = () => {
        // Add logout logic here (e.g., clearing session, redirecting)
        console.log('Logged out');
    };

    return (
        <div className="doaa-dashboard-container">
            <Sidebar />
            <div className="doaa-dashboard-main">
                <Logout />
                <div className="doaa-dashboard-header">
                    <div className="doaa-header-top">
                        <div className="doaa-welcome-text">
                            <h4>Welcome !</h4>
                            <p>Mr. Shalini Batra</p>
                            <h3>Applications</h3>
                        </div>
                    </div>

                    <div className="doaa-stats-section">
                        <StatCardMain type="Approved" count="126" color="#D9FCE3" icon="✅" onClick={() => {setSelectedType('Approved'); setSelectedData(approvedData)}} />
                        <StatCard type="Approved" count="126" color="#D9FCE3" icon="✅" onClick={() => {setSelectedType('Approved'); setSelectedData(approvedData)}} />
                        <StatCard type="Pending" count="123" color="#F3E9FF" icon="⏸️" onClick={() => {setSelectedType('Pending'); setSelectedData(pendingData)}} />
                        <StatCard type="Rejected" count="23" color="#E2F8FF" icon="🚫" onClick={() => { setSelectedType('Rejected'); setSelectedData(rejectedData) }} />
                    </div>
                </div>

                {Object.entries(selectedData).map(([deptName, deptData]) => (
                    <RequestList
                        key={deptName}
                        data={deptData}
                        requestType={selectedType}
                        department={deptName}
                    />
                ))}

            </div>
        </div>
    );
};

export default Dashboard;
