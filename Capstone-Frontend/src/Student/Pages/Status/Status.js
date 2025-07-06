import React, { useRef, useState, useEffect } from "react";
import "./Status.css";
import { FaFilePdf } from "react-icons/fa";
import StudentSidebar from '../../Components/Sidebar';
import Logout from "../../Components/Logout";

const Status = () => {
  // const fileInputRef = useRef(null);
  // const [uploadedFile, setUploadedFile] = useState(null);
  const [status, setStatus] = useState(0);

  useEffect( () =>{
      const getApplicationStatus = async () =>{
      try{
        const res = await axios.get("http://localhost:5000/api/student/get-application-status")
        setStatus(res.Status)
      } catch( err) {
        console.log("Failed to fetch application status")
      }
    }
  }, [])
  
  // useEffect(() => {
  //   const onStorage = () => {
  //     setStatus(localStorage.getItem('studentApplicationStatus') || 'not_sent');
  //   };
  //   window.addEventListener('storage', onStorage);
  //   return () => window.removeEventListener('storage', onStorage);
  // }, []);

  // const handleFileClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     setUploadedFile(e.target.files[0].name);
  //   }
  // };

  // Helper function to check if a step should be colored
  // const isStepCompleted = (stepIndex) => {
  //   switch (stepIndex) {
  //     case 0: // Application Send
  //       return ['sent', 'doaa_approved', 'coordinator_approved', 'fees_submitted', 'completed'].includes(status);
  //     case 1: // DOAA Approval
  //       return ['doaa_approved', 'coordinator_approved', 'fees_submitted', 'completed'].includes(status);
  //     case 2: // Coordinator Approval
  //       return ['coordinator_approved', 'fees_submitted', 'completed'].includes(status);
  //     case 3: // Fees Submitted
  //       return ['fees_submitted', 'completed'].includes(status);
  //     case 4: // Application Completed
  //       return ['completed'].includes(status);
  //     default:
  //       return false;
  //   }
  // };

  const steps = [
    { label: "Application Send", stepIndex: 0 },
    { label: "DOAA Approval", stepIndex: 1 },
    { label: "Coordinator Approval", stepIndex: 2 },
    { label: "Fees Submitted", stepIndex: 3 },
    { label: "Application Completed", stepIndex: 4 },
  ];

  const statusColor = (stepIndex) =>{
    if (status == 10) return '#e81111'
    else if (stepIndex <= status) return '#00e676';
    else if (stepIndex == status + 1) return '#ffee58';
    else return '#bdbdbd';
  }

  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar />
      <div className="status-container">
        <Logout />
        <h2 className="status-heading">Notification Section</h2>
        <p className="sub-heading">Your Application Status</p>
        
        <div className="status-tracker">
          <div className="status-line"></div>
          <div className="status-steps">
            {steps.map((step, index) => (
                <div key={index} className="status-step">
                    <div  className="status-dot"style={{ backgroundColor: statusColor(step.stepIndex)}} ></div>
                    <div className="status-label">{step.label}</div>
                </div>
            ))}
          </div>
        </div>



        <h3 className="alerts-heading">Alerts</h3>
        <div className="alerts-box">
          {[...Array(5)].map((_, i) => (
            <p key={i} className="alert-text">
              • Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been thev aksvn
            </p>
          ))}
        </div>

        {/* <div className="document-section">
          <h3 className="doc-heading">Approved Document</h3>
          <div className="upload-box" onClick={handleFileClick}>
            <FaFilePdf className="pdf-icon" />
            <span className="upload-text">
              {uploadedFile || "Upload Fees Receipt Here in PDF Form"}
            </span>
          </div>
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div> */}

      </div>
    </div>
  );
};

export default Status;

