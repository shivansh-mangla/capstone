import React, { useEffect, useState } from 'react';
import '../../Dashboard/DashboardComponents/RequestList.css';
import './ClashingRequestList.css';
import { FaSort, FaSortUp, FaSortDown, FaUser } from 'react-icons/fa';
import { toast } from "react-toastify";
import axios from 'axios'


const ClashingRequestList = ({ data, department }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });   
    const [requests, setRequests] = useState(data);    
    const [showModal, setShowModal] = useState(false);         
    const [selectedRequest, setSelectedRequest] = useState(null);      
    const [rejectionReason, setRejectionReason] = useState('');     


    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleAccept = (row) => {
        const updatedRow = { ...row, stage: 2 };
        axios.post("http://localhost:5000/api/doaa/update-application", updatedRow)
        .then((res) => {
            setRequests((prev) => prev.filter((r) => r !== row));
        })
        .catch((err) => {
            console.error("Error accepting application:", err);
            toast.error("Failed to accept request. Please try again.");
        });
    };

    const handleRejectClick = (row) => {
        setSelectedRequest(row);
        setShowModal(true);
    };

    const handleModalOk = () => {
        const updatedComments = [...selectedRequest.comments];
        updatedComments[0] = rejectionReason;

        const updatedRow = { ...selectedRequest, stage: 10, comments: updatedComments };
        axios.post("http://localhost:5000/api/doaa/update-application", updatedRow)
        .then((res) => {
            setRequests((prev) => prev.filter((r) => r !== selectedRequest));
            setShowModal(false);
            setSelectedRequest(null);
            setRejectionReason('');
        })
        .catch((err) => {
            console.error("Error rejecting application:", err);
            alert("Failed to reject request. Please try again.");
        });
    };

    const handleModalCancel = () => {
        setShowModal(false);
        setSelectedRequest(null);
        setRejectionReason('');
    };

    const sortedData = [...requests].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="sort-icon" />;
        return sortConfig.direction === 'asc' ? (
            <FaSortUp className="sort-icon" />
        ) : (
            <FaSortDown className="sort-icon" />
        );
    };

  
    return (
        <div className="doaa-classing-request-table">
            <h3>Clashing Requests</h3>
            <h4>{department}</h4>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>
                            Student Name {getSortIcon('name')}
                        </th>
                        <th onClick={() => handleSort('year')}>
                            Year {getSortIcon('year')}
                        </th>
                        <th onClick={() => handleSort('courses')}>
                            Courses {getSortIcon('courses')}
                        </th>
                        <th onClick={() => handleSort('date')}>
                            Branch {getSortIcon('date')}
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, idx) => (
                        <tr key={idx}>
                            <td className='doaa-classing-request-username'><FaUser className="user-icon" /> 
                                <div>{row.name}</div>
                            </td>
                            <td>{row.year}</td>
                            <td>{row.opted_courses.length}</td>
                            <td>{row.branch}</td>
                            <td className='doaa-classing-request-button-area'>
                                <button
                                    className="action-btn accept"
                                    onClick={() => handleAccept(row)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="action-btn reject"
                                    onClick={() => handleRejectClick(row)}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                // <div className="modal-backdrop">
                //     <div className="modal">
                //         <h4>Enter Reason for Rejection (optional)</h4>
                //         <textarea
                //             value={rejectionReason}
                //             onChange={(e) => setRejectionReason(e.target.value)}
                //             placeholder="Type reason here..."
                //         />
                //         <div className="modal-buttons">
                //             <button onClick={handleModalOk} className="action-btn accept">OK</button>
                //             <button onClick={handleModalCancel} className="action-btn reject">Cancel</button>
                //         </div>
                //     </div>
                // </div>



                <div className="doaa-reject-popup">
                    <div className="doaa-popup-content">
                        <h4>Reject Request: {selectedRequest.name}</h4>
                        <textarea
                            placeholder="Enter reason (optional)"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="doaa-popup-buttons">
                            <button onClick={handleModalOk}  className="action-btn accept" >Confirm Reject</button>
                            <button onClick={handleModalCancel} className="action-btn reject" >Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClashingRequestList;
