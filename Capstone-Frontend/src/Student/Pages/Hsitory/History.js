import React, { useContext, useEffect, useState } from 'react'
import './History.css'
import Sidebar from '../../Components/Sidebar'
import Logout from '../../Components/Logout'
import HistoryTile from './HistoryComponents/HistoryTile'
import { UserContext } from '../../../UserContext'
import axios from 'axios'


export default function History() {

  const {student} = useContext(UserContext);
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    if(student){
      axios.post("http://localhost:5000/api/student/get-all-application", student)
        .then((res) => {
          console.log(res.data.Applications);
          setApplicationData(res.data.Applications);
        })
      
    }

  }, [student]);


  return (
    <div className='student-history-container'>
        <Sidebar />
        <div className='student-history-main'>
            <Logout />
            <div className='student-history-tiles-area'>
              <h4>Your Applications</h4>

              {applicationData && applicationData.length > 0 ? (
                applicationData.map((app, index) => (
                  <HistoryTile key={index} data={app} />
                ))
              ) : (
                <p>No applications to show</p>
              )}
            </div>
        </div>
    </div>
  )
}
