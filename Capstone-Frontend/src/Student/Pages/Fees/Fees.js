import React, { useContext, useEffect, useState } from 'react'
import StudentSidebar from '../../Components/Sidebar'
import './Fees.css'
import axios from 'axios';
import { UserContext } from '../../../UserContext';

const StudentFees = () => {

  const [applicationDetails, setApplicationDetails] = useState(null);
  const [courseDetails, setCourseDetails] = useState([]);
  const { student } = useContext(UserContext);

  useEffect(() => {
    if(student){
      axios.post("http://localhost:5000/api/get-application-details", {
        application_id: student.ongoing_application
      })
      .then((res) => {
        console.log(res.data["Application Data"]);
        setApplicationDetails(res.data["Application Data"]);
        setCourseDetails(res.data["Application Data"]["opted_courses"]);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    console.log("Hellooo there");
  }, [student]);

  return (
    <div>
      <StudentSidebar />
      <div className="student-main-fees">
        <h1>Fees Section</h1>
        <h4>Pay your fees here</h4>
        <div className="student-main-fees-top">
          <h2>Application ID: #{applicationDetails?.application_id || "Loading"}</h2>
          <div className="fees-breakdown-table">
            <p className='fees-breakdown-table-cell'>Courses</p>
            <p className='fees-breakdown-table-cell'>Fees Amount</p>
            {courseDetails.map((val, ind) => (
              <React.Fragment key={ind}>
                <p className='fees-breakdown-table-cell'>{ind + 1}. {val[1]}</p>
                <p className='fees-breakdown-table-cell'>Rs. 8000</p>
              </React.Fragment>
            ))}

            <p className='fees-breakdown-table-cell'>Total</p>
            <p className='fees-breakdown-table-cell'>Rs. {courseDetails.length * 8000}</p>
          </div>
        </div>
        <div className="student-main-fees-middle">
          <h2>You have to pay Rs. {courseDetails.length * 8000}</h2>
          <div className="student-main-fees-middle-left">
            <p>Pay using UPI by scanning this QR code</p>
          </div>
          <div className="student-main-fees-middle-right">
            <p>Pay using Eazy Pay</p>
          </div>
        </div>
        <div className="student-main-fees-bottom">
          <h2>Upload Fees Reciept here in PDF form</h2>
          <form>
            <input type="file"/>
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentFees
