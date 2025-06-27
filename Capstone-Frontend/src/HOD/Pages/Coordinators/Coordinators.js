import React, { useState } from 'react';
import './Coordinators.css';
import Sidebar from '../../Components/Sidebar';


const Coordinators = () => {
  const [coordinators, setCoordinators] = useState([
    { name: 'Anjula Mahto', tenure: '2020-present', designation: 'TimeTable Coordinator', email: 'amahto@thapar.edu' },
    { name: 'Tina Sharma', tenure: '2020-present', designation: 'Head', email: 'tsharma@thapar.edu' },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: '', thaparId: '' });

  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.thaparId) return;

    const email = `${newFaculty.thaparId}@thapar.edu`;
    const newEntry = { name: newFaculty.name, tenure: '2024-present', designation: 'Coordinator', email };

    setCoordinators([...coordinators, newEntry]);
    setNewFaculty({ name: '', thaparId: '' });
    setShowPopup(false);
  };

  const handleRemoveFaculty = (index) => {
    const updatedCoordinators = coordinators.filter((_, i) => i !== index);
    setCoordinators(updatedCoordinators);
  };

  return (
    <div className="coordinators-page">
    <Sidebar />
    <div className="main-content">
      <div className="coordinator-table">
        <h3>Coordinators</h3>
        <table>
          <thead>
            <tr>
              <th>Name </th>
              <th>Tenure </th>
              <th>Designation </th>
              <th>Mail ID </th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {coordinators.map((coord, index) => (
              <tr key={index}>
                <td><img src={`https://i.pravatar.cc/30?u=${index}`} alt="profile" /> {coord.name}</td>
                <td>{coord.tenure}</td>
                <td>{coord.designation}</td>
                <td>{coord.email}</td>
                <td><button className="remove-btn" onClick={() => handleRemoveFaculty(index)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-btn" onClick={() => setShowPopup(true)}>Add Faculty ➕</button>

        {showPopup && (
          <div className="popup-box">
            <input
              type="text"
              placeholder="Faculty Name"
              value={newFaculty.name}
              onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
              className="popup-input"
            />
            <input
              type="text"
              placeholder="Thapar ID"
              value={newFaculty.thaparId}
              onChange={(e) => setNewFaculty({ ...newFaculty, thaparId: e.target.value })}
              className="popup-input"
            />
            <button onClick={handleAddFaculty} className="save-btn">Save Changes <span className="icon">➕</span></button>
          </div>
        )}
      </div>
    </div>
    </div>

  );
};

export default Coordinators;
