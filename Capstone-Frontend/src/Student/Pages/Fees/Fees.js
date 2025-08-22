import React, { useContext, useEffect, useState } from 'react';
import StudentSidebar from '../../Components/Sidebar';
import './Fees.css';
import axios from 'axios';
import { UserContext } from '../../../UserContext';
import { toast } from 'react-toastify';
import Logout from '../../Components/Logout';
import UpiCode from "./upiQR.png"
import EazyPay from "./eazyPay.jpg"

const StudentFees = () => {
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [courseDetails, setCourseDetails] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const { student } = useContext(UserContext);

  useEffect(() => {
    if (student) {
      console.log(student);
      if(student.ongoing_application){
        axios.post("http://localhost:5000/api/get-application-details", {
          application_id: student.ongoing_application
        })
        .then((res) => {
          console.log(res.data)
          console.log(res.data["Application Data"]);
          setApplicationDetails(res.data["Application Data"]);
          setCourseDetails(res.data["Application Data"]["opted_courses"]);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }, [student]);

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    setUploadStatus("File size exceeds 2MB. Please upload a smaller PDF.");
    setPdfFile(null);
    return;
  }

  setPdfFile(file);
  setUploadStatus(""); // Clear any previous error
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      setUploadStatus("Please select a PDF file.");
      return;
    }

    if (!applicationDetails?.application_id) {
      setUploadStatus("Application ID not loaded.");
      return;
    }

    const formData = new FormData();
    formData.append("applicationID", applicationDetails.application_id);
    formData.append("pdf", pdfFile);

    toast.success("Please wait while receipt uploads!!");

    try {
      const token = localStorage.getItem("ICMPTokenStudent");
      const response = await axios.post("http://localhost:5000/api/student/upload-fee", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setUploadedUrl(response.data.url);
      setUploadStatus("Receipt uploaded successfully!");
      setApplicationDetails({...applicationDetails, fee_receipt_link: response.data.url});

      toast.success("Receipt uploaded successfully!!");
    } catch (err) {
      console.error(err);
      setUploadStatus("Failed to upload receipt.");
    }
  };

  function renderFeesPage(){
    if(applicationDetails){
      if(applicationDetails.stage === 4){
        return(
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
                    <p className='fees-breakdown-table-cell'>{ind + 1}. {val[0]}</p>
                    <p className='fees-breakdown-table-cell'>Rs. 8000</p>
                  </React.Fragment>
                ))}
                <p className='fees-breakdown-table-cell'>Total</p>
                <p className='fees-breakdown-table-cell'>Rs. {courseDetails.length * 8000}</p>
              </div>
            </div>
            <h2>Payment Reciept Uploaded for Rs. {courseDetails.length * 8000}</h2>
            <div className="student-main-fees-middle">
              <br />
              <br />
              <h1>Payment reciept uploaded!! Please wait... Application will be accepted after verification by Coordinator</h1>
            </div>
          </div>
        )
      }
      else if(applicationDetails.stage === 3){
        return(
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
                    <p className='fees-breakdown-table-cell'>{ind + 1}. {val[0]}</p>
                    <p className='fees-breakdown-table-cell'>Rs. 8000</p>
                  </React.Fragment>
                ))}
                <p className='fees-breakdown-table-cell'>Total</p>
                <p className='fees-breakdown-table-cell'>Rs. {courseDetails.length * 8000}</p>
              </div>
            </div>
            <h2>You have to pay Rs. {courseDetails.length * 8000}</h2>
            <div className="student-main-fees-middle">
              <div className="student-main-fees-middle-left">
                <p>Pay using UPI by scanning this QR code</p>
                <img src={UpiCode} alt="not loaded" className='student-main-fees-middle-img'/>
              </div>
              <div className="student-main-fees-middle-right">
                <p>Pay using Eazy Pay</p>
                <img src={EazyPay} alt="EazyPay Image" className='student-main-fees-middle-img'/>
                <a href="https://eazypay.icicibank.com/homePage" target="_blank" rel="noopener noreferrer">EazyPay Link</a>
              </div>
            </div>
            <div className="student-main-fees-bottom">
              <h2>Upload Fees Receipt here in PDF form (max 2MB)</h2>
              <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button type="submit" className='student-main-fees-bottom-submit-btn'>Submit</button>
              </form>
              {uploadStatus && <p>{uploadStatus}</p>}
              {uploadedUrl && (
                <p>
                  View uploaded receipt:{" "}
                  <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                    {uploadedUrl}
                  </a>
                </p>
              )}
            </div>
          </div>
        )
      }
      else if(applicationDetails.stage === 1 || applicationDetails.stage === 2){
        return(
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
                    <p className='fees-breakdown-table-cell'>{ind + 1}. {val[0]}</p>
                    <p className='fees-breakdown-table-cell'>Rs. 8000</p>
                  </React.Fragment>
                ))}
                <p className='fees-breakdown-table-cell'>Total</p>
                <p className='fees-breakdown-table-cell'>Rs. {courseDetails.length * 8000}</p>
              </div>
            </div>
            <h2>You have to pay Rs. {courseDetails.length * 8000}</h2>
            <div className="student-main-fees-middle">
              <br />
              <br />
              <h1>Payment options and Reciept upload will be available after approval of Coordinator/DoAA</h1>
            </div>
          </div>
        )
      }
      else{
        return(
          <div className="student-main-fees">
            <h1>Fees Section</h1>
            <h4>Pay your fees here</h4>
            <h1>No ongoing Applications</h1>
          </div>
        )
      }
    }
    else
      return(
        <div className="student-main-fees">
          <h1>No ongoing Applications</h1>
        </div>
      )
      
  }

  return (
    <div>
      <StudentSidebar />
      <Logout />
      {renderFeesPage()}
    </div>
  );
};

export default StudentFees;
