import React from 'react';
import './Accounts.css';
import Sidebar from '../../Components/Sidebar';
import { FaSave } from 'react-icons/fa';

const Accounts = () => {
  return (
    <div className="accounts-layout">
      <Sidebar />

      <div className="accounts-container">
        <div className="accounts-namechange-card">
          <h2 className="welcome-heading">Welcome !</h2>
          <p className="user-role">Mr. HOD Ji</p>

          <h3 className="change-name-heading">Edit your Name</h3>

          <div className="input-group-name">
            <input
              type="text"
              placeholder="Enter your name"
              className="name-input"
              
            />
          </div>

          

          <button className="save-button-name">
            Save Changes <FaSave className="save-icon" />
          </button>
        </div>


        <div className="accounts-password-card">
          

          <h3 className="change-password-heading">Change Password</h3>

          <div className="input-group-oldpassword">
            <input
              type="password"
              placeholder="Old Password"
              className="password-input"
              
            />
          </div>

          <div className="input-group-newpassword">
            <input
              type="password"
              placeholder="New Password"
              className="password-input"
              
            />
          </div>

          <button className="save-button-password">
            Save Changes <FaSave className="save-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;