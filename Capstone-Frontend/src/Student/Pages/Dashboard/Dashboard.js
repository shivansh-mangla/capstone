import React, { useContext, useEffect, useState } from 'react'
import StudentSidebar from '../../Components/Sidebar'
import './Dashboard.css'
import Timetable from '../../Components/TimeTable'
import axios from 'axios'
import { UserContext } from '../../../UserContext'
import Logout from '../../Components/Logout'

const Dashboard = () => {
  const {student} = useContext(UserContext);
  const [ttData, setTtData] = useState(null);
  const [electiveData, setElectiveData] = useState(null);

  useEffect(() => {
    if (!student) return; 
    console.log(student);

    const fetchElectiveData = async () => {
      try{
        const res = await axios.get("http://localhost:5000/api/student/get-elective-data");
        setElectiveData(res.data);
      } catch (err) {
        console.error("Failed to fetch data:", err.response?.data || err.message);
      } 
    }

    const fetchTimeTableData = async () => {
      try {
        const token = localStorage.getItem("ICMPStudentToken");

        const res = await axios.get("http://localhost:5000/api/student/gettimetable?subgroup="+student.subgroup, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTtData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch data:", err.response?.data || err.message);
      } 
    }

    fetchTimeTableData();
    fetchElectiveData();
  }, [student]);

  if (!student || !electiveData) return <p>Loading...</p>; 

  const ed = electiveData[student.elective_basket];

  return (
    <div>
      <StudentSidebar />
      <div className="student-main-dashboard">
        <Logout />
        <div className="student-dashboard-top">
          <h1>Welcome</h1>
          <h4 className='student-name'>
            {student.name}
          </h4>
          <div className="student-dashboard-info-tiles">
            <div className="student-dashboard-info-tile">
              <h1>Roll Number</h1>
              <p>{student.roll_no}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h1>Academic Year</h1>
              <p>{student.academic_year}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h1>Branch</h1>
              <p>{student.branch}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h1>Subgroup</h1>
              <p>{student.subgroup}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h1>Electives</h1>
              <p>{student.elective_basket}</p>
              <p>{student.general_elective}</p>
            </div>
          </div>
        </div>

        <div className="student-dashboard-bottom">
          <h1>Your Time Table</h1>
          <h4 className='student-name'>
            {student.subgroup}
          </h4>
          <Timetable data={ttData} ed= {ed}/>
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