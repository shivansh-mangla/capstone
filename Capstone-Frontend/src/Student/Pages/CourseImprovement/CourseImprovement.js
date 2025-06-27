import React from 'react'
import './CourseImprovement.css'
import StudentSidebar from '../../Components/Sidebar'
import { ProgressBar } from 'react-bootstrap';



const CourseImprovement = () => {
  return (
    <div>
      <StudentSidebar />
      <div className="student-main-course-improvement">
        <h1>Courses Improvement Section</h1>
        <div className="student-main-course-improvement-top">
          <div className="student-main-course-improvement-top-t1">
            <p>Current Semester <span>#3</span></p>
            <p>Odd Semester</p>
          </div>
          <div className="student-main-course-improvement-top-t1">
            <p>Total Credits 23/30</p>
            <ProgressBar now={23*100/30} variant="success" />
          </div>
          <div className="student-main-course-improvement-top-t1">
            <p>Credits Remaining 7/30</p>
            <ProgressBar now={7*100/30} variant="danger" />
          </div>
        </div>
        <div className="student-main-course-improvement-bottom">
          <div className="student-main-course-improvement-bottom-left">
            <h5>Selected Courses for Improvement</h5>
            <div className="student-main-course-improvement-bottom-left-t1">
              <div className="student-main-course-improvement-bottom-left-t2">
                <h6>Numerical Analysis</h6>
                <p>UCS 809</p>
                <p>Course Credits: 4</p>
                <p>X</p>
              </div>
              <div className="student-main-course-improvement-bottom-left-t2">
                <h6>Numerical Analysis</h6>
                <p>UCS 809</p>
                <p>Course Credits: 4</p>
                <p>X</p>
              </div>
            </div>
            <form>
              <p>Present CGPA</p>
              <input type="text"/>

              <p>Upload IEE Signed Document</p>
              <input type="file"/>
            </form>
          </div>
          <div className="student-main-course-improvement-bottom-right">
            <form>
              <select>
                <option value="">Search Course For Improvement</option>
                <option value="UCS907">Computer Networks</option>
                <option value="UCS907">Computer Networks</option>
              </select>
            </form>
            <h6>Quick Select</h6>
          </div>
        </div>

        <button>Generate</button>
      </div>
    </div>
  )
}

export default CourseImprovement
