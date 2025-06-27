import React from 'react'
import StudentSidebar from '../../Components/Sidebar'
import './Dashboard.css'
import Timetable from '../../Components/TimeTable'

const Dashboard = () => {
  return (
    <div>
      <StudentSidebar />
      <div className="student-main-dashboard">
        <div className="student-dashboard-top">
          <h1>Welcome</h1>
          <h4 className='student-name'>Arnam Chaurasiya</h4>
          <div className="student-dashboard-info-tiles">
            <div className="student-dashboard-info-tile"></div>
            <div className="student-dashboard-info-tile"></div>
            <div className="student-dashboard-info-tile"></div>
            <div className="student-dashboard-info-tile"></div>
            <div className="student-dashboard-info-tile"></div>
          </div>
        </div>

        <div className="student-dashboard-bottom">
          <h1>Your Time Table</h1>
          <h4 className='student-name'>3C75</h4>
          <Timetable />
          <div className="timetable-legend">
            <div className='timetable-legend-inner'>
              <div className='timetable-legend-circle' style={{backgroundColor: 'white'}}></div>
              <p>Free Slots</p>
            </div>
            <div className='timetable-legend-inner'>
              <div className='timetable-legend-circle' style={{backgroundColor: '#FFD700'}}></div>
              <p>Lectures</p>
            </div>
            <div className='timetable-legend-inner'>
              <div className='timetable-legend-circle' style={{backgroundColor: '#90EE90'}}></div>
              <p>Labs</p>
            </div>
            <div className='timetable-legend-inner'>
              <div className='timetable-legend-circle' style={{backgroundColor: '#ADD8E6'}}></div>
              <p>Tutorials</p>
            </div>
          </div>

          <div className="student-dashboard-bottom-buttons">
            <button>Download as PDF</button>
            <button>Add to google Calendar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard