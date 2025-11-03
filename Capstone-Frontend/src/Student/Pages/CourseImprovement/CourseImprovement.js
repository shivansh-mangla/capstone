import React, { useContext, useEffect, useRef, useState } from 'react';
import './CourseImprovement.css';
import StudentSidebar from '../../Components/Sidebar';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios'
import { toast } from 'react-toastify';
import { UserContext } from '../../../UserContext';
import Timetable from '../../Components/TimeTable';
import Logout from '../../Components/Logout';

const CourseImprovement = () => {
  const token = localStorage.getItem("ICMPTokenStudent");
  const {student, setStudent} = useContext(UserContext);
  const [courseData, setCourseData] = useState([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedCourseData, setSelectedCourseData] = useState([]);

  const [timeTableOptionsData, setTimeTableOptionsData] = useState([]);
  const [choices, setChoices] = useState([]);
  const [newTimeTable, setNewTimeTable] = useState([]);
  const [emptyChoices, setEmptyChoices] = useState(false);


  useEffect(() => {
    console.log(student);
    axios.get("https://capstone-5dsm.onrender.com/api/get-course-list")
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

      console.log(foundCourse);
      if (foundCourse) {
        console.log(foundCourse.subjectCode);
        setSelectedCourseData([
          ...selectedCourseData,
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
    const data = {
      selectedCourseData : selectedCourseData,
      studentData: student
    }
    
    axios.post("https://capstone-flask-gofl.onrender.com", data)
      .then((res) =>{
        console.log(res.data);
        setChoices(res.data.choices);
        setNewTimeTable(res.data.newTimeTable);

        if(res.data.choice.length > 0)
          setEmptyChoices(false);
        else
          setEmptyChoices(true);
      })
      .catch(()=>{
        console.log("Eroor");
      })
  }

  const handleSubmit3 = (choice, newTimeTable) =>{
    const arr = Object.entries(choice);
    
    const data = {
      "email": student.thapar_email,
      "opted_courses": arr,
      "message": "",
      "clashing": false,
      "new_time_table": newTimeTable,
      "elective_data": student.electiveData
    };

    const confirmed = window.confirm(`Application once submitted can't be taken back. \n\nAre you sure you want to pick these courses with these subgroups ?`);
    if (!confirmed) return;

    toast.warning("Please wait for Application to be generated!!");
    axios.post("https://capstone-5dsm.onrender.com/api/student/generate-application", data, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
      .then((res) =>{
        toast.success("Application successfully created!!");
        setStudent(prev => ({
          ...prev,
          ongoing_application: res.data.applicationId
        }));
      })
      .catch((err)=>{
        console.log(err);
        toast.error("Try again!!");
      })
  }

  const handleRemoveCourse = (subjectCode) => {
    setSelectedCourseData(prev =>
      prev.filter(course => course.subjectCode !== subjectCode)
    );
  };


  return (
    <div>
      <StudentSidebar />
      <Logout />
      <div className="student-main-course-improvement">
        <h1>Courses Improvement Section</h1>
        {/* <div className="student-main-course-improvement-top">
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
        </div> */}

        <div className="student-main-course-improvement-top2">
          <h5>- Please choose maximum of 3 courses to pick.</h5>
          <h5>- Generate options by clicking on "Generate options button".</h5>
          <h5>- Select one of the available options.</h5>
          <h5>- Wait for the Ongoing Application to be Accepted/Rejected before making new request.</h5>
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
                  <p onClick={() => handleRemoveCourse(course.subjectCode)} className='remove-x'>X</p>
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

        {emptyChoices ? <h1>No Options Found</h1> : <h1>Plz Choose from one of these options:</h1>}
        {choices.map((val, index) => {
          const combinedList = [...student.timeTableData, ...newTimeTable[index]];
          return (
            <div key={index}>
              <h2>Option {index+1}</h2>
              {Object.entries(val).map(([key, value]) => (
                <h4 key={key}>{key} with: {value}</h4>
              ))}

              <Timetable data={combinedList} ed={student.electiveData}/>

              <button className='finalize-btn' onClick={()=> {handleSubmit3(val, combinedList)}}>Finalize option {index+1}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseImprovement;
