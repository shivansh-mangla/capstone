import React, { useEffect, useState } from 'react';
import './CourseImprovement.css';
import StudentSidebar from '../../Components/Sidebar';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios'
import { toast } from 'react-toastify';

const CourseImprovement = () => {
  const [courseData, setCourseData] = useState([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedCourseData, setSelectedCourseData] = useState([]);

  const [timeTableOptionsData, setTimeTableOptionsData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/get-course-list")
      .then((res) => {
        setCourseData(res.data);
      })
      .catch(() => {
        toast.error("Failed to fetch data");
      })
  }, [])

  const handleSubmit1 = (e) => {
    e.preventDefault();

    if (selectedCourseCode) {
      const foundCourse = courseData.find(
        (course) => course.subjectCode.toLowerCase() === selectedCourseCode.toLowerCase()
      );
      if (foundCourse) {
        console.log(foundCourse.subjectCode);
        setSelectedCourseData(selectedCourseData.append({
          subjectCode: foundCourse.subjectCode,
          subjectName: foundCourse.data["course name"],
          subjectCredits: foundCourse.data["Credit"],
          subjectL: foundCourse.data["L"],
          subjectT: foundCourse.data["T"],
          subjectP: foundCourse.data["P"],
        }));
      }
    } else if (selectedCourseName) {
      const foundCourse = courseData.find(
        (course) => course.data["course name"].toLowerCase() === selectedCourseName.toLowerCase()
      );
      if (foundCourse) {
        setSelectedCourseData(prevData => [
          ...prevData,
          {
            subjectCode: foundCourse.subjectCode,
            subjectName: foundCourse.data["course name"],
            subjectCredits: foundCourse.data["Credit"],
            subjectL: foundCourse.data["L"],
            subjectT: foundCourse.data["T"],
            subjectP: foundCourse.data["P"],
          }
        ]);

      }
    }

    setSelectedCourseCode('');
    setSelectedCourseName('');
  };

  const handleSubmit2 = () => {
    console.log(selectedCourseData);

    axios.post("http://localhost:5000/api/student/njjk", selectedCourseData)
      .then((res) =>{
        console.log(res);
      })
  }


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
            <ProgressBar now={(23 * 100) / 30} variant="success" />
          </div>
          <div className="student-main-course-improvement-top-t1">
            <p>Credits Remaining 7/30</p>
            <ProgressBar now={(7 * 100) / 30} variant="danger" />
          </div>
        </div>

        <div className="student-main-course-improvement-bottom">
          <div className="student-main-course-improvement-bottom-left">
            <h5>Selected Courses for Improvement</h5>
            <div className="student-main-course-improvement-bottom-left-t1">
              {selectedCourseData.map((course) =>(
                <div className="student-main-course-improvement-bottom-left-t2" key={course.subjectCode}>
                  <h6>{course.subjectName}</h6>
                  <p>{course.subjectCode}</p>
                  <p>Course Credits: {course.subjectCredits}</p>
                  <p>L: {course.subjectL} T: {course.subjectT} P: {course.subjectP}</p>
                  <p>X</p>
                </div>
              ))}
            </div>
            <form>
              <p>Present CGPA</p>
              <input type="text" />

              <p>Upload IEE Signed Document</p>
              <input type="file" />
            </form>
          </div>

          <div className="student-main-course-improvement-bottom-right">
            <form onSubmit={handleSubmit1}>
              <label style={{ color: 'red' }}>Search by Course Code</label>
              <input
                list="courseCodes"
                value={selectedCourseCode}
                onChange={(e) => {
                  setSelectedCourseCode(e.target.value);
                  setSelectedCourseName('');
                }}
                placeholder="Enter Course Code"
              />
              <datalist id="courseCodes">
                {courseData.map((course) => (
                  <option key={course.subjectCode} value={course.subjectCode} />
                ))}
              </datalist>

              <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', margin: '10px 0' }}>OR</div>

              <label style={{ color: 'red' }}>Search by Course Name</label>
              <input
                list="courseNames"
                value={selectedCourseName}
                onChange={(e) => {
                  setSelectedCourseName(e.target.value);
                  setSelectedCourseCode('');
                }}
                placeholder="Enter Course Name"
              />
              <datalist id="courseNames">
                {courseData.map((course) => (
                  <option key={course.subjectCode} value={course.data["course name"]} />
                ))}
              </datalist>

              <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
            </form>
          </div>
        </div>

        <button onClick={handleSubmit2}>Generate Options</button>
      </div>
    </div>
  );
};

export default CourseImprovement;
