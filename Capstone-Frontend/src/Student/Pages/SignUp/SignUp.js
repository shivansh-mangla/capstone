import React, { useState } from 'react';
import './SignUp.css';
import logo from './logoo.png'; 


const StudentSignup = () => {
  console.log("Student signup");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    academicYear: '3rd',
    branch: 'COE',
    subgroup: '3CO16',
    electiveBasket: 'Cyber Security',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="background">
      
      <img src= {logo} alt="ICMP Logo" className="logo-image" />
      <div className="portal-title">
        Improvement Course Management Portal
    </div>
      <div className="form-container">
        <h2>ICMP</h2>
        <h3>Sign Up</h3>
        <form>
          {step === 1 && (
            <>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Vighnesh Kumar"
              />
              <label>Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="102203698"
              />
              <label>Academic Year</label>
              <select name="academicYear" value={formData.academicYear} onChange={handleChange}>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
              <button type="button" onClick={handleNext}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <label>Branch</label>
              <select name="branch" value={formData.branch} onChange={handleChange}>
                <option value="COE">COE</option>
              </select>
              <label>Subgroup</label>
              <select name="subgroup" value={formData.subgroup} onChange={handleChange}>
                <option value="3CO16">3CO16</option>
              </select>
              <label>Elective Basket</label>
              <select name="electiveBasket" value={formData.electiveBasket} onChange={handleChange}>
                <option value="Cyber Security">Cyber Security</option>
              </select>
              <button type="button" onClick={handleNext}>Next</button>
            </>
          )}
          {step === 3 && (
            <>
              <label>Thapar Id</label>
              <select name="Thapar Id" value={formData.branch} onChange={handleChange}>
                <option value="asharma@thapar.edu">asharma@thapar.edu</option>
              </select>
              <label>Subgroup</label>
              <select name="phone number" value={formData.subgroup} onChange={handleChange}>
                <option value="12345678">12345678</option>
              </select>
              <label>Elective Basket</label>
              <select name="Password" value={formData.electiveBasket} onChange={handleChange}>
                <option value="Password">Password</option>
              </select>
              <button type="submit">Submit</button>
            </>
          )}
        </form>
        <div className="login-link">
          Do You have an account? <a href="/login">Login Here</a>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
