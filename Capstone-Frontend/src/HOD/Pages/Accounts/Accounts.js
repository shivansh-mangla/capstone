import React from 'react';
import './Accounts.css';
import Sidebar from '../../Components/Sidebar';
import { FaSave } from 'react-icons/fa';

const Accounts = () => {
  return (
    <div className="accounts-layout">
      <Sidebar />

      <div className="accounts-container">
        <div className="accounts-card">
          <h2 className="welcome-heading">Welcome !</h2>
          <p className="user-role">Mr. Coordinator Ji</p>

          <h3 className="change-password-heading">Change Password</h3>

          <div className="input-group">
            <input
              type="password"
              placeholder="Old Password"
              className="password-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="New Password"
              className="password-input"
            />
          </div>

          <button className="save-button">
            Save Changes <FaSave className="save-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
