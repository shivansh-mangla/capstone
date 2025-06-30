import React from 'react';
import CoordinatorSidebar from '../../Components/Sidebar';
import './TimeTable.css';

const timetableUploads = [
  { name: 'Draft1.xlsx', year: '2025-2026', size: '1.24 MB', date: '7 January,2025', status: 'Implemented' },
];

const TimeTable = () => {
  return (
    <div>
      <CoordinatorSidebar />
      <div className="coordinator-main-timetable">
        <div className="coordinator-timetable-section">
          <h2 className="coordinator-timetable-title">Time Table</h2>
          <table className="coordinator-timetable-table">
            <thead>
              <tr>
                <th>Uploads</th>
                <th>Year</th>
                <th>Size</th>
                <th>Upload date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {timetableUploads.map((item, idx) => (
                <tr key={idx}>
                  <td style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{width:'28px',height:'28px',display:'inline-block',background:'#1d6f42',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <img src="https://img.icons8.com/color/48/000000/ms-excel.png" alt="excel" style={{width:'22px',height:'22px'}}/>
                    </span>
                    {item.name}
                  </td>
                  <td>{item.year}</td>
                  <td>{item.size}</td>
                  <td>{item.date}</td>
                  <td><span className="timetable-status implemented">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="timetable-upload-area">
            <div className="timetable-upload-box">
              <span className="timetable-upload-text">Click to browse or drag and drop your files</span>
              <span className="timetable-upload-icon">&#8682;</span>
            </div>
            <button className="timetable-update-btn">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
