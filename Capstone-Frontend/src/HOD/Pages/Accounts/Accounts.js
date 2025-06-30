import React, { useState } from 'react';
import './Accounts.css';

import Sidebar from '../../Components/Sidebar';
import Logout from '../../Components/Logout';

export default function Account() {
  const [displayName, setDisplayName] = useState('Dr. Shalini Batra');
  const [nameDraft, setNameDraft] = useState('');
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');

  const handleSaveName = () => {
    if (nameDraft.trim()) {
      setDisplayName(nameDraft.trim());
      setNameDraft('');
      /* TODO: call API → save name on server */
    }
  };

  const handleSavePassword = () => {
    if (oldPw && newPw) {
      /* TODO: call API → update password */
      setOldPw('');
      setNewPw('');
    }
  };

  return (
    <div className="hod-account-container">
      <Sidebar />

      <div className="hod-account-main">
        <Logout />

        <div className="hod-account-details">
          <h3>Welcome !</h3>
          <h2>{displayName}</h2>
          <br />

          <h3>Name</h3>
          <div className="hod-input-row">
            <input type="text" placeholder="Enter new name" value={nameDraft} onChange={e =>
              setNameDraft(e.target.value)}
            />
            <button onClick={handleSaveName}>Save </button>
          </div>

          <br />

          <h3>Password</h3>
          <div className="hod-input-row">
            <input type="password" placeholder="Old password" value={oldPw} onChange={e => setOldPw(e.target.value)}
            />
            <input type="password" placeholder="New password" value={newPw} onChange={e => setNewPw(e.target.value)}
            />
            <button onClick={handleSavePassword}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}