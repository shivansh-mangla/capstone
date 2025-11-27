import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import StatCard from './DashboardComponents/StatCard';
import StatCardMain from './DashboardComponents/StatCardMain';
import RequestList from './DashboardComponents/RequestList';
import Logout from '../../Components/Logout'
import './Dashboard.css';


import { UserContext } from '../../../UserContext';
import GaugeChart from './DashboardComponents/GaugeChart';
const Dashboard = () => {
  const [allApplications, setAllApplications] = useState('');
  const [pendingData, setPendingData] = useState('');
  const [rejectedData, setRejectedData] = useState('');
  const [approvedData, setApprovedData] = useState('');
  const [selectedType, setSelectedType] = useState('Approved'); 
  const [selectedData, setSelectedData] = useState(approvedData);

  const {coordinator} = useContext(UserContext);

  useEffect(() =>{
          const fetchApplications = async () =>{
              try {
                  const response = await fetch('http://127.0.0.1:5000/api/get-all-applications');
                  const data = await response.json();
                  console.log(data.data);
                  setAllApplications(data.data);
  
                  const pending = [];
                  const approved = [];
                  const rejected = [];

                  data.data.forEach((app) => {
                      switch (app.stage) {
                          case 2:
                          case 4:
                              pending.push(app);
                              break;
                          case 5:
                              approved.push(app);
                              break;
                          case 10:
                              rejected.push(app);
                      }
                  });
                  
                  console.log(pending);
                  console.log(approved);
                  console.log(rejected);
  
                  setPendingData(pending);
                  setApprovedData(approved);
                  setRejectedData(rejected);
  
              } catch (error) {
                  console.error('Error fetching applications data:', error);
                }
          };
  
          fetchApplications();
      }, []);


  return (
    <div className="coordinator-dashboard-container">
      <Sidebar />
      <div className="coordinator-dashboard-main">
        <Logout />

          <div className="coordinator-dashboard-header">
            <div className="coordinator-header-top">
              <div className="coordinator-welcome-text">
                <h4>Welcome!</h4>
                <p>{coordinator?.name || "Loading"}</p>
                <h3>Applications</h3>
              </div>
            </div>

            <div className="coordinator-stats-section">
              <GaugeChart
                approved={approvedData.length}
                pending={pendingData.length}
                rejected={rejectedData.length}
              />
              <div className="coordinator-stats-section-right">
                <StatCard type="Approved" count={approvedData.length} color="#D9FCE3" icon="✅" onClick={() => { setSelectedType('Approved'); setSelectedData(approvedData) }} />
                
                <StatCard type="Pending" count={pendingData.length} color="#F3E9FF" icon="⏸️" onClick={() => { setSelectedType('Pending'); setSelectedData(pendingData) }} />
                <StatCard type="Rejected" count={rejectedData.length} color="#E2F8FF" icon="🚫" onClick={() => { setSelectedType('Rejected'); setSelectedData(rejectedData) }} />
              </div>

            </div>
          </div>
     
        {/* ✅ Just pass the whole array once */}
        <RequestList
          data={selectedData}
          requestType={selectedType}
        />
      </div>
    </div>
  );
};

export default Dashboard;
