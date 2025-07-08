import React, { useContext, useEffect, useState } from 'react';
import './Coordinators.css';
import Sidebar from '../../Components/Sidebar';
import Logout from '../../Components/Logout'
import { UserContext } from '../../../UserContext';
import axios from 'axios';

const Coordinators = () => {
  const {hod} = useContext(UserContext);
  const [coordinators, setCoordinators] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    thaparId: '',
    designation: '',
    password: '',
  });

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hod/all-coordinators-details');
        const data = await response.json();
        console.log(data);
        setCoordinators(data.data);
        
      } catch (error) {
        console.error('Error fetching coordinator data:', error);
      }
    };

    fetchCoordinators();
  }, []);

  const handleAddFaculty = () => {

    console.log(hod);

    if (!newFaculty.name || !newFaculty.thaparId || !newFaculty.designation || !newFaculty.password) return;

    const email = `${newFaculty.thaparId}@thapar.edu`;
    const newEntry = {
      name: newFaculty.name,
      tenure: '2024-present',
      designation: newFaculty.designation,
      email,
    };

    axios.post("http://localhost:5000/api/hod/create-coordinator", )

    setCoordinators([...coordinators, newEntry]);
    setNewFaculty({ name: '', thaparId: '', designation: '', password: '' });
    setShowPopup(false);
  };

  const handleRemoveFaculty = (index) => {
    const updatedCoordinators = coordinators.filter((_, i) => i !== index);
    setCoordinators(updatedCoordinators);
  };

  return (
    <div className="hod-coordinators-page">
      <Sidebar />
      <div className="hod-coordinators-main-content">
        <Logout />
        <div className="hod-coordinator-table">
          <h3>Coordinators</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tenure</th>
                <th>Designation</th>
                <th>Mail ID</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {coordinators.map((coord, index) => (
                <tr key={index}>
                  <td><img src={`https://i.pravatar.cc/30?u=${index}`} alt="profile" /> {coord.name}</td>
                  <td>{coord.tenureStart} , {coord.tenureEnd}</td>
                  <td>{coord.designation}</td>
                  <td>{coord.email}</td>
                  <td><button className="hod-coordinators-remove-btn" onClick={() => handleRemoveFaculty(index)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="hod-coordinators-add-btn" onClick={() => setShowPopup(true)}>Add Faculty ➕</button>

          {showPopup && (
            <div className="hod-coordinators-popup-box">
              <div className="hod-coordinators-popup-grid">
                  <input
                    type="text"
                    placeholder="Faculty Name"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="hod-coordinators-popup-input"
                  />
                  <input
                    type="text"
                    placeholder="Thapar ID"
                    value={newFaculty.thaparId}
                    onChange={(e) => setNewFaculty({ ...newFaculty, thaparId: e.target.value })}
                  className="hod-coordinators-popup-input"
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    value={newFaculty.designation}
                    onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                  className="hod-coordinators-popup-input"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newFaculty.password}
                    onChange={(e) => setNewFaculty({ ...newFaculty, password: e.target.value })}
                  className="hod-coordinators-popup-input"
                  />
                </div>
              <button onClick={handleAddFaculty} className="hod-coordinators-save-btn">
                Save Changes <span className="hod-coordinators-icon">➕</span>
                </button>
              </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default Coordinators;
