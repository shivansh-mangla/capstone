// import React from 'react'
// import './AcademicInformation.css'
// import Sidebar from '../../Components/Sidebar'
// export default function AcademicInformation() {
//   return (
//     <div className='coordinator-academic-info-continer'>
//       <Sidebar />
//     </div>
//   )
// }


import React, { useState } from 'react'
import './AcademicInformation.css'
import Sidebar from '../../Components/Sidebar'
import { toast } from 'react-toastify'

export default function AcademicInformation() {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    L: '',
    T: '',
    P: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Course Updated Succesfully!!");
    
    setFormData({
      courseName: '',
      courseCode: '',
      L: '',
      T: '',
      P: ''
    });
    console.log('Form Data:', formData);
    // You can send this data to backend here
  }

  return (
    <div className='coordinator-academic-info-container'>
      <Sidebar />
      <div className="academic-form" style={{marginLeft: '250px'}}>
        <h2>Add New Course</h2>
        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-group">
            <label>New Course Name:</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="form-group">
            <label>New Course Code:</label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="Enter course code"
              required
            />
          </div>

          <div className="form-group short-inputs">
            <div>
              <label>L:</label>
              <input
                type="number"
                name="L"
                value={formData.L}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div>
              <label>T:</label>
              <input
                type="number"
                name="T"
                value={formData.T}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div>
              <label>P:</label>
              <input
                type="number"
                name="P"
                value={formData.P}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  )
}