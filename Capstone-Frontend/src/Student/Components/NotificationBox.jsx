// NotificationBox.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import './NotificationBox.css';

const NotificationBox = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [notifMsg, setNotifMsg] = useState(null);

  // Fetch notification once on mount
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/get-notification');
        if (res.data) {
          setNotifMsg(res.data);
        }
      } catch (err) {
        console.error('Error fetching notification:', err);
      }
    };
    fetchNotification();
  }, []);

  // If no notification yet
  if (!notifMsg) return null;

  return (
    <>
      <div
        className="notification-box"
        onClick={() => setShowMessage(true)}
        title="View Notification"
      >
        <FaBell size={28} />
      </div>

      <div className={`notification-message-box ${showMessage ? 'show' : 'hide'}`}>
        <button
          className="close-btn"
          onClick={() => setShowMessage(false)}
        >
          ×
        </button>
        <div className="message-content">
          <h2>{notifMsg.title}</h2>
          <p>{notifMsg.message}</p>
        </div>
      </div>
    </>
  );
};

export default NotificationBox;
