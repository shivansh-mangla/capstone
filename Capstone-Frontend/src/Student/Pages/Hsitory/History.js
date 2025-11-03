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
      axios.post("https://capstone-5dsm.onrender.com/api/student/get-all-application", student)
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
                applicationData
                .filter(data => data.stage === 5 || data.stage === 10)
                .map((data, index) => (
                  <HistoryTile key={index} data={data} />
                ))
              ) : 
                <p>No applications to show</p>}
            </div>
        </div>
    </div>
  )
}
