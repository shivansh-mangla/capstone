import React, { useContext, useEffect, useRef, useState } from 'react'
import StudentSidebar from '../../Components/Sidebar'
import './Dashboard.css'
import Timetable from '../../Components/TimeTable'
import axios from 'axios'
import { UserContext } from '../../../UserContext'
import Logout from '../../Components/Logout'
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";


const Dashboard = () => {
  const {setStudent, student} = useContext(UserContext);
  const [ttData, setTtData] = useState(null);
  const [electiveData, setElectiveData] = useState(null);
  const hasFetchedTTData = useRef(false);  
  const hasFetchedElectiveData = useRef(false);  


  useEffect(() => {
    if (!student) return; 
    console.log(student);

    const fetchElectiveData = async () => {
      try{
        const res = await axios.get("https://capstone-5dsm.onrender.com/api/student/get-elective-data");
        setElectiveData(res.data);
      } catch (err) {
        console.error("Failed to fetch data:", err.response?.data || err.message);
      } 
    }

    const fetchTimeTableData = async () => {
      try {
        const token = localStorage.getItem("ICMPStudentToken");

        const res = await axios.get("https://capstone-5dsm.onrender.com/api/student/gettimetable?subgroup="+student.subgroup, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTtData(res.data.data);

        if(hasFetchedTTData.current  == false){
          setStudent(prev => ({
            ...prev,
            timeTableData: res.data.data
          }));
          hasFetchedTTData.current  = true;
        }
        console.log(student);

      } catch (err) {
        console.error("Failed to fetch data:", err.response?.data || err.message);
      } 
    }

    fetchTimeTableData();
    fetchElectiveData();
  }, [student]);

  if (!student || !electiveData) return (
    <div>
      <StudentSidebar />
      <div className="student-main-dashboard">
        <div className="student-main-dashboard-top-row">
          <h1>Dashboard</h1>
          <Logout />
        </div>
        <h1 className='loading-heading'>Fetching and Loading the Data...</h1>
      </div>
    </div>
  );

  const ed = electiveData[student.elective_basket];
  if(hasFetchedElectiveData.current == false){
    setStudent(prev => ({
        ...prev,
        electiveData: ed
      }));
    hasFetchedElectiveData.current = true;
  }


  return (
    <div>
      <StudentSidebar />
      <div className="student-main-dashboard">
        <div className="student-main-dashboard-top-row">
          <h1>Dashboard</h1>
          <Logout />
        </div>
        <div className="student-dashboard-top">
          <h1>Welcome</h1>
          <h4 className='student-name'>
            {student.name}
          </h4>
          <div className="student-dashboard-info-tiles">
            <div className="student-dashboard-info-tile">
              <h2>Roll Number</h2>
              <p>{student.roll_no}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h2>Academic Year</h2>
              <p>{student.academic_year}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h2>Branch</h2>
              <p>{student.branch}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h2>Subgroup</h2>
              <p>{student.subgroup}</p>
            </div>
            <div className="student-dashboard-info-tile">
              <h2>Electives</h2>
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
            <div className='timetable-legend-inner'>
              <div className='timetable-legend-circle' style={{backgroundColor: 'pink'}}></div>
              <p>Electives</p>
            </div>
          </div>

          {/* <div className="student-dashboard-bottom-buttons">
            <button>Download as PDF</button>
            <button>Add to google Calendar</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard