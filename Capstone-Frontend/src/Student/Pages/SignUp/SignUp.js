import React, { useState } from "react";
import "./SignUp.css"; // reuse your existing styles
import { ToastContainer, toast } from 'react-toastify';

const ICMPSignUp = () => {

  const notifySuccess = () => {
    toast.success('Successfully Signed Up! Now go to mail and click verification link!', {
      position: 'top-right',
      autoClose: 4000,
    });
  };


  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    year: "",
    branch: "",
    subgroup: "",
    elective: "",
    thaparid: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [subgroupOptions, setSubgroupOptions] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = (currentStep, nextStep) => {
    // Basic validation
    if (currentStep === 1) {
      if (!formData.name || !formData.roll || !formData.year) {
        alert("Please fill all fields.");
        return;
      }

      // Populate dynamic subgroup options
      const yearValue = formData.year.trim();
      if (yearValue >= 1 && yearValue <= 4) {
        const options = Array.from({ length: 35 }, (_, i) => `${yearValue}CO${i + 1}`);
        setSubgroupOptions(options);
      }
    }

    if (currentStep === 2) {
      if (!formData.branch || !formData.subgroup || !formData.elective) {
        alert("Please fill all fields.");
        return;
      }
    }

    setStep(nextStep);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { thaparid, phone, password, confirmPassword } = formData;

    if (!thaparid || !phone || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    // Email domain validation
    if (!/^[a-zA-Z0-9._%+-]+@thapar\.edu$/.test(thaparid)) {
      alert("Please enter a valid Thapar email ending with @thapar.edu.");
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Final collected data
    const data = { ...formData };
    delete data.confirmPassword; // remove confirmPassword before sending

    console.log("Collected Data:", data);
    notifySuccess();
  };


  return (
    <>
      <div className="background"></div>
      <div className="overlay"></div>
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="container">
        <div className="title">Improvement Course Management Portal</div>

        <div className="form-box">
          <h2>ICMP</h2>
          <h3>Sign Up</h3>

          {/* Step 1 */}
          {step === 1 && (
            <div className="form-step active">
              <form>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="roll">Roll Number</label>
                <input
                  type="text"
                  id="roll"
                  name="roll"
                  placeholder="Your Roll Number"
                  value={formData.roll}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="year">Academic Year</label>
                <input
                  list="year-options"
                  id="year"
                  name="year"
                  placeholder="Academic Year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
                <datalist id="year-options">
                  <option value="1" />
                  <option value="2" />
                  <option value="3" />
                  <option value="4" />
                </datalist>

                <button type="button" onClick={() => handleNext(1, 2)}>
                  Next ➤
                </button>
              </form>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="form-step active">
              <form>
                <label htmlFor="branch">Branch</label>
                <input
                  list="branch-options"
                  id="branch"
                  name="branch"
                  placeholder="Type or select branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />
                <datalist id="branch-options">
                  <option value="COE" />
                  <option value="MECH" />
                  <option value="CIVIL" />
                  <option value="ECE" />
                  <option value="EEE" />
                  <option value="IT" />
                </datalist>

                <label htmlFor="subgroup">Subgroup</label>
                <input
                  list="subgroup-options"
                  id="subgroup"
                  name="subgroup"
                  placeholder="Type or select subgroup"
                  value={formData.subgroup}
                  onChange={handleChange}
                  required
                />
                <datalist id="subgroup-options">
                  {subgroupOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>

                <label htmlFor="elective">Elective Basket</label>
                <input
                  list="elective-options"
                  id="elective"
                  name="elective"
                  placeholder="Type or select elective"
                  value={formData.elective}
                  onChange={handleChange}
                  required
                />
                <datalist id="elective-options">
                  <option value="Cyber Security" />
                  <option value="Conversational AI" />
                  <option value="Financial Derivative" />
                  <option value="Full Stack" />
                  <option value="DevOps" />
                </datalist>

                <button type="button" onClick={() => handleNext(2, 3)}>
                  Next ➤
                </button>
              </form>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="form-step active">
              <form onSubmit={handleSubmit}>
                <label htmlFor="thaparid">Thapar Id</label>
                <input
                  type="email"
                  id="thaparid"
                  name="thaparid"
                  placeholder="yourid@thapar.edu"
                  value={formData.thaparid}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button type="submit">Sign Up ➤</button>
              </form>
            </div>
          )}

          <p>
            Do you have an account? <a href="login">Login Here</a>
          </p>
        </div>
      </div>
      
    </>
  );
};

export default ICMPSignUp;