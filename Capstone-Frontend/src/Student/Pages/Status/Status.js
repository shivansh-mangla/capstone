import React, { useEffect, useState, useContext } from "react";
import "./Status.css";
import { FaFilePdf } from "react-icons/fa";
import StudentSidebar from '../../Components/Sidebar';
import Logout from "../../Components/Logout";
import { UserContext } from "../../../UserContext";
import axios from "axios";

const Status = () => {
  const { student } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState(-1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (student && student.ongoing_application) {
      setActive(true);
      axios.post("http://localhost:5000/api/get-application-details", {
        application_id: student.ongoing_application
      })
      .then((res) => {
        // assuming the response looks like: { stage: 0 | 1 | ... | 10 }
        setStatus(res.data["Application Data"]["stage"]);
        console.log(res.data["Application Data"]);
        setComments(res.data["Application Data"]["comments"]);
      })
      .catch((err) => {
        console.error("Error fetching application details:", err);
        setActive(false);  // fallback to inactive
      });
    } else {
      setActive(false);
    }
  }, [student]);

  const steps = [
    { label: "Application Sent", stepIndex: 1 },
    { label: "DOAA Approval", stepIndex: 2 },
    { label: "Coordinator Approval", stepIndex: 3 },
    { label: "Fees Submitted by Student", stepIndex: 4 },
    { label: "Fees Receipt verified", stepIndex: 5 },
  ];

  const statusColor = (stepIndex) => {
    if (status === 10) return '#e81111'; // Rejected
    else if (stepIndex <= status) return '#00e676'; // Completed
    else if (stepIndex === status + 1) return '#ffee58'; // In progress
    else return '#bdbdbd'; // Pending
  };

  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar />
      <div className="status-container">
        <Logout />
        <h2 className="status-heading">Notification Section</h2>
        <h2 className="status-heading">Application ID: {student?.ongoing_application}</h2>
        <p className="sub-heading">Your Application Status</p>

        {active ? (
          <>
            <div className="status-tracker">
              <div className="status-line"></div>
              <div className="status-steps">
                {steps.map((step, index) => (
                  <div key={index} className="status-step">
                    <div
                      className="status-dot"
                      style={{ backgroundColor: statusColor(step.stepIndex) }}
                    ></div>
                    <div className="status-label">{step.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="alerts-heading">Alerts</h3>
            <div className="alerts-box">
              {comments?.map((val, i) => (
                <p key={i} className="alert-text">
                  • {val}
                </p>
              )) || "No Comments"}
            </div>
          </>
        ) : (
          <p style={{ fontSize: "16px", color: "#888", marginTop: "2rem" }}>
            No active applications!
          </p>
        )}
      </div>
    </div>
  );
};

export default Status;
