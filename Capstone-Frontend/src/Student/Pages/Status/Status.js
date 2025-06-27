import React, { useRef, useState } from "react";
import "./Status.css";
import { FaFilePdf } from "react-icons/fa";

const Status = () => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  return (
    <div className="status-container">
        <div className="top-bar">
        <button className="logout-btn"> Log Out 🔚</button>
       </div>
      <h2 className="status-heading">Notification Section</h2>
      <p className="sub-heading">Your Application Status</p>

      <div className="status-tracker">
        <div className="status-line"></div>
        <div className="status-steps">
          {[
            { label: "Application Generated", dotColor: "#00e676" },
            { label: "Application Send", dotColor: "#00e676" },
            { label: "DOAA Approval", dotColor: "#00e676" },
            { label: "Coordinator Approval", dotColor: "#00e676" },
            { label: "Fees Submitted", dotColor: "#ffee58" },
            { label: "Application Completed", dotColor: "#bdbdbd" },
          ].map((step, index) => (
            <div key={index} className="status-step">
              <div
                className="status-dot"
                style={{ backgroundColor: step.dotColor }}
              ></div>
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

      <div className="document-section">
        <h3 className="doc-heading">Approved Document</h3>
        <div className="upload-box" onClick={handleFileClick}>
          <FaFilePdf className="pdf-icon" />
          <span className="upload-text">
            {uploadedFile || "Upload Fess Receipt Here in PDF Form"}
          </span>
        </div>
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Status;

