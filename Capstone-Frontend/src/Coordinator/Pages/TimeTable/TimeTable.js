import React, { useState } from 'react';
import CoordinatorSidebar from '../../Components/Sidebar';
import './TimeTable.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const TimeTable = () => {
  const [timetableUploads, setTimetableUploads] = useState([
    { name: 'TIMETABLEJULYTODEC25.xlsx', year: '2025-2026', size: '1.24 MB', date: '7 August, 2025', status: 'Implemented' },
  ]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newUpload = {
      name: file.name,
      year: '2025-2026', // Make this dynamic if needed
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      status: 'Pending'
    };

    setTimetableUploads((prev) => [...prev, newUpload]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://127.0.0.1:3001/upload", formData);

    } catch (err) {
      console.error(err);
      toast.error("Error uploading or processing the file");
    }


    toast.success("File uploaded successfully. Changes will be applied shortly");
  };

  return (
    <div>
      <CoordinatorSidebar />
      <div className="coordinator-main-timetable">
        <div className="coordinator-timetable-section">
          <h2 className="coordinator-timetable-title">Time Table</h2>
          {/* <table className="coordinator-timetable-table">
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
                  <td><span>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <div className="timetable-upload-area">
            {/* Hidden file input */}
            <input
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              id="timetable-file"
              onChange={handleFileUpload}
            />
            <button
              className="timetable-update-btn"
              onClick={() => document.getElementById("timetable-file").click()}
            >
              Upload New Time Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
